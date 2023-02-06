import { StringLiteralLike } from "typescript";
import { BigNumber } from "ethers";
export interface CustomErrorWithData extends Error {
  data?: {
    message: string;
  };
}

export interface MarketModel {
  id: string;
  borrowRate: number;
  cash: BigNumber;
  collateralFactor: BigNumber;
  exchangeRate: BigNumber;
  interestRateModelAddress: string;
  name: string;
  reserves: BigNumber;
  supplyRate: number;
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
  accountLiquidator: string;
  health: number;
  totalBorrowValue: string;
  totalCollateralValue: string;
  borrowLimit: string;
}

export interface AccountFtokenModel {
  id: string;
  market: string;
  symbol: string;
  account: AccountModel;
  transactions: AccountFtokenTransactionModel;
  accrualBlockNumber: number;
  enteredMarket: boolean;
  fTokenBalance: string;
  balanceOfUnderlying: string;
  balanceOfUnderlyingBN: BigNumber;
  totalUnderlyingSupplied: string;
  totalUnderlyingRedeemed: string;
  accountBorrowIndex: string;
  totalUnderlyingBorrowed: string;
  totalUnderlyingRepaid: string;
  storedBorrowBalance: string;
  exchangeRate: BigNumber;
  amountSupplied: BigNumber;
  borrowLimitUSD: number;
}

export interface AccountFtokenTransactionModel {
  id: BigNumber;

  account: AccountFtokenModel;

  tx_hash: string;

  timestamp: BigNumber;

  block: BigNumber;

  logIndex: BigNumber;
}
