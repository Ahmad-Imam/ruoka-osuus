"use server";

import {
  addFood,
  getAllFood,
  getAllFoodFromLocation,
  reserveFood,
  submitReviewFood,
} from "@/queries/food";
import { setUserRadius } from "@/queries/user";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
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

export async function reserveFoodAction(id, newStatus) {
  const { data, error } = await reserveFood(id, newStatus);

  revalidatePath("/foodDetails/" + id);

  console.log("Reserve food");
  return data;
}

export async function getAllFoodLocationAction(location, radius) {
  const allFoodLocation = await getAllFoodFromLocation(location, radius);
  // console.log(allFoodLocation);
  return allFoodLocation;
  // return supabaseServer.from("food").select();
}

export async function submitReviewFoodAction(reviewData, foodId) {
  const newFood = await submitReviewFood(reviewData, foodId);
  console.log("Review submitted");
  revalidatePath("/foodDetails/" + foodId);
  return newFood;
}

export async function setUserRadiusAction(userId, radius) {
  const newUser = await setUserRadius(userId, radius);
  revalidatePath("/user/" + userId);

  // return data;
}
