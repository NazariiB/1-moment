"use client";

import React, { useRef } from "react";

interface EditableMomentCardProps {
  senderHandle: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  maxChars: number;
  signatureImage?: string;
}

const EditableMomentCard: React.FC<EditableMomentCardProps> = ({
  senderHandle,
  value,
  onChange,
  onFocus,
  onBlur,
  isFocused,
  maxChars,
  signatureImage = "/kolom-signature.png",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const charsLeft = maxChars - value.length;

  return (
    <div
      className={`w-full border-2 rounded-xl p-4 ${
        isFocused ? "border-primary-blue" : "border-[#D5C4A1]"
      } bg-[#F4EEDE] transition-all duration-200`}
      onClick={() => textareaRef.current?.focus()}
    >
      <div className="text-sm text-gray-500 mb-1 font-schoolbell">
        1moment from
      </div>
      <div className="text-primary-blue text-lg font-schoolbell mb-2">
        {senderHandle}
      </div>

      <textarea
        ref={textareaRef}
        className="w-full bg-transparent border-none resize-none text-primary-blue mb-4 text-base font-schoolbell focus:outline-none min-h-[100px]"
        placeholder="Hey! Write your moment here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxChars}
      />

      <div className="flex justify-between items-end">
        <span className="text-xs text-gray-500 font-schoolbell">
          {charsLeft}/{maxChars} of characters used
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

export default EditableMomentCard;
