import React, { useState } from "react";
import Head from "next/head";

import Header from "./Header";

export default function Layout({ siteTitle, children, ...props }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed&family=Barlow:wght@300;400;700&display=swap"
          rel="stylesheet"
        />

        <title>Cloud Guru Challenge Python-Driven ETL</title>
      </Head>
      <section className="flex flex-col min-h-screen justify-between">
        <Header />

        <div className="flex-grow mt-4 lg:px-16 px-4">{children}</div>
      </section>
    </div>
  );
}
