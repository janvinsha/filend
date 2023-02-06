import { useState } from "react";
import Link from "next/link";
import { Button } from "../UIElements/Button";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ftokenAbi from "@utils/data/ftoken-abi";
import { FILTROLLER_ADDRESS } from "@utils/constants";
import { Input } from "../UIElements/Input";
import { MarketModel } from "@/utils";
type Props = {

};

const Supply: FC<Props> = ({ name, market, amountSupplied }) => {
  const [enabled, setEnabled] = useState(true);
  const [amount, setAmount] = useState();

  const { config } = usePrepareContractWrite({
    address: market?.id,
    abi: ftokenAbi,
    functionName: "redeemUnderlying",
    args: [amount * 10 ** 6],
    overrides: {
      gasLimit: 250000,
      gasPrice: 20000000000,
    },
  });
  const { data, isLoading, isSuccess, write, status, error } =
    useContractWrite(config);

  return (
    <div className="px-2 flex flex-col gap-2">
      <Input
        onChange={(e) => setAmount(e?.target?.value)}
        type="Number"
        max={amountSupplied}
        // disabled={amountSupplied == 0}
      />
      <Button
        onClick={() => write?.()}
        loading={isLoading}
        // disabled={amountSupplied == 0}
      >
        {amountSupplied == 0
          ? "No amount to withdraw"
          : "Withdraw" + name?.toUpperCase()}
      </Button>
      <div className="flex justify-between">
        <span>Currently Supplying</span>
        <span>
          {amountSupplied} {name?.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
export default Supply;
