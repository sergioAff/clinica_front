"use client";

import { DesktopNavLinks } from "@/ui/Components/DesktopNavLinks";
import { useState } from "react";
import { MobileMenuButton } from "@/ui/Components/MobileMenuButton";
import { MobileDrawer } from "@/ui/Components/MobileDrawer";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full">
      <div className="hidden sm:flex flex-col justify-center items-center w-full">
        <DesktopNavLinks />
      </div>
      <div className="sm:hidden relative flex flex-row justify-end">
        <MobileMenuButton toggleMenu={toggleMenu} isOpen={isOpen} />
        <MobileDrawer isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
};
