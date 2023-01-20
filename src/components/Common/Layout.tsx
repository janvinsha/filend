import Animated from "@/components/Common/Animated";
import usePersistStore from "@lib/store/persist";
import clsx from "clsx";

import Head from "next/head";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import type { FC, ReactNode } from "react";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import type { CustomErrorWithData } from "@utils/index";

import { getShowFullScreen } from "@utils/functions/getShowFullScreen";
import { getToastOptions } from "@utils/functions/getToastOptions";
import useIsMounted from "@hooks/useIsMounted";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

import FullPageLoader from "./FullPageLoader";
interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const sidebarCollapsed = usePersistStore((state) => state.sidebarCollapsed);

  const { resolvedTheme } = useTheme();
  const { mounted } = useIsMounted();

  const { pathname, replace, asPath } = useRouter();

  const { disconnect } = useDisconnect({
    onError(error: CustomErrorWithData) {
      toast.error(error?.data?.message ?? error?.message);
    },
  });

  const showFullScreen = getShowFullScreen(pathname);

  if (!mounted) return <FullPageLoader />;

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={resolvedTheme === "dark" ? "#000000" : "#ffffff"}
        />
      </Head>
      <Toaster
        position="bottom-right"
        toastOptions={getToastOptions(resolvedTheme)}
      />
      <div
        className={clsx("flex pb-10 md:pb-0", {
          "!pb-0": showFullScreen,
        })}
      >
        {/* <Sidebar /> */}
        <div
          className={clsx(
            "w-full",
            showFullScreen ? "px-0" : "",
            sidebarCollapsed || pathname === "/watch/[id]"
              ? "md:pl-[90px]"
              : "md:pl-[180px]"
          )}
        >
          {/* {!NO_HEADER_PATHS.includes(pathname) && (
            <Header className={showFullScreen ? "hidden md:flex" : ""} />
          )} */}

          <div
            className={clsx(
              "2xl:py-6 py-4 ultrawide:max-w-[110rem] mx-auto md:px-3 ultrawide:px-0",
              {
                "!p-0": showFullScreen,
              }
            )}
          >
            <Animated>{children}</Animated>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
