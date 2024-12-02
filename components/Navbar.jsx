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
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFindOpen, setIsFindOpen] = useState(false);

  return (
    <header className="sticky top-0 border-b h-14 flex justify-between items-center px-20 bg-slate-200 dark:bg-slate-800 dark:text-white z-50">
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">Ruoka Osuus</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-semibold">
          <Link href="/about" className="hover:underline cursor-pointer">
            About
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row justify-between items-center cursor-pointer hover:underline">
                <button className="text-sm font-semibold md:text-sm flex items-center gap-2">
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
                  href="/create/donation"
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                  prefetch={false}
                >
                  Donation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/create/request"
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                  prefetch={false}
                >
                  Request
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/create/event"
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                >
                  Events
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row justify-between items-center cursor-pointer hover:underline">
                <button className="text-sm font-semibold md:text-sm flex items-center gap-2">
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
                  href={`/find/donation`}
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                >
                  Donations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/find/request`}
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                  prefetch={false}
                >
                  Requests
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/find/event`}
                  className=" hover:underline p-1 md:text-sm w-full text-center"
                  prefetch={false}
                >
                  Events
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hover:underline cursor-pointer"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="hover:underline cursor-pointer"
            >
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
                  <Link
                    href="/create/donation"
                    onClick={() => setIsOpen(false)}
                  >
                    Donation
                  </Link>
                  <Link href="/create/request" onClick={() => setIsOpen(false)}>
                    Request
                  </Link>
                  <Link href="/create/event" onClick={() => setIsOpen(false)}>
                    Event
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
                  <Link href="/find/event" onClick={() => setIsOpen(false)}>
                    Event
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
