"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChromeIcon as Google, VeganIcon } from "lucide-react";
import { loginUser, logoutUser } from "@/app/actions";
import { supabaseBrowser } from "@/supabase/browser";

export default function LoginButton() {
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

  return (
    <Button onClick={handleLogin} className="w-full dark:text-white ">
      <Google className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  );
}
