import "@/styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { defineChain } from "viem";
export const powerTestnet = defineChain({
  id: 10_023,
  name: "PWR Chain Testnet",
  network: "POWER-TESTNET",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ethereumplus.pwrlabs.io/"],
    },
    public: {
      http: ["https://ethereumplus.pwrlabs.io/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Pwrlabs",
      url: "https://ethplusexplorer.pwrlabs.io/",
    },
  },
  contracts: {
    multicall3: {
      address: "0x609CCF7C0080495993F6f70e83cE1486b6fe3D19",
      blockCreated: 0,
    },
  },
  testnet: true,
});
const chains = [powerTestnet];

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}
    </>
  );
}
