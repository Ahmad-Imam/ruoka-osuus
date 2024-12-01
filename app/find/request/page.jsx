import RequestList from "./_components/RequestList";
import { getLoggedInUser, getUserById } from "@/queries/user";
import { getAllRequests } from "@/queries/request";

export const metadata = {
  title: "Find Request",
  description: "Find all Requests",
};

export default async function FindRequestPage() {
  const allRequest = await getAllRequests();

  const { data, error } = await getLoggedInUser();

  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );

  return (
    <RequestList
      allRequest={allRequest?.data}
      userRadius={userData && userData[0]?.radius}
    />
  );
}
