"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { reserveFoodAction } from "@/app/actions";

export default function FoodReserve({ foodInfo }) {
  async function handleReserveClick() {
    console.log("Reserve food");
    await reserveFoodAction(foodInfo.uuid, "reserved");
  }

  return (
    <div className="flex justify-between items-end">
      {/* <Button variant="outline">Contact Sharer</Button> */}
      <Button
        disabled={foodInfo?.status === "reserved"}
        onClick={handleReserveClick}
      >
        Reserve Food
      </Button>
    </div>
  );
}
