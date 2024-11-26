import { createClient } from "@/supabase/server";

export function getAllEvent() {
  const supabase = createClient();
  return supabase.from("event").select();
}

export function getEventById(id) {
  const supabase = createClient();
  return supabase.from("event").select().eq("id", id);
}

export function addEvent(formData) {
  const supabase = createClient();
  console.log("in addFood");
  return supabase.from("event").upsert(formData).select();
}

export async function removeInterestedUserFromEvent(eventId, userId) {
  const supabase = createClient();
  //remove userid from interested array
  return supabase
    .from("event")
    .update({ interestid: supabase.sql("array_remove(interestid, ?)", userId) })
    .eq("id", eventId);
}

export async function addInterestedUserToEvent(eventId, userId) {
  const supabase = createClient();
  //add userid to interested array
  //   return supabase
  //     .from("event")
  //     .update({ interestid: supabase.sql("array_append(interestid, ?)", userId) })
  //     .eq("id", eventId);
}

export async function getAllEventFromLocation(location, radius) {
  console.log("in getAllFoodFromLocation");
  console.log(location?.lat);
  console.log(location?.lng);
  const supabase = createClient();
  const { data, error } = await supabase.rpc("find_nearby_places", {
    user_lat: location?.lat,
    user_lng: location?.lng,
    search_radius: radius ?? 10,
  });
  // console.log(data);
  return data;
}
