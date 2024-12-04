import { createClient } from "@/supabase/server";
import EventForm from "./_components/EventForm";
import { getUserById } from "@/queries/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create Event",
  description: "Create an Event",
};

export default async function EventPage() {
  const supabaseServer = createClient();

  const { data, error } = await supabaseServer.auth.getUser();

  if (!data?.user) {
    redirect("/login");
  }
  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-row">
      <EventForm userData={userData && userData[0]} />
    </div>
  );
}
