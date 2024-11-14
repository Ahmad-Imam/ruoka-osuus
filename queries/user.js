import { createClient } from "@/supabase/server";

const supabase = createClient();

export function getUser(id) {
  return supabase.from("profiles").select().eq("id", id);
}
