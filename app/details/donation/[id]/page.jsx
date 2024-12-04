import React from "react";
import DonationDetails from "./_components/DonationDetails";
import { getFoodById } from "@/queries/food";
import { getLoggedInUser, getUserById } from "@/queries/user";

export const metadata = {
  title: "Donation Details",
  description: "Donation Details",
};

export default async function DonationDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await getFoodById(id);

  const { data: userData, error: userError } = await getUserById(
    data[0]?.userid
  );

  const { data: loggedUser, error: loggedUserError } = await getLoggedInUser();

  const { data: reservedUser, error: reservedUserError } = await getUserById(
    data[0]?.reserveid
  );

  return (
    <div>
      <DonationDetails
        foodInfo={data[0]}
        foodUser={userData[0]}
        reservedUser={reservedUser && reservedUser[0]}
        loggedUser={loggedUser?.user}
      />
    </div>
  );
}
