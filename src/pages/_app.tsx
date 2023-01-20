import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "tippy.js/dist/tippy.css";

import FullPageLoader from "@components/Common/FullPageLoader";
import usePersistStore from "@lib/store/persist";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { lazy, Suspense, useEffect } from "react";

const Providers = lazy(() => import("../components/Common/Providers"));
const Layout = lazy(() => import("../components/Common/Layout"));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </Suspense>
  );
};

export default App;
