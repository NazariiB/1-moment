"use client";

import React from "react";
import Image from "next/image";

interface MomentCardProps {
  sender: string;
  message: string;
  signatureImage: string;
  timestamp: string;
}

const MomentCard: React.FC<MomentCardProps> = ({
  sender,
  message,
  signatureImage,
  timestamp,
}) => {
  return (
    <div className="min-w-[280px] w-full max-w-xs flex-shrink-0 border-2 border-primary-blue rounded-xl p-4 bg-[#F4EEDE]">
      <div className="text-sm text-gray-500 mb-1 font-schoolbell">
        1moment from
      </div>
      <div className="text-primary-blue text-lg font-schoolbell mb-2">
        {sender}
      </div>

      <p className="text-primary-blue mb-4 text-base font-schoolbell">
        {message}
      </p>

      <div className="flex justify-between items-end">
        <span className="text-xs text-gray-500 font-schoolbell">
          {timestamp}
        </span>

        <div className="w-24 h-12">
          <img
            src={signatureImage}
            alt="Signature"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MomentCard;
