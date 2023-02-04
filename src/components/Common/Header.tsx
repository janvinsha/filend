import clsx from "clsx";

import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import React, { useState } from "react";

import Login from "./Auth/Login";

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  const router = useRouter();
  const isActivePath = (path: string) => router.pathname === path;
  return (
    <div
      className={clsx(
        "sticky top-0 py-2.5 left-0 right-0 z-10 flex w-full items-center bg-white dark:bg-slate-900"
      )}
    >
      <div className="w-full">
        <div className="flex ultrawide:px-6 px-6 items-center justify-between w-full">
          <div className="md:w-[330px]">
            <Link href="/" className="flex items-center gap-2">
              <img
                src={`./images/brand/loader.png`}
                draggable={false}
                className="w-10 h-1-"
                alt="filend"
              />
              <h1 className="text-xl">Filend</h1>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-end gap-6">
            <Link
              href="/"
              className={clsx(
                "",
                isActivePath("/") ? "text-sky-500 dark:text-sky-500" : ""
              )}
            >
              App
            </Link>
            <Link
              href="/vote"
              className={clsx(
                "",
                isActivePath("/vote") ? "text-sky-500 dark:text-sky-500" : ""
              )}
            >
              Vote
            </Link>
          </div>
          <div className="flex flex-row items-center justify-end space-x-2 md:space-x-3 md:w-96">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
