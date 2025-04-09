"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface SuccessScreenProps {
  recipientHandle: string;
  price: string;
  onCreateAnother: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  recipientHandle,
  price,
}) => {
  useEffect(() => {
    // if (typeof document === "undefined" || !document) return;
    // Simple animation function to create confetti effect
    // const createConfetti = () => {
    //   const confettiContainer = document.getElementById("confetti-container");
    //   if (!confettiContainer) return;

    //   // Create 50 confetti elements
    //   for (let i = 0; i < 50; i++) {
    //     const confetti = document.createElement("div");
    //     confetti.classList.add("confetti");

    //     // Random position, size, color and animation delay
    //     const left = Math.random() * 100;
    //     const size = Math.random() * 10 + 5;
    //     const backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
    //     const delay = Math.random() * 3;

    //     Object.assign(confetti.style, {
    //       left: `${left}%`,
    //       width: `${size}px`,
    //       height: `${size}px`,
    //       backgroundColor,
    //       animationDelay: `${delay}s`,
    //     });

    //     confettiContainer.appendChild(confetti);
    //   }

    //   // Remove confetti after animation
    //   setTimeout(() => {
    //     const confettiElements = document.querySelectorAll(".confetti");
    //     confettiElements.forEach((el) => el.remove());
    //   }, 5000);
    // };

    // createConfetti();
  }, []);

  // Handle share functionality
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "1moment Shared!",
          text: `I just sent a 1moment to ${recipientHandle} for $${price}!`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      alert(
        `Share this 1moment: I just sent a 1moment to ${recipientHandle} for $${price}!`,
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Confetti container */}
      <div
        id="confetti-container"
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 5 }}
      />

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .confetti {
          position: absolute;
          top: -10px;
          border-radius: 50%;
          animation: confettiFall 5s ease-out forwards;
        }
      `}</style>

      {/* Success icon */}
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 13L9 17L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Success message */}
      <h2 className="text-2xl font-schoolbell text-primary-blue text-center mb-3">
        1moment sent!
      </h2>
      <p className="text-gray-600 font-schoolbell text-center mb-6">
        You successfully sent 1moment to {recipientHandle} for ${price}
      </p>

      {/* Emoji illustrations */}
      <div className="relative w-full h-16 mb-8">
        <div className="absolute -top-4 left-1/4 transform -translate-x-1/2">
          <span className="text-4xl">🎉</span>
        </div>
        <div className="absolute -top-2 right-1/4 transform translate-x-1/2">
          <span className="text-4xl">✨</span>
        </div>
        <div className="absolute top-8 left-1/3 transform -translate-x-1/2">
          <span className="text-3xl">🎊</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col w-full gap-4">
        <button
          onClick={handleShare}
          className="w-full py-3 bg-primary-blue text-white rounded-full font-schoolbell hover:bg-blue-700 transition-colors"
        >
          Share
        </button>

        <Link
          href="/feed"
          className="w-full text-center py-3 border-2 border-primary-blue text-primary-blue rounded-full font-schoolbell hover:bg-blue-50 transition-colors"
        >
          Go to feed
        </Link>
      </div>
    </div>
  );
};

export default SuccessScreen;
