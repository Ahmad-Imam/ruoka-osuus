import React from "react";
import EventDetails from "./_components/EventDetails";
import { getFoodById } from "@/queries/food";
import { getLoggedInUser, getUserById } from "@/queries/user";
import { getEventById } from "@/queries/event";

export const metadata = {
  title: "Event Details",
  description: "Event Details",
};

export default async function EventDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await getEventById(id);

  const { data: userData, error: userError } = await getUserById(
    data[0]?.userid
  );

  const { data: loggedUser, error: loggedUserError } = await getLoggedInUser();

  const { data: interestedUser, error: foodError } = await getFoodById(
    data[0]?.id
  );

  return (
    <div>
      <EventDetails
        eventInfo={data[0]}
        eventOwner={userData[0]}
        loggedUser={loggedUser?.user}
      />
    </div>
  );
}
