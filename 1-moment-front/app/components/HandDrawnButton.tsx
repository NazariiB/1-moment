"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  svgWidth?: string;
  svgHeight?: string;
  variant?: "ghost" | "primary";
  size?: "md" | "lg";
  useMdPath?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  children,
  svgWidth = "100%",
  svgHeight = "100%",
  variant = "ghost",
  size = "lg",
  useMdPath = false,
}) => {
  // Unified transition for all animations
  const transition = {
    // type: "tween",
    ease: "easeOut",
    duration: 0.2,
  };

  const getLgPath = () => (
    <motion.path
      d="M4.89665 6.57848C7.28517 1.88018 24.7264 3.25549 28.2765 3.38481C39.8931 3.38481 52.6766 2.05144 64.4683 1.44505C80.5478 0.618147 96.3343 1.44499 112.444 1.44499C131.125 1.44499 150.122 0.443789 168.772 1.44495C184.969 2.31443 201.155 2.71801 217.372 3.29018C237.103 3.98633 256.919 5.51392 276.661 5.51392C289.746 5.51392 302.976 5.30381 316.033 6.03437C322.067 6.37201 328.488 7.30752 334.515 6.55482C338.55 6.05084 343.243 6.55482 347.327 6.55482C350.448 6.55482 353.247 9.0773 354.323 15.1939C356.322 26.5533 356.371 29.9497 355.323 40.534C354.662 47.2137 355.459 51.9083 350.48 57.2277C348.871 58.9472 345.155 58.5772 342.931 59.1676C334.782 61.3301 325.858 60.0585 317.494 60.8709C312.912 61.316 308.352 62.254 303.775 62.5742C297.685 63.0001 291.633 63.0001 285.528 63H285.32C278.499 63 271.639 62.4624 264.835 62.0537C258.092 61.6487 251.324 62.0481 244.594 61.6279C228.27 60.6085 211.933 60.8709 195.562 60.8709C181.388 60.8709 167.237 61.804 153.077 61.7225C135.483 61.6213 117.921 59.5934 100.337 59.5934C87.186 59.5934 74.1753 57.9893 61.0192 57.8901C52.3307 57.8246 43.5245 58.2997 34.8521 57.8665C28.7195 57.5601 21.4553 58.3791 15.5042 56.9439C13.1534 56.3769 9.66288 56.9877 7.57559 55.9739C4.66664 54.5611 1.48708 51.0562 1.48708 47.9069C1.48708 41.9255 1 36.0028 1 29.9987C1 25.9118 1.82627 20.9995 2.84008 17.0111C3.72638 13.5244 3.18822 9.93901 4.89665 6.57848Z"
      stroke="#071FC0"
      strokeWidth="2"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      fill={variant === "primary" ? "#071FC0" : "none"}
    />
  );

  const getMdPath = () => (
    <motion.path
      d="M105.303 39.534C105.111 46.2136 104.428 48.1804 102.983 53.4998C100.568 62.395 85.0046 58.9998 73.4434 58.9998C60.4629 58.9998 47.5133 57.9998 34.5557 57.9998C28.8783 57.9998 7.60671 60.3294 4.40737 54.9739C0.353513 48.1878 1.99994 38.9542 1.99994 31.5001C1.99994 23.8637 1.08256 13.5002 4.40743 6.99996C8.49964 -0.999817 25 1.99987 34.0301 1.99984C49.9106 1.99984 56.6411 2.99977 72.4996 2.99977C79.4024 2.99977 96.6589 1.52349 101.5 5.57842C105.516 10.5235 104.991 12.3832 105.303 18.4998C105.883 29.8591 105.607 28.9496 105.303 39.534Z"
      stroke="#071FC0"
      strokeWidth="1.8"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      fill={variant === "primary" ? "#071FC0" : "none"}
    />
  );

  const sizeClasses =
    size === "md" ? "px-4 py-1.5 text-sm" : "px-6 h-[55px] text-2xl";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center transition-all 
        disabled:opacity-60 disabled:cursor-not-allowed ${sizeClasses} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      // transition={transition}
    >
      <div className="absolute inset-0 w-full h-full">
        <svg
          style={{ width: svgWidth, height: svgHeight }}
          viewBox={size === "md" || useMdPath ? "0 0 107 61" : "0 0 357 64"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {size === "md" || useMdPath ? getMdPath() : getLgPath()}
        </svg>
      </div>
      <span
        className={`relative z-10  ${variant === "primary" ? "text-secondary-beige" : "text-primary-blue"}`}
      >
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
