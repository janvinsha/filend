import { ethers, Wallet, providers, BigNumber } from "ethers";

import filtrollerAbi from "../data/filtroller-abi.json";
import ftokenAbi from "../data/ftoken-abi.json";
import filendLensAbi from "../data/filendLens-abi.json";

import erc20Abi from "../data/erc-20-abi.json";
import { PRIVATE_KEY, ALCHEMY_KEY, FILTROLLER_ADDRESS } from "../constants";
import { AccountFtokenModel, AccountModel, MarketModel } from "../custom-types";
import { exponentToBigDecimal, getMarkets } from "./markets";
import { tokenToString } from "typescript";
import truncate from "./truncate";

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

export let mantissaFactor = 18;
export let fTokenDecimals = 8;

export let mantissaFactorBD: BigNumber = exponentToBigDecimal(18);
export let fTokenDecimalsBD: BigNumber = exponentToBigDecimal(8);
let zeroBD = BigNumber.from("0");
export const getAccountFtoken = async (account, marketAddress) => {
  let accountFtoken: AccountFtokenModel = {
    symbol: "",
    market: marketAddress,
    account: account,
    accrualBlockNumber: 0,
    fTokenBalance: "",
    storedBorrowBalance: "",
    balanceOfUnderlying: "",
    balanceOfUnderlyingBN: zeroBD,
    enteredMarket: false,
    accountBorrowIndex: "",
    totalUnderlyingSupplied: "",
    totalUnderlyingRedeemed: "",
    totalUnderlyingBorrowed: "",
    totalUnderlyingRepaid: "",
    exchangeRate: zeroBD,
    amountSupplied: zeroBD,
    borrowLimitUSD: 0,
  };

  const ftokenContract = new ethers.Contract(marketAddress, ftokenAbi, signer);

  const filtrollerContract = new ethers.Contract(
    FILTROLLER_ADDRESS,
    filtrollerAbi,
    signer
  );

  let accountSnapshot = await ftokenContract.getAccountSnapshot(account);
  let fTokenBalance = accountSnapshot[1];
  accountFtoken.fTokenBalance = fTokenBalance.toString();
  let storedBorrowBalance = accountSnapshot[2];
  accountFtoken.storedBorrowBalance = storedBorrowBalance?.toString();

  let accrualBlockNumber = await ftokenContract.accrualBlockNumber();
  accountFtoken.accrualBlockNumber = accrualBlockNumber?.toNumber();

  let enteredMarket = await filtrollerContract.checkMembership(
    account,
    marketAddress
  );

  accountFtoken.enteredMarket = enteredMarket;

  if (marketAddress == fUSDCAddress) {
    accountFtoken.symbol = "fUSDC";
    const erc20Contract = new ethers.Contract(USDCAddress, erc20Abi, signer);
    let balance = await erc20Contract.balanceOf(account);
    let underlyingDecimals = await erc20Contract.decimals();

    accountFtoken.balanceOfUnderlying = balance
      ?.div(exponentToBigDecimal(underlyingDecimals))
      ?.toNumber()
      ?.toFixed(2);
    accountFtoken.balanceOfUnderlyingBN = balance?.div(
      exponentToBigDecimal(underlyingDecimals)
    );

    let exchangeRate: BigNumber = await ftokenContract.exchangeRateStored();
    accountFtoken.exchangeRate = truncate(
      exchangeRate
        .div(exponentToBigDecimal(underlyingDecimals))
        .mul(fTokenDecimalsBD)
        .div(mantissaFactorBD),
      mantissaFactor
    );
  } else if (marketAddress == fUSDTAddress) {
    accountFtoken.symbol = "fUSDT";
    const erc20Contract = new ethers.Contract(USDTAddress, erc20Abi, signer);
    let balance = await erc20Contract.balanceOf(account);

    let underlyingDecimals = await erc20Contract.decimals();

    accountFtoken.balanceOfUnderlying = balance
      .div(exponentToBigDecimal(underlyingDecimals))
      ?.toNumber()
      ?.toFixed(2);

    let exchangeRate: BigNumber = await ftokenContract.exchangeRateStored();
    accountFtoken.exchangeRate = truncate(
      exchangeRate
        .div(exponentToBigDecimal(underlyingDecimals))
        .mul(fTokenDecimalsBD)
        .div(mantissaFactorBD),
      mantissaFactor
    );
  } else if (marketAddress == fETHAddress) {
    accountFtoken.symbol = "fETH";
    const erc20Contract = new ethers.Contract(ETHAddress, erc20Abi, signer);
    let balance = await erc20Contract.balanceOf(account);
    let underlyingDecimals = await erc20Contract.decimals();
    accountFtoken.balanceOfUnderlying = balance
      .div(exponentToBigDecimal(underlyingDecimals))
      ?.toNumber()
      ?.toFixed(2);

    let exchangeRate: BigNumber = await ftokenContract.exchangeRateStored();
    accountFtoken.exchangeRate = truncate(
      exchangeRate
        .div(exponentToBigDecimal(underlyingDecimals))
        .mul(fTokenDecimalsBD)
        .div(mantissaFactorBD),
      mantissaFactor
    );
  } else if (marketAddress == fFILAddress) {
    accountFtoken.symbol = "fFIL";
    const erc20Contract = new ethers.Contract(FILAddress, erc20Abi, signer);
    let balance = await erc20Contract.balanceOf(account);
    let underlyingDecimals = await erc20Contract.decimals();
    accountFtoken.balanceOfUnderlying = balance
      .div(exponentToBigDecimal(underlyingDecimals))
      ?.toNumber()
      ?.toFixed(2);

    let exchangeRate: BigNumber = await ftokenContract.exchangeRateStored();
    accountFtoken.exchangeRate = truncate(
      exchangeRate
        .div(exponentToBigDecimal(underlyingDecimals))
        .mul(fTokenDecimalsBD)
        .div(mantissaFactorBD),
      mantissaFactor
    );
  } else {
  }
  accountFtoken.amountSupplied = accountFtoken?.exchangeRate.mul(
    accountFtoken?.fTokenBalance
  );

  return accountFtoken;
};

export const getAccount = async (address: string) => {
  const connectedContract = new ethers.Contract(
    FILTROLLER_ADDRESS,
    filtrollerAbi,
    signer
  );

  let account: AccountModel = {
    id: address,
    tokens: [],
    accountLiquidated: false,
    accountLiquidator: "",
    health: 100,
    totalBorrowValue: "",
    totalCollateralValue: "",
    borrowLimit: "",
  };
  let paused = await connectedContract.borrowGuardianPaused(address);

  account.accountLiquidated = paused;
  //markets that have been enabled for collateral
  //the comment above is wrong because users can gain fttokens without enabling it for collateral so insteaf er go thhrough all tokens
  // let testFtoken = await connectedContract.getAssetsIn(address);
  // console.log("LETS CHECK THE REAL ASSETS IN", testFtoken);

  let ftokens = [
    "0x4fE3E9780D52b8e7797c5D888670a2D12dAD228D",
    "0x98e875DE3FA05994E348c9682F67AEf36Ebe5E35",
    "0x667f46de993117c6b5d6e08B664aBc61F08CB5b5",
  ];
  let abc: AccountFtokenModel[] = await Promise.all(
    ftokens.map(async (ftoken) => {
      let tk = await getAccountFtoken(address, ftoken);
      return tk;
    })
  );

  //here we try to convert the tokenbalances of all the accounts the user has to dollar value
  account.tokens = abc;
  let addTBV = zeroBD;
  let addTCV = zeroBD;
  for (let token of abc || []) {
    console.log(
      "THIS IS THE EXCHANGE RATE IN THE ACCOUNTFTOKEN",
      token?.exchangeRate?.toNumber()
    );
    //this gets the total amount supplied by the user
    //TODO: this is wrong, it gets the total amount supplied of the underlying token but not the price in usd
    let preTBV = token?.amountSupplied;
    addTBV = addTBV.add(preTBV);
    addTCV = addTCV.add(token?.storedBorrowBalance);
  }

  account.totalCollateralValue = addTCV?.toNumber()?.toFixed(2);
  account.totalBorrowValue = addTBV?.toNumber()?.toFixed(2);
  //TODO: this borrow limit is wrong
  account.borrowLimit = (addTBV?.toNumber() * 0.8).toFixed(2);
  console.log("GET ACCOUNTS HERE", ftokens);
  return account;
};
