"use client";

import { ThemeSwitcher } from "./theme-switcher";
import { FileText } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-20 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Invoice Generator</h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
