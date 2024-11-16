import React from "react";
import FoodDetails from "./_components/FoodDetails";
import { getFoodById } from "@/queries/food";
import { getUserById } from "@/queries/user";

export default async function FoodDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await getFoodById(id);

  const { data: userData, error: userError } = await getUserById(
    data[0].userId
  );

  // console.log(userData);
  return (
    <div>
      <FoodDetails foodInfo={data[0]} foodUser={userData[0]} />
    </div>
  );
}
