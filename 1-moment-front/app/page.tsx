"use client";

import React from "react";
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { Name, Identity, Badge } from "@coinbase/onchainkit/identity";
import { useCallback, useEffect, useMemo, useState } from "react";
import StampCreator from "./components/StampCreator";
import Onboarding from "./components/Onboarding";
import { createConfig, http, useAccount, useConnect } from "wagmi";
import Check from "./svg/Check";
import { base, mainnet } from "wagmi/chains";
import { getAccount } from "wagmi/actions";
import { connect, readContract } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { oneMomentContract } from "./contract/oneMomentContracts";
import { callConfig } from "./contract/callConfig";
import { sdk } from '@farcaster/frame-sdk'
import { farcasterFrame as frameConnector } from '@farcaster/frame-wagmi-connector'
import { WalletControl } from "./components/WalletController";

const SCHEMA_UID =
  "0x7889a09fb295b0a0c63a3d7903c4f00f7896cca4fa64d2c1313f8547390b7d39";

export default function App() {
  // const { setFrameReady, isFrameReady, context } = useMiniKit();
  // const [frameAdded, setFrameAdded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [loader, setLoader] = useState(true);
  const { connect } = useConnect()
  const { address, isConnected } = useAccount();

  const account = useAccount();

  useEffect(() => {
    const account1 = getAccount(callConfig);
    console.log("account1: ", account1);
    console.log("account: ", account);
    if (!account.isConnected) {
      connect({ connector: injected() })
    }
  }, [account]);

  useEffect(() => {
    setTimeout(() => sdk.actions.ready().then(() => {
      console.log("Frame is ready!!!!!");
      const account = getAccount(callConfig);
      console.log("111account: ", account);
      // connect({ connector: frameConnector() });
    }), 1500);
  }, []);

  // if (loader) {
  //   return (
  //     <div className="flex items-center justify-center h-screen w-screen bg-[#F4EEDE] text-black font-semibold text-2xl">
  //       LOADING...
  //     </div>
  //   );
  // }

  return (
    <>
      {showOnboarding && <Onboarding onComplete={() => {}} />}
      <WalletControl />
      asdasdasd
    </>
  );
}
