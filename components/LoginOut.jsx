"use client";
import { supabaseBrowser } from "@/supabase/browser";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDownIcon } from "lucide-react";
import { logoutUser } from "@/app/actions";

export default function LoginOut() {
  const supabase = supabaseBrowser();

  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      setLoggedUser(data?.user);
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    await logoutUser();
    setLoggedUser(null);
  }

  return (
    <div className="">
      {loggedUser?.role === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row justify-between items-center cursor-pointer hover:underline">
              <button className="text-sm font-semibold md:text-lg flex items-center gap-2">
                {loggedUser?.user_metadata?.name}
              </button>
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-100 dark:bg-slate-900"
          >
            <DropdownMenuItem>
              <Link
                href={`/user/${loggedUser?.id}`}
                passHref
                className="w-full text-center hover:underline p-1 md:text-lg"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                className="w-full hover:underline p-1 md:text-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/login"
          className={
            "text-sm font-semibold transition-colors hover:text-foreground hover:underline md:text-lg"
          }
        >
          Login
        </Link>
      )}
    </div>
  );
}
