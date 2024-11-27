import EventList from "./_components/EventList";
import { getLoggedInUser, getUserById } from "@/queries/user";
import { getAllRequests } from "@/queries/request";
import { getAllEvents } from "@/queries/event";

// Mock data for available food items

export default async function FindRequestPage() {
  const allEvents = await getAllEvents();

  // const allFoodLocation = await getAllFoodFromLocation();
  // console.log(allFoodLocation);

  const { data, error } = await getLoggedInUser();

  // console.log(data?.user?.id);

  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );
  // console.log(userData[0]?.radius);

  return (
    <EventList
      allEvents={allEvents?.data}
      userRadius={userData && userData[0]?.radius}
    />
  );
}
