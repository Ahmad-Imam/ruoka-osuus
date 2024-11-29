import RequestList from "./_components/RequestList";
import { getLoggedInUser, getUserById } from "@/queries/user";
import { getAllRequests } from "@/queries/request";

// Mock data for available food items

export default async function FindRequestPage() {
  const allRequest = await getAllRequests();

  // const allFoodLocation = await getAllFoodFromLocation();
  // console.log(allFoodLocation);

  const { data, error } = await getLoggedInUser();

  // console.log(data?.user?.id);

  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );
  // console.log(userData[0]?.radius);

  return (
    <RequestList
      allRequest={allRequest?.data}
      userRadius={userData && userData[0]?.radius}
    />
  );
}
