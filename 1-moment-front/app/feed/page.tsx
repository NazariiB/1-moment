"use client";

import React, { useCallback, useState } from "react";
import UserItem from "../components/UserItem";
import TabIcon from "../components/TabIcon";
import * as debounce from "debounce";
import { getUserByName, User } from "@/app/externalApi/getUsers";
import UserItemSearch from "@/app/components/UserItemSearch";

export default function Feed() {
  // Mock data for demonstration
  const users = [
    {
      handle: "@ted",
      subscribersAmount: "360k",
      momentsAmount: 12,
      receivedAmount: "$240",
    },
    {
      handle: "@christopher",
      subscribersAmount: "360k",
      momentsAmount: 8,
      receivedAmount: "$240",
    },
    {
      handle: "@Aloha",
      subscribersAmount: "22k",
      momentsAmount: 7,
      receivedAmount: "$140",
    },
    {
      handle: "@ted",
      subscribersAmount: "360k",
      momentsAmount: 6,
      receivedAmount: "$240",
    },
    {
      handle: "@ted",
      subscribersAmount: "360k",
      momentsAmount: 12,
      receivedAmount: "$240",
    },
  ];

  const [searchResults, setSearchResults] = useState<User[]>([]);

  // Create the debounced function ONCE (using useCallback to maintain reference)
  const debouncedSearch = useCallback(
    debounce.default(async (searchTerm: string) => {
      if (searchTerm.trim()) {
        const users = await getUserByName(searchTerm);
        setSearchResults(users);
      } else {
        setSearchResults([]);
      }
    }, 1000),
    [], // Empty dependency array means this is created only once
  );

  // In your onChange handler, just call the pre-created debounced function
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F4EEDE] text-black">
      <div className="w-screen max-w-[520px] mx-auto">
        <main className="px-4 pt-6 pb-20">
          <h1 className="text-primary-blue text-2xl font-schoolbell text-center mb-6">
            Search for the frens
          </h1>

          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Z"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m19 19-4-4"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              onChange={onChangeSearch}
              type="text"
              placeholder="Farcaster name, ens or adress"
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-primary-blue bg-transparent text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            {searchResults.map((user, index) => (
              <UserItemSearch
                key={index}
                handle={user.username}
                subscribersAmount={user.follower_count.toString()}
                img={user.pfp_url}
              />
            ))}
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-2 px-2">
            <span>Name</span>
            <div className="flex gap-6">
              <span>moments amount</span>
              <span>received</span>
            </div>
          </div>

          {users.map((user, index) => (
            <UserItem
              key={index}
              handle={user.handle}
              subscribersAmount={user.subscribersAmount}
              momentsAmount={user.momentsAmount}
              receivedAmount={user.receivedAmount}
            />
          ))}
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
