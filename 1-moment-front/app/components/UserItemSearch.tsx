"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface UserItemProps {
  handle: string;
  subscribersAmount: string;
  img: string
}

const UserItemSearch: React.FC<UserItemProps> = ({
  handle,
  subscribersAmount,
    img
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the user profile page with the handle as a parameter
    router.push(`/profile/${handle.replace("@", "")}`);
  };
  return (
      <div
          className="flex items-center justify-between p-4 border rounded-xl border-gray-300 mb-3 cursor-pointer hover:border-primary-blue hover:shadow-sm transition-all"
          onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-blue flex items-center justify-center">
            {/* User avatar placeholder */}
          <img  src={img} alt={'img'} width={24} height={24}/>
        </div>
        <div>
          <h3 className="text-primary-blue font-schoolbell text-lg">
            {handle}
          </h3>
          <p className="text-gray-500 text-sm">{subscribersAmount}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <span className="text-primary-blue mr-1">👆</span>
        </div>
      </div>
    </div>
  );
};

export default UserItemSearch;
