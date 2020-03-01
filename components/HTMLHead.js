import React from 'react';
import Head from 'next/head';

export default function HTMLHead() {
  return (
    <Head>
      <title>Get Link!</title>
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="description" content="The simplest way to get the link." />
      <link rel="apple-touch-icon" href="logo192.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
};
