"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface TabIconProps {
  href: string;
  icon: string;
  activeIcon: string;
  alt: string;
}

const TabIcon: React.FC<TabIconProps> = ({ href, icon, activeIcon, alt }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-14 h-14 flex items-center justify-center rounded-full ${
        isActive ? "bg-primary-blue" : ""
      }`}
    >
      <Image
        src={isActive ? activeIcon : icon}
        alt={alt}
        width={32}
        height={32}
      />
    </Link>
  );
};

export default TabIcon;
