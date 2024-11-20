"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Menu,
} from "lucide-react";
import LoginOut from "./LoginOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFindOpen, setIsFindOpen] = useState(false);
  return (
    <header className="sticky top-0 border-b h-14 flex justify-between items-center px-20 bg-slate-200 dark:bg-slate-800 dark:text-white z-50">
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">FoodShare</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/about">About</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row justify-between items-center cursor-pointer hover:underline">
                <button
                  // variant="link"
                  className="text-sm font-semibold md:text-sm flex items-center gap-2"
                >
                  {/* <Image
                  src={loggedUser?.avatar_url}
                  width={30}
                  height={30}
                  alt="user-image"
                  className="rounded-full"
                  prefetch="true"
                /> */}
                  Create
                </button>
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-slate-100 dark:bg-slate-900"
            >
              <DropdownMenuItem>
                <Link
                  href="/share"
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                  prefetch={false}
                  // onClick={handleLogout}
                >
                  Donation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/request"
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                  prefetch={false}
                  // onClick={handleLogout}
                >
                  Request
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row justify-between items-center cursor-pointer hover:underline">
                <button
                  // variant="link"
                  className="text-sm font-semibold md:text-sm flex items-center gap-2"
                >
                  Find
                </button>
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-slate-100 dark:bg-slate-900"
            >
              <DropdownMenuItem>
                <Link
                  href="/find/donation"
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                  prefetch={false}
                  // onClick={handleLogout}
                >
                  Donations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/find/request"
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                  prefetch={false}
                  // onClick={handleLogout}
                >
                  Requests
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

            <div>
              <div
                className="flex items-center gap-2 hover:underline cursor-pointer"
                onClick={() => setIsShareOpen(!isShareOpen)}
              >
                <div>Create</div>
                <ChevronDownIcon className="h-4 w-4" />
              </div>

              {isShareOpen && (
                <div className="flex flex-col pl-4 py-2 gap-2">
                  <Link href="/share/donation" onClick={() => setIsOpen(false)}>
                    Donation
                  </Link>
                  <Link href="/share/request" onClick={() => setIsOpen(false)}>
                    Request
                  </Link>
                </div>
              )}
            </div>

            <div>
              <div
                className="flex items-center gap-2 hover:underline cursor-pointer"
                onClick={() => setIsFindOpen(!isFindOpen)}
              >
                <div>Find</div>
                <ChevronDownIcon className="h-4 w-4" />
              </div>
              {isFindOpen && (
                <div className="flex flex-col pl-4 py-2 gap-2">
                  <Link href="/find/donation" onClick={() => setIsOpen(false)}>
                    Donation
                  </Link>
                  <Link href="/find/request" onClick={() => setIsOpen(false)}>
                    Request
                  </Link>
                </div>
              )}
            </div>
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
