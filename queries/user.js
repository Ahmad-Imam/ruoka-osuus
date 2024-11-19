import { createClient } from "@/supabase/server";

export function getLoggedInUser() {
  const supabase = createClient();
  return supabase.auth.getUser();
}

export function getUserById(id) {
  const supabase = createClient();
  return supabase.from("profiles").select().eq("id", id);
}

export async function getReviewsFromFood(userId) {
  const supabase = createClient();

  //from food table get all food items by user id where quality_review is not 0

  return supabase
    .from("food")
    .select()
    .eq("userId", userId)
    .neq("quality_review", 0);
}

export async function setUserRadius(userId, radius) {
  const supabase = createClient();

  return supabase.from("profiles").update({ radius: radius }).eq("id", userId);
}
