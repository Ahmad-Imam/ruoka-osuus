import React from "react";
import Profile from "./_components/Profile";
import { getReviewsFromFood, getUserById } from "@/queries/user";
import {
  getDonatedFoodByUserId,
  getReservedFoodByUserId,
} from "@/queries/food";
import { getAvgReviews } from "@/lib/utils";
import { getRequestsByUserId } from "@/queries/request";

export default async function ProfilePage({ params }) {
  console.log(params);

  const { data: userData, error: userError } = await getUserById(params.id);

  const { data: donatedFoodList, error: donatedFoodError } =
    await getDonatedFoodByUserId(params.id);
  // console.log(donatedFoodList);

  const { data: reservedFoodList, error: reservedFoodError } =
    await getReservedFoodByUserId(params.id);
  // console.log(reservedFoodList);

  const { data: requestData, error: requestError } = await getRequestsByUserId(
    params.id
  );

  const { data: reviewData, error: reviewError } = await getReviewsFromFood(
    params.id
  );

  //get the avg of access_review, comm_review, quality_review from reviewData array

  const reviews = getAvgReviews(reviewData);
  // console.log(reviews);

  return (
    <div>
      <Profile
        userData={userData[0]}
        donatedFoodList={donatedFoodList}
        reservedFoodList={reservedFoodList}
        reviews={reviews}
        requestData={requestData}
      />
    </div>
  );
}
