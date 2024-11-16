import React from "react";
import Profile from "./_components/Profile";
import { getUserById } from "@/queries/user";
import { getFoodByUserId } from "@/queries/food";

export default async function ProfilePage({ params }) {
  console.log(params);

  const { data: donatedFoodList, error } = await getFoodByUserId(params.id);
  console.log(donatedFoodList);

  return (
    <div>
      <Profile donatedFoodList={donatedFoodList} />
    </div>
  );
}
