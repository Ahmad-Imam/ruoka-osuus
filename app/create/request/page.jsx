import { createClient } from "@/supabase/server";
import RequestForm from "./_components/RequestForm";
import { getUserById } from "@/queries/user";
import { redirect } from "next/navigation";

export default async function RequestFoodPage() {
  const supabaseServer = createClient();

  const { data, error } = await supabaseServer.auth.getUser();
  if (!data?.user) {
    redirect("/login");
  }
  // console.log(data?.user?.user_metadata);
  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );
  // console.log(userData);

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-row">
      <RequestForm userData={userData && userData[0]} />
    </div>
  );
}
