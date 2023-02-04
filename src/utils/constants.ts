export const FILEND_APP_NAME = "Filend";

export const FILEND_ENV = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const IS_MAINNET = FILEND_ENV === "mainnet";
// polygon
export const POLYGON_RPC_URL = IS_MAINNET
  ? "https://rpc.ankr.com/polygon"
  : "https://rpc.ankr.com/polygon_mumbai";
export const POLYGON_CHAIN_ID = IS_MAINNET ? 137 : 80001;
export const GOERLI_CHAIN_ID = 5;
export const FILTROLLER_ADDRESS = "0xddE41e7aF3E6b3Ef46A70025d0d859166270AC49";
export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const ORACLE_ADDRESS = "0xfc6f773c76f63EFe8BB8584fa5E124C49A270349";
export const ORACLE_2_ADDRESS = "0x513Ab6018a9ce0a20d72B5491C3b5D0241b3C2f5";
export const FILEND_LENS_ADDRESS = "0x42C0676BD30e8649aF6f2456D0c521bedEea7eec";
