import React from "react";
import FoodDetails from "./_components/FoodDetails";
import { getFoodById } from "@/queries/food";

export default async function FoodDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await getFoodById(id);

  return (
    <div>
      <FoodDetails foodInfo={data[0]} />
    </div>
  );
}
