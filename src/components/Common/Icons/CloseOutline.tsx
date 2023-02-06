import type { SVGProps } from "react";
import React from "react";

const CloseOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 18L18 6M6 6l12 12"
      fill="currentColor"
    />
  </svg>
);

export default CloseOutline;
