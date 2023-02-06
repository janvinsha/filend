export const FILEND_APP_NAME = "Filend";

export const FILEND_ENV = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const IS_MAINNET = FILEND_ENV === "mainnet";
// polygon
export const POLYGON_RPC_URL = IS_MAINNET
  ? "https://rpc.ankr.com/polygon"
  : "https://rpc.ankr.com/polygon_mumbai";
export const POLYGON_CHAIN_ID = IS_MAINNET ? 137 : 80001;
export const GOERLI_CHAIN_ID = 5;
export const FILTROLLER_ADDRESS = "0x294C2B43AED48ae8F4e57173f2D6b8e2d8B893F5";
export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const ORACLE_ADDRESS = "0xCD22519970010d48bFB32197c6DAFb5D47932957";
export const FILEND_LENS_ADDRESS = "0x37Aa658AA397997a8fc660180582763Be2c53871";
