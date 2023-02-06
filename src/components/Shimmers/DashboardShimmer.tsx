import React, { useMemo } from "react";
import { useAccount } from "wagmi";

const DashboardShimmer = () => {
  const cards = useMemo(() => Array(15).fill(1), []);
  const { address } = useAccount();
  return (
    <>
      <div className="flex animate-pulse flex-col container mx-auto max-w-7xl gap-4">
        {!address ? (
          <div className="ultrawide:h-[17vh] h-20 bg-gray-300 dark:bg-gray-700 md:h-28 rounded-xl" />
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-28 bg-gray-300 dark:bg-gray-700 md:col-span-1 rounded-xl" />
            <div className="h-28 bg-gray-300 dark:bg-gray-700 md:col-span-1 rounded-xl" />
            <div className="h-28 bg-gray-300 dark:bg-gray-700 md:col-span-1 rounded-xl" />
          </div>
        )}

        <div className="flex flex-col w-full rounded-xl border-gray-300 gap-2">
          {cards.map((i, idx) => (
            <div
              key={`${i}_${idx}`}
              className="h-10 bg-gray-300 dark:bg-gray-700  rounded-xl"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardShimmer;
