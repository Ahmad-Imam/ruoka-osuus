import { createClient } from "@/supabase/server";

export function getAllEvents() {
  const supabase = createClient();
  return supabase.from("event").select();
}

export function getEventById(id) {
  const supabase = createClient();
  return supabase.from("event").select().eq("id", id);
}

export function addEvent(formData) {
  const supabase = createClient();

  return supabase.from("event").upsert(formData).select();
}

export function getAllEventByUserId(userId) {
  const supabase = createClient();
  return supabase.from("event").select().eq("userid", userId);
}

export async function getAllEventFromLocation(location, radius) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("find_nearby_places_event", {
    user_lat: location?.lat,
    user_lng: location?.lng,
    search_radius: radius ?? 10,
  });

  return data;
}
