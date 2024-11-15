import { createClient } from "@/supabase/server";

export function getAllFood() {
  const supabase = createClient();
  return supabase.from("food").select();
}

export function getFoodById(id) {
  const supabase = createClient();
  return supabase.from("food").select().eq("uuid", id);
}

export function addFood(formData) {
  const supabase = createClient();
  console.log("in addFood");
  return supabase.from("food").insert(formData);
}

//change food status to reserved
export function reserveFood(id, newStatus) {
  const supabase = createClient();
  return supabase.from("food").update({ status: newStatus }).eq("uuid", id);
}

export async function getAllFoodFromLocation(location, radius) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("find_nearby_places", {
    user_lat: location?.lat ?? 61.455761,
    user_lng: location?.lng ?? 23.8450639,
    search_radius: radius ?? 10,
  });
  // console.log(data);
  return data;
}
