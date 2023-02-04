import useAppStore from "@lib/store";
import usePersistStore from "@lib/store/persist";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import clearLocalStorage from "@utils/functions/clearLocalStorage";
import logger from "@utils/logger";
import { useAccount, useSignMessage } from "wagmi";

import ConnectWalletButton from "./ConnectWalletButton";

const Login = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const onError = () => {
    setLoading(false);
    clearLocalStorage();
  };

  const { signMessageAsync } = useSignMessage({
    onError,
  });

  const handleSign = async () => {
    try {
      setLoading(true);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Sign in failed");
      clearLocalStorage();
      logger.error("[Error Sign In]", error);
    }
  };

  return (
    <ConnectWalletButton handleSign={() => handleSign()} signing={loading} />
  );
};

export default Login;
