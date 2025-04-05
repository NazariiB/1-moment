"use client";

import React from "react";
import Image from "next/image";
import TabIcon from "../components/TabIcon";

export default function Inbox() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F4EEDE] text-black">
      <div className="w-screen max-w-[520px] mx-auto">
        <main className="px-4 pt-6 pb-20">
          <h1 className="text-primary-blue text-2xl font-schoolbell text-center mb-6">
            Your Inbox
          </h1>

          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-16 h-16 mb-4">
              <Image src="/24/inbox.svg" alt="Inbox" width={64} height={64} />
            </div>
            <p className="text-gray-500 text-center">Your inbox is empty</p>
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-[#F4EEDE] border-t border-gray-200">
          <div className="flex justify-around items-center py-3 max-w-[520px] mx-auto">
            <TabIcon
              href="/feed"
              icon="/24/moment.svg"
              activeIcon="/24/moment-active.svg"
              alt="Moments"
            />
            <TabIcon
              href="/inbox"
              icon="/24/inbox.svg"
              activeIcon="/24/inbox-active.svg"
              alt="Inbox"
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
