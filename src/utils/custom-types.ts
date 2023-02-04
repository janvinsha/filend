import { StringLiteralLike } from "typescript";
import { BigNumber } from "ethers";
export interface CustomErrorWithData extends Error {
  data?: {
    message: string;
  };
}

export interface MarketModel {
  id: string;
  borrowRate: BigNumber;
  cash: BigNumber;
  collateralFactor: BigNumber;
  exchangeRate: BigNumber;
  interestRateModelAddress: string;
  name: string;
  reserves: BigNumber;
  supplyRate: BigNumber;
  symbol: string;
  totalBorrows: BigNumber;
  totalSupply: BigNumber;
  underlyingAddress: string;
  underlyingName: string;
  underlyingPrice: BigNumber;
  underlyingSymbol: string;
  accrualBlockNumber: BigNumber;
  blockTimestamp: BigNumber;
  borrowIndex: BigNumber;
  reserveFactor: BigNumber;
  underlyingPriceUSD: BigNumber;
  underlyingDecimals: BigNumber;
  liquidityUSD: BigNumber;
}
export interface AccountModel {
  id: string;
  tokens: AccountFtokenModel[];
  accountLiquidated: boolean;
  accountLiquidator: BigNumber;
  health: BigNumber;
  totalBorrowValue: BigNumber;
  totalCollateralValue: BigNumber;
}

export interface AccountFtokenModel {
  id: string;
  market: string;
  symbol: string;
  account: AccountModel;
  transactions: AccountFtokenTransactionModel;
  accrualBlockNumber: BigNumber;
  enteredMarket: boolean;
  fTokenBalance: BigNumber;
  totalUnderlyingSupplied: BigNumber;
  totalUnderlyingRedeemed: BigNumber;
  accountBorrowIndex: BigNumber;
  totalUnderlyingBorrowed: BigNumber;
  totalUnderlyingRepaid: BigNumber;
  storedBorrowBalance: BigNumber;
}

export interface AccountFtokenTransactionModel {
  id: BigNumber;

  account: AccountFtokenModel;

  tx_hash: string;

  timestamp: BigNumber;

  block: BigNumber;

  logIndex: BigNumber;
}
