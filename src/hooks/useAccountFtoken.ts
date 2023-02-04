import { AccountFtokenModel } from "@/utils";
import { useEffect, useState } from "react";

import { getAccountFtoken } from "../utils/functions/accounts";

export function useAccountFtoken(
  address: string,
  market: string
): {
  accountFtoken: AccountFtokenModel[] | null;
  isLoading: boolean;
  isError: boolean;
} {
  const [accountFtoken, setAccountFtoken] = useState<
    AccountFtokenModel[] | null
  >(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function _getAccountFtoken() {
      try {
        const acctData = await getAccountFtoken(address, market);
        setAccountFtoken(acctData);
      } catch (error) {
        setError(true);
      }
    }
    _getAccountFtoken();
  }, []);

  return {
    accountFtoken,
    isLoading: !error && !accountFtoken,
    isError: error,
  };
}
