"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MomentCard from "../../components/MomentCard";

export default function UserProfile() {
  const { handle } = useParams();
  const [hasCreatedMoment, setHasCreatedMoment] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  // Add state to track drag behavior
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mock user data for demonstration
  const userData = {
    handle: `@${handle}`,
    subscribersAmount: "46k",
    momentsAmount: handle === "ted" ? 12 : 8,
    receivedAmount: "$24",
  };

  // Different moments based on the user
  const tedMoments = [
    {
      id: 1,
      sender: "@kolom",
      message:
        "Hey Ted! Just watched that indie film you recommended - mind = blown! 🤩 Your taste in cinema never disappoints. Coffee next week to discuss? My treat this time.",
      signatureImage: "/kolom-signature.png",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      sender: "@alice",
      message:
        "That podcast recommendation was spot on! Binged the entire first season yesterday. We need to chat about that plot twist in episode 7!",
      signatureImage: "/alice-signature.png",
      timestamp: "1 week ago",
    },
    {
      id: 3,
      sender: "@bob",
      message:
        "Thanks for the book recommendation. I couldn't put it down! The author's perspective on technology and society is fascinating.",
      signatureImage: "/bob-signature.png",
      timestamp: "2 weeks ago",
    },
  ];

  const christopherMoments: never[] = [];

  // Check if the current user has already created a moment for this profile
  useEffect(() => {
    // First check localStorage to see if user has created a moment
    if (typeof window !== "undefined") {
      const createdMoments = JSON.parse(
        localStorage.getItem("createdMoments") || "{}",
      );

      if (createdMoments[`@${handle}`]) {
        setHasCreatedMoment(true);
        return;
      }
    }

    // If not in localStorage, use demo logic
    if (handle === "christopher") {
      setHasCreatedMoment(true);
    } else if (handle === "ted") {
      setHasCreatedMoment(false);
    } else {
      // For other users, randomly decide
      setHasCreatedMoment(Math.random() > 0.5);
    }
  }, [handle]);

  // Select the appropriate moments list based on the user
  const moments = handle === "ted" ? tedMoments : christopherMoments;

  // Horizontal scroll with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  // Handle mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  // Handle mouse leave and mouse up to stop dragging
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse move for the dragging effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch event handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F4EEDE] text-black">
      <div className="w-screen max-w-[520px] mx-auto">
        <main className="px-4 pt-6 pb-20">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/feed"
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
                {userData.handle}
              </h1>
              <p className="text-gray-500 font-schoolbell">
                {userData.subscribersAmount}
              </p>
            </div>
          </div>

          {/* User stats */}
          <div className="flex mb-8 gap-4">
            <div className="flex-1 p-4 border-2 border-gray-300 rounded-xl">
              <h2 className="text-gray-500 text-sm mb-2 font-schoolbell">
                Total moments
              </h2>
              <div className="flex items-center">
                <span className="text-primary-blue mr-2">👆</span>
                <span className="text-primary-blue text-xl font-schoolbell">
                  {userData.momentsAmount}
                </span>
              </div>
            </div>
            <div className="flex-1 p-4 border-2 border-gray-300 rounded-xl">
              <h2 className="text-gray-500 text-sm mb-2 font-schoolbell">
                Total received
              </h2>
              <div className="text-primary-blue text-xl font-schoolbell">
                {userData.receivedAmount}
              </div>
            </div>
          </div>

          {/* Create moment or Already created message */}
          <div className="mb-8">
            {hasCreatedMoment ? (
              <div className="text-center py-4 text-gray-500 font-schoolbell">
                You have already created 1moment for {userData.handle}!
              </div>
            ) : (
              <Link href={`/create-moment?recipient=@${handle}`}>
                <button className="w-full py-3 bg-primary-blue text-white rounded-full font-schoolbell hover:bg-blue-700 transition-colors">
                  Create moment
                </button>
              </Link>
            )}
          </div>

          {/* Moments horizontal slider - only show section if there are moments */}
          {moments.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-schoolbell mb-4">Recent moments</h2>

              <div
                ref={sliderRef}
                className={`flex overflow-x-auto gap-4 pb-4 hide-scrollbar ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  scrollBehavior: isDragging ? "auto" : "smooth",
                  userSelect: "none", // Prevent text selection during drag
                }}
              >
                {moments.map((moment) => (
                  <MomentCard
                    key={moment.id}
                    sender={moment.sender}
                    message={moment.message}
                    signatureImage={moment.signatureImage}
                    timestamp={moment.timestamp}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Show message when no moments are available */}
          {moments.length === 0 && (
            <div className="text-center py-8 text-gray-500 font-schoolbell">
              No moments found for this user yet.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
