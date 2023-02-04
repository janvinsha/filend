import { ethers, Wallet, providers, BigNumber } from "ethers";

import filtrollerAbi from "../data/filtroller-abi.json";
import ftokenAbi from "../data/ftoken-abi.json";
import filendLensAbi from "../data/filendLens-abi.json";

import erc20Abi from "../data/erc-20-abi.json";
import {
  PRIVATE_KEY,
  ALCHEMY_KEY,
  FILTROLLER_ADDRESS,
  FILEND_LENS_ADDRESS,
} from "../constants";
import { AccountFtokenModel, AccountModel, MarketModel } from "../custom-types";
import { getMarkets } from "./markets";
import { tokenToString } from "typescript";

const wallet = new Wallet(PRIVATE_KEY);
const provider = new providers.AlchemyProvider("goerli", ALCHEMY_KEY);
const signer = wallet.connect(provider);

let fUSDCAddress = "0x9E5cFe1F5A81DAB8Ba0F8ceea094B28907Ce4202";
let fETHAddress = "0xC411eED88310e6A79024D14eeD8cbbe6918F9119";
let fUSDTAddress = "0x88Af7ae8e7d4c598e278f9c6dfd55312c1B4117B";
let initialExchangeMantissa = BigNumber.from("200000000000000000000000000");

let zeroBD = BigNumber.from("0");
export const getAccountFtoken = async (account, marketAddress) => {
  console.log("CHECKING THE OARAMETRS", account, marketAddress);
  let accountFtoken: AccountFtokenModel = {
    symbol: "",
    market: marketAddress,
    account: account,
    accrualBlockNumber: 0,
    fTokenBalance: zeroBD,
    storedBorrowBalance: zeroBD,
    enteredMarket: false,
    accountBorrowIndex: zeroBD,
    totalUnderlyingSupplied: zeroBD,
    totalUnderlyingRedeemed: zeroBD,
    totalUnderlyingBorrowed: zeroBD,
    totalUnderlyingRepaid: zeroBD,
  };
  const ftokenContract = new ethers.Contract(marketAddress, ftokenAbi, signer);

  const filtrollerContract = new ethers.Contract(
    FILTROLLER_ADDRESS,
    filtrollerAbi,
    signer
  );
  let accountSnapshot = await ftokenContract.getAccountSnapshot(account);
  accountFtoken.fTokenBalance = accountSnapshot[1];
  accountFtoken.storedBorrowBalance = accountSnapshot[2];

  let accrualBlockNumber = await ftokenContract.accrualBlockNumber();
  accountFtoken.accrualBlockNumber = accrualBlockNumber;

  let enteredMarket = await filtrollerContract.checkMembership(
    account,
    marketAddress
  );
  accountFtoken.enteredMarket = enteredMarket;

  console.log("THIS IS THE ACCOUNT FTOKEN", accountFtoken);
  if (marketAddress == fUSDCAddress) {
    accountFtoken.symbol = "fUSDC";
  } else if (marketAddress == fUSDTAddress) {
    accountFtoken.symbol = "fUSDT";
  } else if (marketAddress == fETHAddress) {
    accountFtoken.symbol = "fETH";
  } else {
  }

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
    accountLiquidator: zeroBD,
    health: zeroBD,
    totalBorrowValue: zeroBD,
    totalCollateralValue: zeroBD,
  };
  let paused = await connectedContract.borrowGuardianPaused(address);

  account.accountLiquidated = paused;
  //markets that have been enabled for collateral
  // let ftokens = await connectedContract.getAssetsIn(address);

  let ftokens = ["0x9E5cFe1F5A81DAB8Ba0F8ceea094B28907Ce4202"];
  let abc: AccountFtokenModel[] = await Promise.all(
    ftokens.map(async (ftoken) => {
      let tk = await getAccountFtoken(address, ftoken);
      return tk;
    })
  );
  account.tokens = abc;
  let addTBV = zeroBD;
  let addTCV = zeroBD;
  for (let token of abc || []) {
    let preTBV = initialExchangeMantissa.mul(token?.fTokenBalance);
    addTBV = addTBV.add(preTBV);
    addTCV = addTCV.add(token?.storedBorrowBalance);
  }

  account.totalCollateralValue = addTCV;
  account.totalBorrowValue = addTBV;

  console.log("GET ACCOUNTS HERE", ftokens);
  return account;
};
