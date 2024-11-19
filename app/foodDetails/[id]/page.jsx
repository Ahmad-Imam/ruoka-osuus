import React from "react";
import FoodDetails from "./_components/FoodDetails";
import { getFoodById } from "@/queries/food";
import { getLoggedInUser, getUserById } from "@/queries/user";

export default async function FoodDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await getFoodById(id);

  const { data: userData, error: userError } = await getUserById(
    data[0].userId
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

  const { data: reservedUser, error: reservedUserError } = await getUserById(
    data[0]?.reserveId
  );

  return (
    <div>
      <FoodDetails
        foodInfo={data[0]}
        foodUser={userData[0]}
        reservedUser={reservedUser && reservedUser[0]}
        loggedUser={loggedUser?.user}
      />
    </div>
  );
}
