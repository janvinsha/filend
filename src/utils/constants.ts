export const HEMBA_APP_NAME = "Hemba";

export const HEMBA_ENV = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const IS_MAINNET = HEMBA_ENV === "mainnet";
// polygon
export const POLYGON_RPC_URL = IS_MAINNET
  ? "https://rpc.ankr.com/polygon"
  : "https://rpc.ankr.com/polygon_mumbai";
export const POLYGON_CHAIN_ID = IS_MAINNET ? 137 : 80001;
