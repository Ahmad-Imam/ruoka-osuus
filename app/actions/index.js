"use server";

import { addFood, getAllFood } from "@/queries/food";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export async function loginUser() {
  const supabaseServer = createClient();

  const { data, error } = await supabaseServer.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://example.com/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }

  const { data: userData, error: userError } =
    await supabaseServer.auth.getUser();
  console.log("newUser", userData);
  console.log(userData?.user?.user_metadata);
}

export async function logoutUser() {
  const supabaseServer = createClient();

  await supabaseServer.auth.signOut();
  // window.location.reload();
}

export async function getAllFoodAction() {
  const allFood = await getAllFood();
  // console.log(allFood);
  return allFood;
  // return supabaseServer.from("food").select();
}

export async function addFoodAction(formData) {
  const newFood = await addFood(formData);
  // console.log(allFood);
  return newFood;
  // return supabaseServer.from("food").select();
}
