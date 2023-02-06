import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../UIElements/Button";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import erc20Abi from "@utils/data/erc-20-abi.json";
import ftokenAbi from "@utils/data/ftoken-abi.json";
import { FILTROLLER_ADDRESS } from "@utils/constants";
import { Input } from "../UIElements/Input";
import usePersistStore from "@/lib/store/persist";
import toast from "react-hot-toast";
import { BigNumber, ethers } from "ethers";
import { MarketModel } from "@/utils";

const Supply = ({
  balanceUnderlyingBN,
  name,
  market,
  balanceUnderlying,
  amountSupplied,
  onClose,
  successfulTransaction,
}) => {
  const { address } = useAccount();
  const [enabled, setEnabled] = useState(false);
  const usdcEnabled = usePersistStore((state) => state.usdcEnabled);
  const usdtEnabled = usePersistStore((state) => state.usdtEnabled);
  const filEnabled = usePersistStore((state) => state.filEnabled);
  const setUsdcEnabled = usePersistStore((state) => state.setUsdcEnabled);
  const setUsdtEnabled = usePersistStore((state) => state.setUsdtEnabled);

  const setFilEnabled = usePersistStore((state) => state.setFilEnabled);
  const [amount, setAmount] = useState();
  const { config } = usePrepareContractWrite({
    address: market?.underlyingAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [market?.id, ethers.utils.parseUnits("10000000", "ether")],
    // onSuccess: () => successfulTransaction(),
  });
  const { config: mintConfig } = usePrepareContractWrite({
    address: market?.id,
    abi: ftokenAbi,
    functionName: "mint",
    args: [amount * 10 ** 6],
    overrides: {
      gasLimit: 250000,
      gasPrice: 20000000000,
    },
    // onSuccess: () => successfulTransaction(),
  });
  const { data, isLoading, isSuccess, write, status, error } =
    useContractWrite(config);

  const { isLoading: mintLoading, write: mintWrite } =
    useContractWrite(mintConfig);

  const enableHandler = async () => {
    write?.();
    if (name == "USDT") {
      setUsdtEnabled(true);
    } else if (name == "USDC") {
      setUsdcEnabled(true);
    } else if (name == "FIL") {
      setFilEnabled(true);
    } else {
    }
    setTimeout(() => {
      onClose();
    }, 3000);
  };
  const mintHandler = async () => {
    mintWrite?.();

    setTimeout(() => {
      onClose();
    }, 3000);
  };
  useEffect(() => {
    if (name == "USDT") {
      setEnabled(usdtEnabled);
    } else if (name == "USDC") {
      setEnabled(usdcEnabled);
    } else if (name == "FIL") {
      setEnabled(filEnabled);
    } else if (name == "ETH") {
      setEnabled(true);
    } else {
    }
  }, []);

  return (
    <div className="px-2 flex flex-col gap-2">
      <Input
        onChange={(e) => setAmount(e?.target?.value)}
        type="Number"
        disabled={balanceUnderlying == 0 || !enabled}
        max={balanceUnderlying}
      />
      {enabled ? (
        <Button
          onClick={mintHandler}
          loading={mintLoading}
          disabled={balanceUnderlying == 0}
        >
          {balanceUnderlying == 0
            ? "Not enough balance"
            : "Supply " + name?.toUpperCase()}
        </Button>
      ) : (
        <Button onClick={enableHandler} loading={isLoading}>
          Enable {name?.toUpperCase()}
        </Button>
      )}

      <div className="flex justify-between">
        <span>Wallet Balance</span>
        <span>
          {balanceUnderlying} {name?.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
export default Supply;
