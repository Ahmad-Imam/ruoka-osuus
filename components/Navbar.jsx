"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import LoginOut from "./LoginOut";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 border-b h-14 flex justify-between items-center px-20 bg-slate-200 dark:bg-slate-800 dark:text-white">
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">FoodShare</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/about">About</Link>
          <Link href="/share">Share Food</Link>
          <Link href="/find">Find Food</Link>
        </nav>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="flex flex-col space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/share" onClick={() => setIsOpen(false)}>
              Share Food
            </Link>
            <Link href="/find" onClick={() => setIsOpen(false)}>
              Find Food
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex flex-row items-center justify-end gap-4">
        <LoginOut />
        <ModeToggle />
      </div>
    </header>
  );
}
