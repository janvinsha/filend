import { AccountModel, getAccount, MarketModel } from "@/utils";
import { useEffect, useState } from "react";

import { getMarkets } from "../utils/functions/markets";

export function useFilendAccount(address: string): {
  account: AccountModel[] | null;
  isLoading: boolean;
  isError: boolean;
} {
  const [account, setAccount] = useState<AccountModel[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMarketList() {
      try {
        const acctData = await getAccount(address);
        setAccount(acctData);
      } catch (error) {
        setError(true);
      }
    }
    getMarketList();
  }, []);

  return {
    account,
    isLoading: !error && !account,
    isError: error,
  };
}
