import { ethers, Wallet, providers, BigNumber } from "ethers";
import { MarketModel } from "../custom-types";

import filtrollerAbi from "../data/filtroller-abi.json";
import ftokenAbi from "../data/ftoken-abi.json";
import oracleAbi from "../data/price-oracle-abi.json";
import oracle2Abi from "../data/price-oracle-2-abi.json";

import filendLensAbi from "../data/filendLens-abi.json";
import erc20Abi from "../data/erc-20-abi.json";
import {
  FILTROLLER_ADDRESS,
  PRIVATE_KEY,
  ALCHEMY_KEY,
  ORACLE_ADDRESS,
  FILEND_LENS_ADDRESS,
} from "../constants";
import { bigint } from "zod";
import { getAccount, getAccountFtoken } from "./accounts";
const wallet = new Wallet(PRIVATE_KEY);
const provider = new providers.AlchemyProvider("goerli", ALCHEMY_KEY);
const signer = wallet.connect(provider);

let fUSDCAddress = "0x98e875DE3FA05994E348c9682F67AEf36Ebe5E35";
let fETHAddress = "0x667f46de993117c6b5d6e08B664aBc61F08CB5b5";
let fFILAddress = "0x4fE3E9780D52b8e7797c5D888670a2D12dAD228D";
let fUSDTAddress = "0x88Af7ae8e7d4c598e278f9c6dfd55312c1B4117B";

let USDCAddress = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";
let ETHAddress = "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D";
let USDTAddress = "0xe802376580c10fe23f027e1e19ed9d54d4c9311e";
let FILAddress = "0x520b4999645c51d7ab028645d8b7bd80fcb07a0b";

const ethMantissa = 1e18;
const blocksPerDay = 7200; // 12 seconds per block
const daysPerYear = 365;

export let mantissaFactor = 18;
export let fTokenDecimals = 8;
export let mantissaFactorBD: BigNumber = exponentToBigDecimal(18);
export let fTokenDecimalsBD: BigNumber = exponentToBigDecimal(8);
export let zeroBD = BigNumber.from("0");
export const getMarkets = async (): Promise<MarketModel[]> => {
  const connectedContract = new ethers.Contract(
    FILTROLLER_ADDRESS,
    filtrollerAbi,
    signer
  );
  const marketArrays = await connectedContract.getAllMarkets();
  const marketList = await Promise.all(
    marketArrays.map(async (address: any) => await getMarket(address))
  );
  console.log("THIS ARE THE MARKET ARRAYS", marketArrays, marketList);
  return marketList;
  // const accountFtoken = await getAccountFtoken(
  //   "0x659CE0FC2499E1Fa14d30F5CD88aD058ba490e39",
  //   fUSDCAddress
  // );
  // let tAcct = await getAccount("0x659CE0FC2499E1Fa14d30F5CD88aD058ba490e39");
};

const getMarket = async (address): Promise<MarketModel> => {
  let market: MarketModel = {
    id: address,
    borrowRate: 0,
    cash: zeroBD,
    collateralFactor: zeroBD,
    exchangeRate: zeroBD,
    name: "",
    reserves: zeroBD,
    supplyRate: 0,
    symbol: "",
    totalBorrows: zeroBD,
    totalSupply: zeroBD,
    underlyingAddress: "",
    underlyingName: "",
    underlyingPrice: zeroBD,
    underlyingSymbol: "",
    accrualBlockNumber: zeroBD,
    blockTimestamp: zeroBD,
    borrowIndex: zeroBD,
    reserveFactor: zeroBD,
    underlyingPriceUSD: zeroBD,
    underlyingDecimals: zeroBD,
    liquidityUSD: zeroBD,
  };
  try {
    const contract = new ethers.Contract(address, ftokenAbi, signer);

    const filendLensContract = new ethers.Contract(
      FILEND_LENS_ADDRESS,
      filendLensAbi,
      signer
    );
    console.log(
      "IS THE REACHINF HERE HERRRRREEEERNIEINIEIIIEEIEJIEHIEIEIEIEEIEIEHIEHIEHEIHEIEIEHIE"
    );
    market.name = await contract.name();
    market.symbol = await contract.symbol();
    const fTokenMetadata = await filendLensContract.fTokenMetadata(address);

    market.accrualBlockNumber = await contract.accrualBlockNumber();
    let totalSupply: BigNumber = fTokenMetadata?.totalSupply;
    market.totalSupply = totalSupply.div(fTokenDecimalsBD);

    // Must convert to BigDecimal, and remove 10^18 that is used for Exp in Filend Solidity
    let borrowRatePerBlock = fTokenMetadata?.borrowRatePerBlock;
    market.borrowRate =
      (Math.pow(
        (borrowRatePerBlock / ethMantissa) * blocksPerDay + 1,
        daysPerYear
      ) -
        1) *
      100;

    let supplyRatePerBlock = fTokenMetadata?.supplyRatePerBlock;
    market.supplyRate =
      (Math.pow(
        (supplyRatePerBlock / ethMantissa) * blocksPerDay + 1,
        daysPerYear
      ) -
        1) *
      100;

    if (market.symbol == "fUSDC") {
      const erc20Contract = new ethers.Contract(USDCAddress, erc20Abi, signer);
      market.underlyingAddress = USDCAddress;
      market.underlyingDecimals = await erc20Contract.decimals();
      market.underlyingName = "USD Coin";
      market.underlyingSymbol = "USDC";
    } else if (market.symbol == "fUSDT") {
      const erc20Contract = new ethers.Contract(USDTAddress, erc20Abi, signer);
      market.underlyingAddress = USDTAddress;
      market.underlyingDecimals = await erc20Contract.decimals();
      market.underlyingName = "USD Tether";
      market.underlyingSymbol = "USDT";
    } else if (market.symbol == "fETH") {
      const erc20Contract = new ethers.Contract(ETHAddress, erc20Abi, signer);
      market.underlyingAddress = ETHAddress;
      market.underlyingDecimals = await erc20Contract.decimals();
      market.underlyingName = "Ether";
      market.underlyingSymbol = "ETH";
    } else if (market.symbol == "fFIL") {
      const erc20Contract = new ethers.Contract(FILAddress, erc20Abi, signer);
      market.underlyingAddress = FILAddress;
      market.underlyingDecimals = await erc20Contract.decimals();
      market.underlyingName = "FIL";
      market.underlyingSymbol = "FIL";
    } else {
    }

    let ethPriceInUSD = await getETHinUSD();
    // if fETH, we only update USD price
    if (address == fETHAddress) {
      market.underlyingPriceUSD = truncate(
        ethPriceInUSD,
        market.underlyingDecimals
      );
    } else {
      let tokenPriceUSD = await getTokenPrice(
        address,
        market.underlyingDecimals
      );
      market.underlyingPrice = truncate(
        tokenPriceUSD?.div(ethPriceInUSD),
        market.underlyingDecimals
      );
      // if USDC, we only update ETH price
      if (address != fUSDCAddress) {
        market.underlyingPriceUSD = truncate(
          tokenPriceUSD,
          market.underlyingDecimals
        );
      }
    }

    /* Exchange rate explanation
   In Practice
    - If you call the cDAI contract on etherscan it comes back (2.0 * 10^26)
    - If you call the cUSDC contract on etherscan it comes back (2.0 * 10^14)
    - The real value is ~0.02. So cDAI is off by 10^28, and cUSDC 10^16
   How to calculate for tokens with different decimals
    - Must div by tokenDecimals, 10^market.underlyingDecimals
    - Must multiply by FtokenDecimals, 10^8
    - Must div by mantissa, 10^18
 */
    let exchangeRate: BigNumber = await contract.exchangeRateStored();
    market.exchangeRate = truncate(
      exchangeRate
        .div(exponentToBigDecimal(market.underlyingDecimals))
        .mul(fTokenDecimalsBD)
        .div(mantissaFactorBD),
      mantissaFactor
    );
    let borrowIndex: BigNumber = await contract.exchangeRateStored();
    market.borrowIndex = truncate(
      borrowIndex.div(mantissaFactorBD),
      mantissaFactor
    );
    let reserves: BigNumber = fTokenMetadata?.totalReserves;
    market.reserves = truncate(
      reserves.div(exponentToBigDecimal(market.underlyingDecimals)),
      market.underlyingDecimals
    );
    let totalBorrows: BigNumber = fTokenMetadata?.totalBorrows;
    market.totalBorrows = truncate(
      totalBorrows.div(exponentToBigDecimal(market.underlyingDecimals)),
      market.underlyingDecimals
    );
    let cash: BigNumber = fTokenMetadata?.totalCash;
    market.cash = truncate(
      cash.div(exponentToBigDecimal(market.underlyingDecimals)),
      market.underlyingDecimals
    );
    market.liquidityUSD = market?.reserves.mul(market?.underlyingPriceUSD);
  } catch (err) {
    console.log("THIS IS THE ERROR", err);
  }
  return market;
};

const getTokenPrice = async (tokenAddress: any, underlyingDecimals: any) => {
  const connectedContract = new ethers.Contract(
    ORACLE_ADDRESS,
    oracleAbi,
    signer
  );
  let underlyingPrice: BigNumber;
  let mantissaDecimalFactor = 18 - underlyingDecimals + 18;
  let bdFactor = exponentToBigDecimal(mantissaDecimalFactor);
  let tryPrice = await connectedContract.getUnderlyingPrice(tokenAddress);
  underlyingPrice = tryPrice?.reverted
    ? zeroBD
    : tryPrice?.value?.div(bdFactor);
  return underlyingPrice;
};

const getETHinUSD = async () => {
  const connectedContract = new ethers.Contract(
    ORACLE_ADDRESS,
    oracleAbi,
    signer
  );
  let ethPriceInUSD: BigNumber;
  let tryPrice = await connectedContract.getUnderlyingPrice(fETHAddress);

  ethPriceInUSD = tryPrice.reverted
    ? zeroBD
    : tryPrice?.value?.toBigDecimal()?.div(mantissaFactorBD);

  return ethPriceInUSD;
};

// Returns the price of USDC in eth. i.e. 0.005 would mean ETH is $200
const getUSDCpriceETH = async () => {
  const connectedContract = new ethers.Contract(
    ORACLE_ADDRESS,
    oracleAbi,
    signer
  );
  let usdPrice: BigNumber;

  let mantissaDecimalFactorUSDC = 18 - 6 + 18;
  let bdFactorUSDC = exponentToBigDecimal(mantissaDecimalFactorUSDC);
  let tryPrice = await connectedContract.getUnderlyingPrice(fUSDCAddress);

  usdPrice = tryPrice.reverted
    ? zeroBD
    : tryPrice.value.toBigDecimal().div(bdFactorUSDC);

  return usdPrice;
};

export function exponentToBigDecimal(decimals: any) {
  let bd = BigNumber.from("1");
  for (let i = 0; i < decimals; i++) {
    bd = bd.mul(BigNumber.from("10"));
  }
  return bd;
}

function truncate(value: any = "200", decimals: any) {
  let digitsRightOfZero =
    value?.digits?.toString()?.length + value?.exp?.toInt32();
  let newDigitLength = decimals + digitsRightOfZero;
  let truncateLength = value?.digits?.toString()?.length - newDigitLength;
  if (truncateLength < 0) {
    return value;
  } else {
    for (let i = 0; i < truncateLength; i++) {
      value.digits = value?.digits / 10;
    }
    return value;
  }
}
