import { createClient } from "@/supabase/server";

const supabase = createClient();

export function getAllFood() {
  return supabase.from("food").select();
}

export function addFood(food) {
  console.log("in addFood");
  return supabase.from("food").insert(food);
}
