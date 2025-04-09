"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface WalletButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const WalletButton: React.FC<WalletButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center w-fit gap-2 px-3 py-2
        transition-opacity disabled:opacity-60 disabled:cursor-not-allowed
        ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background Stroke */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 143 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M18.1965 1.77528C14.8443 2.08059 11.9808 2.0831 8.689 2.74438C7.13177 2.74438 6.00532 3.06018 4.59008 3.51967C3.0544 4.01825 2.74071 5.58692 2.14093 6.76989C1.03531 8.95058 1.31731 11.6965 1.0014 14.0158C1.00306 18.0588 0.929965 21.786 1.64785 25.8764C2.22027 29.138 1.88266 33.7379 3.24645 36.8121C3.99993 38.5105 4.5325 38.8085 6.14631 39.5703C8.21855 40.5484 12.7507 40.4241 15.016 40.4499C19.4012 40.4999 23.7614 40.9867 28.1631 40.9867C34.3708 40.9867 41.6356 41.1025 47.814 40.6512C53.174 40.2597 58.1646 40.4499 63.5519 40.4499C73.4221 40.4499 81.5399 41.0133 91.6709 40.3456C94.1204 40.1841 100.274 40.3456 106.569 40.4499C113.482 40.5645 117.218 40.9388 127.553 40.6512C130.364 40.573 135.479 40.7106 138.045 39.6724C143.013 37.6624 141.555 33.1459 141.555 28.8654C141.555 26.3555 141.697 23.8756 141.84 21.3735L141.853 21.1424C142.067 17.3872 142.125 13.2544 141.479 9.51319C140.659 4.77285 139.874 3.4153 133.851 3.4153C129.356 3.4153 124.826 3.55254 120.346 3.21403C117.4 2.99135 114.455 2.90774 111.502 2.64002C103.648 1.92776 95.4947 1.68661 87.623 2.08092C78.4867 2.53857 69.2201 2.34183 60.0701 2.34183C50.9858 2.34183 42.0016 1 32.9169 1C27.9685 1 23.1106 1.32772 18.1965 1.77528Z"
            stroke="#979380"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Button Content */}
      <div className="relative flex items-center w-full gap-2">
        <Image
          src="/24/wallet.svg"
          width={24}
          height={24}
          alt="Wallet"
          aria-hidden={label ? true : false}
        />
        <span className="text-lg font-schoolbell text-secondary-gray hover:text-primary-blue transition-colors">
          {label}
        </span>
      </div>
    </motion.button>
  );
};

export default WalletButton;
