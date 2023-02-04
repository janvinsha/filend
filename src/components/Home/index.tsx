import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useMarketList } from "@hooks/useMarketList";
import MetaTags from "../Common/MetaTags";
import DashboardShimmer from "../Shimmers/DashboardShimmer";
import { useAccount } from "wagmi";
import { Button } from "../UIElements/Button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import DesktopTable from "./DesktopTable";
import { useFilendAccount } from "@/hooks/useFilendAccount";
const Home: NextPage = () => {
  const { marketList, isLoading, isError } = useMarketList();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { account } = useFilendAccount(address);
  const handleSelectMarket = () => {};
  if (isLoading) {
    return <DashboardShimmer />;
  }
  if (!marketList?.length || isError) {
    return null;
  }

  console.log("HERE IS THE MARKET LIST AND ACCOUNT", marketList, account);
  return (
    <div className="container mx-auto max-w-7xl">
      <MetaTags title="App" />
      <div className="flex flex-col gap-4">
        {/* //this is where the 3 cols of supply, borrow balance starts */}

        {address ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="dark:bg-theme rounded-xl bg-white md:col-span-1 p-6 h-24">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-sky-500">
                  Supply Balance{" "}
                </span>

                <span>$0.00001</span>
              </div>
            </div>
            {/* <div className=" dark:bg-theme rounded-xl bg-white md:col-span-1 p-6 ">
              <div className="flex flex-col items-center">
                <span className="font-semibold  text-sky-500">Net APY </span>

                <span>$0.00001</span>
              </div>
            </div> */}
            <div className=" dark:bg-theme rounded-xl bg-white md:col-span-1 p-6 ">
              <div className="flex flex-col items-center">
                <span className="font-semibold  text-sky-500">
                  Borrow Balance{" "}
                </span>
                <span>$0.00001</span>
              </div>
            </div>
            <div className=" dark:bg-theme rounded-xl bg-white md:col-span-1 p-6 ">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-sky-500">Borrow Limit</span>
                <span>$0.22</span>
              </div>
            </div>
          </div>
        ) : (
          <div className=" dark:bg-theme rounded-xl bg-white md:col-span-1 p-6 ">
            <div className="flex flex-col items-center gap-4 ">
              <span className="font-semibold text-lg w-1/2 text-center">
                Filend is an open-source protocol for algorithmic, efficient
                Money Markets on the Filecoin network.
              </span>
              <Button className="text-sm" onClick={openConnectModal}>
                Connect Wallet to Experience
              </Button>
            </div>
          </div>
        )}
        {/* this is where the*/}
        <div className=" dark:bg-theme rounded-xl bg-white md:col-span-1 p-6 ">
          <DesktopTable
            marketList={marketList}
            handleSelectMarket={handleSelectMarket}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
