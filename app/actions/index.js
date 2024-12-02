"use server";

import { addEvent, getAllEventFromLocation } from "@/queries/event";
import {
  addFood,
  getAllFood,
  getAllFoodFromLocation,
  reserveFood,
  submitReviewFood,
} from "@/queries/food";
import { addRequest, getAllRequestFromLocation } from "@/queries/request";
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
    redirect(data.url);
  }

  const { data: userData, error: userError } =
    await supabaseServer.auth.getUser();
}

export async function logoutUser() {
  const supabaseServer = createClient();

  await supabaseServer.auth.signOut();
}

export async function getAllFoodAction() {
  const allFood = await getAllFood();
  return allFood;
}

export async function addFoodAction(formData) {
  const newFood = await addFood(formData);
  revalidatePath("/find/food");
  return newFood;
}

export async function reserveFoodAction(id, newStatus, reserveId) {
  const { data, error } = await reserveFood(id, newStatus, reserveId);
  revalidatePath("/details/donation/" + id);
  return data;
}

export async function getAllFoodLocationAction(location, radius) {
  const allFoodLocation = await getAllFoodFromLocation(location, radius);
  return allFoodLocation;
}

export async function submitReviewFoodAction(reviewData, foodId) {
  const newFood = await submitReviewFood(reviewData, foodId);
  revalidatePath("/details/donation/" + foodId);
  return newFood;
}

export async function setUserRadiusAction(userId, radius) {
  const newUser = await setUserRadius(userId, radius);
  revalidatePath("/user/" + userId);
}

export async function addRequestAction(formData) {
  const newReq = await addRequest(formData);
  revalidatePath("/find/request");
  return newReq;
}

export async function getAllRequestLocationAction(location, radius) {
  const allFoodLocation = await getAllRequestFromLocation(location, radius);
  return allFoodLocation;
}

export async function addEventAction(formData) {
  const newFood = await addEvent(formData);
  revalidatePath("/find/event");
  return newFood;
}

export async function getAllEventLocationAction(location, radius) {
  const allFoodLocation = await getAllEventFromLocation(location, radius);
  return allFoodLocation;
}
