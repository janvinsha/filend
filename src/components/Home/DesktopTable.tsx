import { useState } from "react";
import Image from "next/image";

import { getAccountFtoken, MarketModel } from "@/utils";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import clsx from "clsx";
import ChevronDownOutline from "../Common/Icons/ChevronDownOutline";
import ChevronUpOutline from "../Common/Icons/ChevronUpOutline";
import TableRow from "./TableRow";
import toast from "react-hot-toast";

interface DesktopTablePropsType {
  marketList: MarketModel[] | null;
  handleSelectMarket: (market: MarketModel) => void;
}

const DesktopTable = ({
  marketList,
  handleSelectMarket,
}: DesktopTablePropsType) => {
  const [supplyRate, setSupplyRate] = useState(true);
  const [supplyBalance, setSupplyBalance] = useState(true);

  const { address } = useAccount();
  const successfulTransaction = () => {
    toast.success("Transaction successful");
  };
  return (
    <div className="w-full">
      {/* Head of the table */}
      <div
        className={clsx("grid px-4 py-4 grid-cols-5 w-full", {
          "grid-cols-3": !address,
        })}
      >
        <span className="col-span-1 font-semibold">Market </span>
        <span
          className="col-span-1 font-semibold cursor-pointer flex items-center"
          onClick={() => setSupplyRate(!supplyRate)}
        >
          {supplyRate ? "Supply APY" : "Borrow APY"}
          {supplyRate ? (
            <>
              <ChevronDownOutline className="h-3 ml-1 w-3 font-semibold" />
            </>
          ) : (
            <>
              <ChevronUpOutline className="h-3 w-3 ml-1 font-semibold" />
            </>
          )}
        </span>
        {address ? (
          <span
            className="col-span-1 font-semibold cursor-pointer flex items-center"
            onClick={() => setSupplyBalance(!supplyBalance)}
          >
            {supplyBalance ? "Supply Balance" : "Borrow Balance"}
            {supplyBalance ? (
              <>
                <ChevronDownOutline className="h-3 ml-1 w-3 font-semibold" />
              </>
            ) : (
              <>
                <ChevronUpOutline className="h-3 w-3 ml-1 font-semibold" />
              </>
            )}
          </span>
        ) : (
          ""
        )}

        <span className="col-span-1 font-semibold">Liquidity</span>
        {address ? (
          <span className="col-span-1 font-semibold">Collateral</span>
        ) : (
          ""
        )}
      </div>

      {marketList!.map((market, i) => (
        <TableRow
          market={market}
          handleSelectMarket={handleSelectMarket}
          supplyRate={supplyRate}
          supplyBalance={supplyBalance}
          address={address}
          key={i}
          successfulTransaction={successfulTransaction}
        />
      ))}
    </div>
  );
};
export default DesktopTable;
