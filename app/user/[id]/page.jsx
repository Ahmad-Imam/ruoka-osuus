import React from "react";
import Profile from "./_components/Profile";
import {
  getLoggedInUser,
  getReviewsFromFood,
  getUserById,
} from "@/queries/user";
import {
  getDonatedFoodByUserId,
  getReservedFoodByUserId,
} from "@/queries/food";
import { getAvgReviews } from "@/lib/utils";
import { getRequestsByUserId } from "@/queries/request";
import { getAllEventByUserId } from "@/queries/event";

export const metadata = {
  title: "Profile",
  description: "Profile Page",
};

export default async function ProfilePage({ params }) {
  const { data: userData, error: userError } = await getUserById(params.id);

  const { data: donatedFoodList, error: donatedFoodError } =
    await getDonatedFoodByUserId(params.id);

  const { data: reservedFoodList, error: reservedFoodError } =
    await getReservedFoodByUserId(params.id);

  const { data: requestData, error: requestError } = await getRequestsByUserId(
    params.id
  );
  const { data: eventData, error: eventError } = await getAllEventByUserId(
    params.id
  );

  const { data, error } = await getLoggedInUser();

  const isLoggedUser = data?.user
    ? data?.user?.id.toString() === params.id.toString()
    : false;

  const { data: reviewData, error: reviewError } = await getReviewsFromFood(
    params.id
  );

  const reviews = getAvgReviews(reviewData);

  return (
    <div>
      <Profile
        userData={userData[0]}
        donatedFoodList={donatedFoodList}
        reservedFoodList={reservedFoodList}
        reviews={reviews}
        requestData={requestData}
        isLoggedUser={isLoggedUser}
        eventData={eventData}
      />
    </div>
  );
}
