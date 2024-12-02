import { createClient } from "@/supabase/server";

export function getAllFood() {
  const supabase = createClient();
  return supabase
    .from("food")
    .select()
    .order("created_at", { ascending: false });
}

export function getFoodById(id) {
  const supabase = createClient();
  return supabase.from("food").select().eq("id", id);
}

export function addFood(formData) {
  const supabase = createClient();

  return supabase.from("food").upsert(formData).select();
}

export function reserveFood(id, newStatus, reserveId) {
  const supabase = createClient();

  if (newStatus === "reserved") {
    return supabase
      .from("food")
      .update({ fstatus: newStatus, reserveid: reserveId })
      .eq("id", id);
  } else if (newStatus === "available") {
    return supabase
      .from("food")
      .update({ fstatus: newStatus, reserveid: null })
      .eq("id", id);
  } else if (newStatus === "completed") {
    return supabase.from("food").update({ fstatus: newStatus }).eq("id", id);
  }
}

export async function getAllFoodFromLocation(location, radius) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("find_nearby_places", {
    user_lat: location?.lat,
    user_lng: location?.lng,
    search_radius: radius ?? 10,
  });

  return data;
}

export async function getDonatedFoodByUserId(userId) {
  const supabase = createClient();

  return supabase
    .from("food")
    .select()
    .eq("userid", userId)
    .order("created_at", { ascending: false });
}

export async function getReservedFoodByUserId(userId) {
  const supabase = createClient();

  return supabase
    .from("food")
    .select()
    .eq("reserveid", userId)
    .order("created_at", { ascending: false });
}

export async function submitReviewFood(reviewData, foodId) {
  const supabase = createClient();

  const { access_review, comm_review, quality_review } = reviewData;

  const { data, error } = await supabase
    .from("food")
    .update({
      access_review: access_review,
      comm_review: comm_review,
      quality_review: quality_review,
    })
    .eq("id", foodId);

  return data;
}
