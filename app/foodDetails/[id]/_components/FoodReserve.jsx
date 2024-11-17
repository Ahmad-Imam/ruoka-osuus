"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { reserveFoodAction } from "@/app/actions";

export default function FoodReserve({ foodInfo }) {
  async function handleReserveClick() {
    console.log("Reserve food");

    if (foodInfo?.status === "reserved") {
      await reserveFoodAction(foodInfo.id, "available");
    } else {
      await reserveFoodAction(foodInfo.id, "reserved");
    }
  }

  return (
    <div className="flex justify-between items-end w-full">
      {foodInfo?.status === "reserved" && (
        <Button
          onClick={handleReserveClick}
          //   disabled={foodInfo?.status !== "reserved"}
          variant="outline"
        >
          Cancel Reservation
        </Button>
      )}
      <Button
        disabled={foodInfo?.status === "reserved"}
        onClick={handleReserveClick}
      >
        Reserve Food
      </Button>
    </div>
  );
}
