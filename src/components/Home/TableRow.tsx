import type { FC } from "react";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { getAccountFtoken, MarketModel } from "@/utils";
import Image from "next/image";
import { useAccountFtoken } from "@/hooks/useAccountFtoken";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
const TableRow = ({ market, handleSelectMarket, supplyRate, address }) => {
  const [enabled, setEnabled] = useState(false);
  const { accountFtoken, isLoading, isError } = useAccountFtoken(
    address,
    market
  );
  //   if (isError) {
  //     return <div>IS ERROR</div>;
  //   }
  if (isLoading) {
    return <div>LOading</div>;
  }
  if (address) {
    console.log("TTHIS IS THE ACCOUNTFTOKEN DATA", accountFtoken);
    return (
      <>
        <div className=" dark:bg-gray-800 rounded-xl bg-gray-200 p-[0.5px]"></div>
        <div
          key={market?.id}
          className={clsx(
            "cursor-pointer hover:opacity-50 w-full grid  grid-cols-5 px-4 py-4",
            {
              "grid-cols-4": !address,
            }
          )}
        >
          <div className="flex w-full pb-4 col-span-1">
            <label
              className="flex flex-row gap-2 cursor-pointer items-center"
              htmlFor="sbwr-modal"
              onClick={() => handleSelectMarket(market)}
            >
              <span className="w-8 h-full">
                <Image
                  src={`./images/crypto/${market?.underlyingSymbol?.toLowerCase()}.svg`}
                  alt="Image of markets"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
              </span>
              <span className="flex flex-col gap-0">
                <h3 className="">{market?.underlyingSymbol?.toUpperCase()}</h3>
              </span>
            </label>
          </div>
          <div className="bg-neutral  w-full pb-4 col-span-1">
            <h3>
              {" "}
              {supplyRate
                ? market?.supplyRate?.toNumber()?.toFixed(2)
                : market?.borrowRate?.toNumber()?.toFixed(2)}
              %
            </h3>
          </div>

          {address && (
            <div className="bg-neutral  w-full pb-4 col-span-1">
              <label
                className="flex flex-col cursor-pointer"
                htmlFor="sbwr-modal"
                onClick={() => handleSelectMarket(market)}
              >
                <h3 className="text-neutral-content">
                  {market?.reserves?.toNumber()?.toFixed(2)}{" "}
                  {market?.underlyingSymbol?.toUpperCase()}
                </h3>
              </label>
            </div>
          )}

          <div className="bg-neutral  w-full pb-4 col-span-1">
            <h3 className="text-neutral-content">
              {" "}
              ${market.liquidityUSD?.toNumber()?.toFixed(2)}
            </h3>
          </div>

          <div className="bg-neutral  w-full pb-4 col-span-1">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-sky-500" : "bg-gray-200"
              } relative inline-flex h-4 w-11 items-center rounded-full`}
            >
              {" "}
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-3 w-3 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className=" dark:bg-gray-800 rounded-xl bg-gray-200 p-[0.5px]"></div>
        <div
          key={market?.id}
          className={clsx(
            "cursor-pointer hover:opacity-50 w-full grid  grid-cols-5 px-4 py-4",
            {
              "grid-cols-4": !address,
            }
          )}
        >
          <div className="flex w-full pb-4 col-span-1">
            <label
              className="flex flex-row gap-2 cursor-pointer items-center"
              htmlFor="sbwr-modal"
              onClick={() => handleSelectMarket(market)}
            >
              <span className="w-8 h-full">
                <Image
                  src={`./images/crypto/${market?.underlyingSymbol?.toLowerCase()}.svg`}
                  alt="Image of markets"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
              </span>
              <span className="flex flex-col gap-0">
                <h3 className="">{market?.underlyingSymbol?.toUpperCase()}</h3>
              </span>
            </label>
          </div>
          <div className="bg-neutral  w-full pb-4 col-span-1">
            <h3>
              {" "}
              {supplyRate
                ? market?.supplyRate?.toNumber()?.toFixed(2)
                : market?.borrowRate?.toNumber()?.toFixed(2)}
              %
            </h3>
          </div>

          {address && (
            <div className="bg-neutral  w-full pb-4 col-span-1">
              <label
                className="flex flex-col cursor-pointer"
                htmlFor="sbwr-modal"
                onClick={() => handleSelectMarket(market)}
              >
                <h3 className="text-neutral-content">
                  {market?.reserves?.toNumber()?.toFixed(2)}{" "}
                  {market?.underlyingSymbol?.toUpperCase()}
                </h3>
              </label>
            </div>
          )}

          <div className="bg-neutral  w-full pb-4 col-span-1">
            <h3 className="text-neutral-content">
              {" "}
              ${market.liquidityUSD?.toNumber()?.toFixed(2)}
            </h3>
          </div>

          <div className="bg-neutral  w-full pb-4 col-span-1">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-sky-500" : "bg-gray-200"
              } relative inline-flex h-4 w-11 items-center rounded-full`}
            >
              {" "}
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-3 w-3 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
};

export default TableRow;
