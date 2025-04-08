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
import { createConfig, http, useAccount } from "wagmi";
import Check from "./svg/Check";
import { base, mainnet } from "wagmi/chains";
import { getAccount } from "wagmi/actions";
import { connect, readContract } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { oneMomentContract } from "./contract/oneMomentContracts";
import { callConfig } from "./contract/callConfig";

const SCHEMA_UID =
  "0x7889a09fb295b0a0c63a3d7903c4f00f7896cca4fa64d2c1313f8547390b7d39";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [loader, setLoader] = useState(true);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const account = useAccount({
    config: callConfig,
  });

  useEffect(() => {
    const account = getAccount(callConfig);
    if (account.status === "connected") {
      readContract(callConfig, {
        abi: oneMomentContract.oneMomentContractAbi, 
        address: oneMomentContract.oneMomentAddress,
        functionName: 'userOwnsNFT',
        args: [account.address],
      }).then((data) => {
        console.log("data: ", data);
        if (data) {
          setShowOnboarding(false);
        }
        setLoader(false);
      });
    } else {
      connect(callConfig, { connector: injected() }).then((data) => {
        console.log("data: ", data);
      }).catch((error) => {
        console.error("Error connecting to wallet:", error);
      });
    }
  }, [account]);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame, setFrameAdded]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          type="button"
          onClick={handleAddFrame}
          className="cursor-pointer bg-transparent font-semibold text-sm"
        >
          + SAVE FRAME
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-semibold animate-fade-out">
          <Check />
          <span>SAVED</span>
        </div>
      );
    }

    return null;
  }, [context, handleAddFrame, frameAdded]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleRestartOnboarding = () => {
    setShowOnboarding(true);
  };

  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[#F4EEDE] text-black font-semibold text-2xl">
        LOADING...
      </div>
    );
  }

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <div className="flex flex-col min-h-screen font-sans bg-[#F4EEDE] text-black items-center relative">
        <div className="w-screen max-w-[520px]">
          <header className="mr-2 mt-1 flex justify-between">
            <div className="justify-start pl-1">
              {account.address ? (
                <Identity
                  address={account.address}
                  schemaId={SCHEMA_UID}
                  className="!bg-inherit p-0 [&>div]:space-x-2"
                >
                  <Name className="text-inherit">
                    <Badge tooltip="Stamp Creator" className="!bg-inherit" />
                  </Name>
                </Identity>
              ) : (
                <div className="pl-2 pt-1 text-gray-500 text-sm font-semibold">
                  NOT CONNECTED
                </div>
              )}
            </div>
            <div className="pr-1 justify-end">{saveFrameButton}</div>
          </header>

          <main className="mt-4">
            <StampCreator />
          </main>

          <footer className="absolute bottom-24 flex items-center w-screen max-w-[520px] justify-between px-4">
            <button
              type="button"
              className="px-2 py-1 flex justify-start rounded-2xl font-semibold opacity-60 border border-[#071FC0] text-[#071FC0] text-xs font-schoolbell"
              onClick={handleRestartOnboarding}
            >
              SHOW INTRO
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
