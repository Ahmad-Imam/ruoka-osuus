// @ts-ignore
"use client";
import { supabaseBrowser } from "@/supabase/browser";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { loginUser, logoutUser } from "@/app/actions";

export default function LoginOut() {
  const supabase = supabaseBrowser();

  const [loggedUser, setLoggedUser] = useState(null);
  // console.log(loggedUser);

  //   console.log(supabase.auth.getUser());

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      setLoggedUser(data?.user);
      //   console.log(user);
    }

    fetchUser();
  }, []);

  async function handleLogin() {
    // supabase.auth.signInWithOAuth({
    //   provider: "google",
    //   options: {
    //     redirectTo: location.origin + "/auth/callback",
    //   },
    // });

    console.log("login");
    await loginUser();
    console.log("login done");
  }

  async function handleLogout() {
    await logoutUser();
    setLoggedUser(null);
    // window.location.reload();
  }

  return (
    <div className="">
      {loggedUser?.role === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row justify-between items-center cursor-pointer hover:underline">
              <button
                // variant="link"
                className="text-sm font-semibold md:text-lg flex items-center gap-2"
              >
                {/* <Image
                  src={loggedUser?.avatar_url}
                  width={30}
                  height={30}
                  alt="user-image"
                  className="rounded-full"
                  prefetch="true"
                /> */}
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
                prefetch={false}
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                className="w-full hover:underline p-1 md:text-lg"
                prefetch={false}
                onClick={handleLogout}
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={handleLogin}
          className={
            "text-sm font-semibold transition-colors hover:text-foreground hover:underline md:text-lg"
          }
          // className={`text-sm font-medium text-muted-foreground hover:text-foreground hover:underline`}
          // prefetch={false}
        >
          Login
        </button>
      )}
    </div>
  );
}
