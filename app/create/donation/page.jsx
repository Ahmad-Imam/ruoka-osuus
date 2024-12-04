import { createClient } from "@/supabase/server";
import DonationForm from "./_components/DonationForm";
import { getUserById } from "@/queries/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create Donation",
  description: "Create a donation",
};

export default async function DonationFoodPage() {
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
      <DonationForm userData={userData && userData[0]} />
    </div>
  );
}
