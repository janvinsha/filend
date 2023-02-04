import Head from "next/head";
import { useRouter } from "next/router";
import type { FC } from "react";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  image?: string;
};

const MetaTags: FC<Props> = (props) => {
  const { description, title, image } = props;
  const router = useRouter();

  const meta = {
    title: title ?? "Filend",
    description: description ?? "Filend",
    image: image ?? `./images/brand/filend.png`,
    type: "website",
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />

      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Filend" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:image:width" content="400" />
      <meta property="twitter:image:height" content="400" />
      <meta name="twitter:site" content="Filend" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta property="twitter:image:src" content={meta.image} />
      <meta property="twitter:creator" content={"/filend"} />
    </Head>
  );
};

export default MetaTags;
