import { Button } from "@components/UIElements/Button";
import useAppStore from "@lib/store";
import usePersistStore from "@lib/store/persist";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React from "react";
import toast from "react-hot-toast";
import type { CustomErrorWithData } from "../../../utils";
import { GOERLI_CHAIN_ID } from "../../../utils";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import UserMenu from "../UserMenu";
type Props = {
  handleSign: () => void;
  signing?: boolean;
};

const ConnectWalletButton = ({ handleSign, signing }: Props) => {
  const { connector, isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork({
    onError(error: CustomErrorWithData) {
      toast.error(error?.data?.message ?? error?.message);
    },
  });
  const { chain } = useNetwork();

  const { openConnectModal } = useConnectModal();

  return connector?.id && isConnected ? (
    chain?.id === GOERLI_CHAIN_ID ? (
      <UserMenu />
    ) : (
      <Button
        onClick={() => switchNetwork && switchNetwork(GOERLI_CHAIN_ID)}
        variant="danger"
      >
        <span className="text-white">Switch network</span>
      </Button>
    )
  ) : (
    <Button onClick={openConnectModal}>
      Connect
      <span className="hidden ml-1 md:inline-block">Wallet</span>
    </Button>
  );
};

export default ConnectWalletButton;
