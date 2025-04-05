"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import EditableMomentCard from "../components/EditableMomentCard";
import SuccessScreen from "../components/SuccessScreen";

export default function CreateMoment() {
 // const searchParams = useSearchParams();
  const router = useRouter();
  const recipientHandle ="@christopher";

  // State for the moment content
  const [momentText, setMomentText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [customPrice, setCustomPrice] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const defaultPrice = "2.22";

  // Calculate the price to display on the button
  const displayPrice = customPrice.trim() ? customPrice : defaultPrice;

  // Determine if the button should be active
  const isButtonActive = momentText.trim().length > 0;

  // Check if user already created moment for this recipient
  useEffect(() => {
    // Check if we're in a browser environment (for localStorage)
    if (typeof window !== "undefined") {
      const createdMoments = JSON.parse(
        localStorage.getItem("createdMoments") || "{}",
      );

      // If already created and trying to create again, redirect back to profile
      if (createdMoments[recipientHandle]) {
        router.push(`/profile/${recipientHandle.replace("@", "")}`);
      }
    }
  }, [recipientHandle, router]);

  // Handle moment creation
  const handleCreateMoment = () => {
    if (isButtonActive) {
      // Here you would handle the actual submission to backend

      // Mark this recipient as having received a moment from the user
      if (typeof window !== "undefined") {
        const createdMoments = JSON.parse(
          localStorage.getItem("createdMoments") || "{}",
        );
        createdMoments[recipientHandle] = true;
        localStorage.setItem("createdMoments", JSON.stringify(createdMoments));
      }

      // Show success screen
      setIsSuccess(true);
    }
  };

  // Navigate back to feed after share or other actions
  const handleSuccessAction = () => {
    router.push("/feed");
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F4EEDE] text-black">
      <div className="w-screen max-w-[520px] mx-auto">
        <main className="px-4 pt-6 pb-20">
          {/* Show success screen or moment creation form */}
          {isSuccess ? (
            <SuccessScreen
              recipientHandle={recipientHandle}
              price={displayPrice}
              onCreateAnother={handleSuccessAction}
            />
          ) : (
            <>
              {/* Header with back button */}
              <div className="mb-6">
                <Link
                  href={`/profile/${recipientHandle.replace("@", "")}`}
                  className="text-primary-blue flex items-center font-schoolbell"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 12H5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 19L5 12L12 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-2">Back</span>
                </Link>
              </div>

              {/* User profile header */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary-blue flex items-center justify-center mr-4">
                  {/* User avatar placeholder */}
                </div>
                <div>
                  <h1 className="text-primary-blue text-2xl font-schoolbell">
                    {recipientHandle}
                  </h1>
                  <p className="text-gray-500 font-schoolbell">46k</p>
                </div>
              </div>

              {/* Moment card input */}
              <div className="mb-6">
                <EditableMomentCard
                  senderHandle="@kolom"
                  value={momentText}
                  onChange={setMomentText}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  isFocused={isFocused}
                  maxChars={222}
                />
              </div>

              {/* Price selection */}
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2 font-schoolbell">
                  1moment price
                </p>
                <div className="flex gap-4">
                  <button
                    className="px-6 py-3 bg-primary-blue text-white rounded-full font-schoolbell"
                    onClick={() => setCustomPrice("")}
                  >
                    ${defaultPrice}
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full h-full px-4 py-3 border-2 border-gray-300 rounded-full font-schoolbell bg-transparent focus:outline-none focus:border-primary-blue"
                      placeholder="Custom price"
                      value={customPrice}
                      onChange={(e) => {
                        // Only allow numeric values with up to 2 decimal places
                        const value = e.target.value;
                        if (/^(\d+)?(\.\d{0,2})?$/.test(value)) {
                          setCustomPrice(value);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Confirm button */}
              <button
                className={`w-full py-3 ${
                  isButtonActive
                    ? "bg-primary-blue hover:bg-blue-700"
                    : "bg-blue-300"
                } text-white rounded-full font-schoolbell transition-colors`}
                disabled={!isButtonActive}
                onClick={handleCreateMoment}
              >
                Confirm for ${displayPrice}
              </button>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
