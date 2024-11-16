import { createClient } from "@/supabase/server";

export function getUserById(id) {
  const supabase = createClient();
  return supabase.from("profiles").select().eq("id", id);
}
