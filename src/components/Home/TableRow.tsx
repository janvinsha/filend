import { FC, useEffect } from "react";
import React, { useState } from "react";
import { AccountFtokenModel, getAccountFtoken, MarketModel } from "@/utils";
import Image from "next/image";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import filtrollerAbi from "@utils/data/filtroller-abi.json";
import { FILTROLLER_ADDRESS } from "@utils/constants";
import UseCollateralModal from "./UseCollateralModal";
import SbwrModal from "./SbwrModal";
import { BigNumber } from "ethers";
import { from } from "@apollo/client";

const TableRow = ({
  market,
  handleSelectMarket,
  supplyRate,
  address,
  supplyBalance,
  successfulTransaction,
}) => {
  const [enabled, setEnabled] = useState(false);
  const [showCM, setShowCM] = useState(false);
  const [showSbwr, setShowSbwr] = useState(false);
  const [accountFtoken, setAccountFtoken] = useState<AccountFtokenModel>();

  async function _getAccountFtoken() {
    try {
      const acctData = await getAccountFtoken(address, market?.id);
      console.log("THIS IS THE RETURN FROM ACCOUNT FTOKEN", acctData);
      setAccountFtoken(acctData);
      setEnabled(acctData?.enteredMarket);
    } catch (error) {}
  }
  useEffect(() => {
    if (address) {
      _getAccountFtoken();
    }
  }, [market?.id]);

  const { config } = usePrepareContractWrite({
    address: FILTROLLER_ADDRESS,
    abi: filtrollerAbi,
    functionName: "enterMarkets",
    args: [[`${market?.id}`]],
  });
  const { data, isLoading, isSuccess, write, status, error } =
    useContractWrite(config);

  const useAsCollateral = () => {
    setShowCM(true);
  };
  const switchHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <div key={`OX${market?.id}`}>
      <div
        className={clsx(
          "cursor-pointer hover:opacity-50 w-full grid grid-cols-5 px-4 py-4",
          {
            "grid-cols-3": !address,
          }
        )}
        onClick={() => setShowSbwr(true)}
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
              ? market?.supplyRate?.toFixed(2)
              : market?.borrowRate?.toFixed(2)}
            %
          </h3>
        </div>
        {address && (
          <div className="bg-neutral  w-full pb-4 col-span-1">
            <h3>
              {supplyBalance
                ? accountFtoken?.amountSupplied?.toNumber()?.toFixed(2)
                : Number(accountFtoken?.storedBorrowBalance).toFixed(2)}{" "}
              {market?.underlyingSymbol?.toUpperCase()}
            </h3>
          </div>
        )}

        <div className="bg-neutral  w-full pb-4 col-span-1">
          <h3 className="text-neutral-content">
            {" "}
            ${market.liquidityUSD?.toNumber()?.toFixed(2)}
          </h3>
        </div>

        {address && (
          <div className="bg-neutral  w-full pb-4 col-span-1">
            <Switch
              checked={accountFtoken?.enteredMarket}
              onChange={useAsCollateral}
              className={`${
                accountFtoken?.enteredMarket ? "bg-sky-500" : "bg-gray-200"
              } relative inline-flex h-4 w-11 items-center rounded-full`}
              onClick={switchHandler}
            >
              {" "}
              <span
                className={`${
                  accountFtoken?.enteredMarket
                    ? "translate-x-6"
                    : "translate-x-1"
                } inline-block h-3 w-3 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        )}
      </div>
      <UseCollateralModal
        setShowCM={setShowCM}
        show={showCM}
        onClick={() => write?.()}
        loading={isLoading}
        name={market?.underlyingSymbol?.toUpperCase()}
      />

      <SbwrModal
        setShowSbwr={setShowSbwr}
        show={showSbwr}
        market={market}
        name={market?.underlyingSymbol?.toUpperCase()}
        balanceUnderlyingBN={accountFtoken?.balanceOfUnderlyingBN}
        balanceUnderlying={accountFtoken?.balanceOfUnderlying}
        amountSupplied={accountFtoken?.amountSupplied?.toNumber()?.toFixed(2)}
        successfulTransaction={successfulTransaction}
      />
    </div>
  );
};

export default TableRow;
