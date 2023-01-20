import React from "react";

const FullPageLoader = () => {
  return (
    <div className="grid h-screen place-items-center">
      {/* <MetaTags /> */}
      <div className="animate-bounce">
        <img
          src={`./images/brand/loader.png`}
          draggable={false}
          className="w-20 h-20 ml-6 mb-6"
          alt="hemba"
        />
      </div>
    </div>
  );
};

export default FullPageLoader;
