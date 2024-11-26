import React from "react";
import EventDetails from "./_components/EventDetails";
import { getFoodById } from "@/queries/food";
import { getLoggedInUser, getUserById } from "@/queries/user";
import { getEventById } from "@/queries/event";

export default async function EventDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await getEventById(id);

  const { data: userData, error: userError } = await getUserById(
    data[0]?.userid
  );

  // console.log(userData);
  // [
  //   {
  //     id: "57b0c74d-2455-4a95-93b6-6a2d5800b6ed",
  //     full_name: "Ahmad Imam",
  //     email: "ahmadimam71@gmail.com",
  //     avatar_url:
  //       "https://lh3.googleusercontent.com/a/ACg8ocIFv5RBJUmyAMCOZjf5E7neW7X0F3byrzkNMkMMibnfQFeWSE0nJg=s96-c",
  //     radius: 12,
  //     access_review: 0,
  //     comm_review: 0,
  //     quality_review: 0,
  //   },
  // ];

  const { data: loggedUser, error: loggedUserError } = await getLoggedInUser();
  // console.log(loggedUser);

  const { data: interestedUser, error: foodError } = await getFoodById(
    data[0]?.id
  );

  //check if the logged user is the interested user in the interesterid array
  const isLoggedUserInterestedUser = data[0]?.interestid?.includes(
    loggedUser?.user?.id
  );
  console.log("interestedUser");
  console.log(isLoggedUserInterestedUser);

  // const { data: reservedUser, error: reservedUserError } = await getUserById(
  //   data[0]?.reserveid
  // );

  return (
    <div>
      <EventDetails
        eventInfo={data[0]}
        eventOwner={userData[0]}
        // reservedUser={reservedUser && reservedUser[0]}
        loggedUser={loggedUser?.user}
        isLoggedUserInterestedUser={isLoggedUserInterestedUser}
      />
    </div>
  );
}
