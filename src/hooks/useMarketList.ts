import { MarketModel } from "@/utils";
import { useEffect, useState } from "react";

import { getMarkets } from "../utils/functions/markets";

export function useMarketList(): {
  marketList: MarketModel[] | null;
  isLoading: boolean;
  isError: boolean;
} {
  const [marketList, setMarketList] = useState<MarketModel[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMarketList() {
      try {
        const markets = await getMarkets();
        setMarketList(markets);
      } catch (error) {
        setError(true);
      }
    }
    getMarketList();
  }, []);

  return {
    marketList,
    isLoading: !error && !marketList,
    isError: error,
  };
}
