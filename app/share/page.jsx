import { createClient } from "@/supabase/server";
import ShareForm from "./_components/ShareForm";
import { getUserById } from "@/queries/user";

export default async function ShareFood() {
  const supabaseServer = createClient();

  const { data, error } = await supabaseServer.auth.getUser();
  // console.log(data?.user?.user_metadata);
  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );
  // console.log(userData);

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-row">
      <ShareForm userData={userData[0]} />
    </div>
  );
}
