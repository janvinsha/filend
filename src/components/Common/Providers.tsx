import { ApolloProvider } from "@apollo/client";
import apolloClient from "@lib/apollo";
import {
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { ThemeOptions } from "@rainbow-me/rainbowkit/dist/themes/baseTheme";
import {
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { ThemeProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";
import React from "react";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai, goerli } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import ErrorBoundary from "./ErrorBoundary";

const { chains, provider } = configureChains(
  [goerli],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://goerli.blockpi.network/v1/rpc/public",
      }),
    }),
    publicProvider(),
  ],
  { targetQuorum: 1 }
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      metaMaskWallet({ chains, shimDisconnect: true }),
      rainbowWallet({ chains }),
      ledgerWallet({ chains }),
      coinbaseWallet({ appName: "Filend", chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Enables usage of theme in RainbowKitProvider
const RainbowKitProviderWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const themeOptions: ThemeOptions = {
    fontStack: "system",
    overlayBlur: "small",
    accentColor: "#6366f1",
  };
  return (
    <RainbowKitProvider
      modalSize="compact"
      chains={chains}
      theme={
        theme === "dark" ? darkTheme(themeOptions) : lightTheme(themeOptions)
      }
    >
      {children}
    </RainbowKitProvider>
  );
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary>
      <WagmiConfig client={wagmiClient}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <RainbowKitProviderWrapper>
            <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
          </RainbowKitProviderWrapper>
        </ThemeProvider>
      </WagmiConfig>
    </ErrorBoundary>
  );
};

export default Providers;
