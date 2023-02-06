import Modal from "@components/UIElements/Modal";
import type { FC } from "react";
import React, { useState } from "react";
import { Fragment } from "react";
import { Button } from "../UIElements/Button";
import Borrow from "./Borrow";
import Repay from "./Repay";
import Supply from "./Supply";
import Withdraw from "./Withdraw";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
type Props = {
  show: boolean;
  setShowSbwr: React.Dispatch<boolean>;
};

const SbwrModal = ({
  show,
  setShowSbwr,
  market,
  balanceUnderlying,
  name,
  balanceUnderlyingBN,
  amountSupplied,
  successfulTransaction,
}) => {
  const tabs = ["Supply", "Borrow", "Withdraw", "Repay"];
  const [activeTab, setActiveTab] = useState("Supply");
  return (
    <Modal
      title=""
      onClose={() => setShowSbwr(false)}
      show={show}
      panelClassName="max-w-md"
      autoClose={false}
    >
      <Tab.Group as="div" className="w-full">
        <Tab.List className="flex overflow-x-auto no-scrollbar">
          <Tab
            className={({ selected }) =>
              clsx(
                "px-3 py-2 mr-2 border-b-2 flex items-center font-medium space-x-2 text-md focus:outline-none",
                selected
                  ? "opacity-100 border-sky-500"
                  : "border-transparent opacity-50"
              )
            }
          >
            <span>Supply </span>
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                "px-3 py-2 mr-2 border-b-2 flex items-center font-medium space-x-2 text-md focus:outline-none",
                selected
                  ? "opacity-100 border-sky-500"
                  : "border-transparent opacity-50"
              )
            }
          >
            <span>Withdraw</span>
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                "px-3 py-2 mr-2 border-b-2 flex items-center font-medium space-x-2 text-md focus:outline-none",
                selected
                  ? "opacity-100 border-sky-500"
                  : "border-transparent opacity-50"
              )
            }
          >
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <span>Borrow</span>
            )}
          </Tab>

          <Tab
            className={({ selected }) =>
              clsx(
                "px-3 py-2 mr-2 border-b-2 flex items-center font-medium space-x-2 text-md focus:outline-none",
                selected
                  ? "opacity-100 border-sky-500"
                  : "border-transparent opacity-50"
              )
            }
          >
            {" "}
            <span>Repay</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="py-3 focus:outline-none">
            <Supply
              balanceUnderlying={balanceUnderlying}
              balanceUnderlyingBN={balanceUnderlyingBN}
              name={name}
              market={market}
              onClose={() => setShowSbwr(false)}
              successfulTransaction={successfulTransaction}
            />
          </Tab.Panel>
          <Tab.Panel className="py-3 focus:outline-none">
            <Withdraw
              balanceUnderlying={balanceUnderlying}
              balanceUnderlyingBN={balanceUnderlyingBN}
              name={name}
              market={market}
              amountSupplied={amountSupplied}
             
            />
          </Tab.Panel>
          <Tab.Panel className="py-3 focus:outline-none">
            <Borrow
              balanceUnderlying={balanceUnderlying}
              balanceUnderlyingBN={balanceUnderlyingBN}
              name={name}
              market={market}
            />
          </Tab.Panel>

          <Tab.Panel className="py-3 focus:outline-none">
            <Repay
              balanceUnderlying={balanceUnderlying}
              balanceUnderlyingBN={balanceUnderlyingBN}
              name={name}
              market={market}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Modal>
  );
};

export default SbwrModal;
