import EventList from "./_components/EventList";
import { getLoggedInUser, getUserById } from "@/queries/user";
import { getAllEvents } from "@/queries/event";

export const metadata = {
  title: "Find Events",
  description: "Find all Events",
};

export default async function FindRequestPage() {
  const allEvents = await getAllEvents();

  const { data, error } = await getLoggedInUser();

  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );

  return (
    <EventList
      allEvents={allEvents?.data}
      userRadius={userData && userData[0]?.radius}
    />
  );
}
