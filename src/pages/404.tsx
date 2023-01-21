import { Button } from "@components/UIElements/Button";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { FILEND_APP_NAME } from "@utils/index";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <div className="flex flex-col items-center justify-start h-full mt-10 md:mt-20">
        <img
          src={`./images/brand/filend.svg`}
          alt={FILEND_APP_NAME}
          draggable={false}
          height={50}
          width={50}
        />
        <div className="py-10 text-center">
          <h1 className="mb-4 text-3xl font-bold">404</h1>
          <div className="mb-6">This page could not be found.</div>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
