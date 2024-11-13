import { createClient } from "@/supabase/server";

const supabase = createClient();

export function getAllFood() {
  return supabase.from("food").select();
}

export function addFood(formData) {
  console.log("in addFood");
  return supabase.from("food").insert(formData);
}
