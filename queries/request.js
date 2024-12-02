import { createClient } from "@/supabase/server";

export function addRequest(formData) {
  const supabase = createClient();

  return supabase.from("request").upsert(formData).select();
}

export function getRequestById(id) {
  const supabase = createClient();
  return supabase.from("request").select().eq("id", id);
}

export function getRequestsByUserId(userId) {
  const supabase = createClient();
  return supabase
    .from("request")
    .select()
    .eq("userid", userId)
    .order("created_at", { ascending: false });
}

export async function getAllRequests() {
  const supabase = createClient();
  return supabase.from("request").select();
}

export async function getAllRequestFromLocation(location, radius) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("find_nearby_places_request", {
    user_lat: location?.lat,
    user_lng: location?.lng,
    search_radius: radius ?? 10,
  });

  return data;
}
