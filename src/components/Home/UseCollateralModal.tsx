import Modal from "@components/UIElements/Modal";
import type { FC } from "react";
import React from "react";
import { Button } from "../UIElements/Button";

type Props = {
  show: boolean;
  setShowCM: React.Dispatch<boolean>;
};

const UseCollateralModal = ({ show, setShowCM, onClick, loading, name }) => {
  return (
    <Modal
      onClose={() => setShowCM(false)}
      show={show}
      panelClassName="max-w-md"
      autoClose={false}
    >
      <div className="mt-2 flex flex-col  gap-4">
        <span>
          Each asset used as collateral increases your borrowing limit. Be
          careful, this can subject the asset to being seized in liquidation.
        </span>
        <Button onClick={onClick} loading={loading}>
          Use {name} as Collateral
        </Button>
      </div>
    </Modal>
  );
};

export default UseCollateralModal;
