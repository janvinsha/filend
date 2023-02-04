import { Button } from "@components/UIElements/Button";
import DropMenu, { NextLink } from "@components/UIElements/DropMenu";
import { Menu } from "@headlessui/react";
import useAppStore from "@lib/store";
import usePersistStore from "@lib/store/persist";

import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import type { CustomErrorWithData } from "../../utils";

import clearLocalStorage from "@utils/functions/clearLocalStorage";
import { useAccount, useDisconnect } from "wagmi";

import CheckOutline from "./Icons/CheckOutline";
import ChevronLeftOutline from "./Icons/ChevronLeftOutline";
import CogOutline from "./Icons/CogOutline";
import GraphOutline from "./Icons/GraphOutline";
import HandWaveOutline from "./Icons/HandWaveOutline";
import MoonOutline from "./Icons/MoonOutline";
import SunOutline from "./Icons/SunOutline";
import UserOutline from "./Icons/UserOutline";
import truncate from "@/utils/functions/truncate";

const UserMenu = () => {
  const { theme, setTheme } = useTheme();

  const { address } = useAccount();
  const { disconnect } = useDisconnect({
    onError(error: CustomErrorWithData) {
      toast.error(error?.data?.message || error?.message);
    },
  });

  const logout = () => {
    clearLocalStorage();
    disconnect?.();
  };

  return (
    <DropMenu trigger={<Button className="flex-none">Account</Button>}>
      <div className="px-1 mt-1.5 w-48 divide-y shadow max-h-96 divide-gray-200 dark:divide-gray-800 overflow-hidden border border-gray-100 rounded-xl dark:border-gray-800 bg-secondary dark:bg-theme">
        <button
          type="button"
          className="flex items-center w-full p-2 space-x-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <SunOutline className="w-4 h-4" />
          ) : (
            <MoonOutline className="w-4 h-4" />
          )}
          <span className="truncate whitespace-nowrap">
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </span>
        </button>
        <button
          type="button"
          className="flex items-center w-full px-2.5 py-2 space-x-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => logout()}
        >
          <HandWaveOutline className="w-4 h-4" />
          <span className="truncate whitespace-nowrap">Logout</span>
        </button>
      </div>
    </DropMenu>
  );
};

export default UserMenu;
