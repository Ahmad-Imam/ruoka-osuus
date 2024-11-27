"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  addInterestedUserToEventAction,
  reserveFoodAction,
} from "@/app/actions";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EventInterest({
  eventInfo,
  loggedUser,
  isLoggedUserInterestedUser,
}) {
  console.log(loggedUser);
  const isLoggedUserFoodOwner = eventInfo?.userid === loggedUser?.id;
  console.log("isLoggedUserFoodOwner");
  console.log(isLoggedUserFoodOwner);
  // console.log(loggedUser?.id);
  async function handleReserveClick() {
    console.log("Reserve food");

    if (eventInfo?.fstatus === "reserved") {
      await reserveFoodAction(eventInfo.id, "available");
      toast.success("Reservation cancelled");
    } else {
      await reserveFoodAction(eventInfo.id, "reserved", loggedUser?.id);
      toast.success("Food reserved");
    }
  }

  async function handleCompleteDonation() {
    console.log("Complete Donation");
    await reserveFoodAction(eventInfo.id, "completed");
    toast.success("Donation completed");
  }

  async function handleAddToInterested() {
    console.log("Add to interested");
    const { data, error } = await addInterestedUserToEventAction(
      eventInfo.id,
      loggedUser?.id
    );
    console.log(data);
    toast.success("Added to interested");
  }

  return (
    <div className="flex justify-between items-end w-full">
      {isLoggedUserFoodOwner &&
        (!isLoggedUserInterestedUser ? (
          <div className="flex justify-between flex-row items-center  w-full">
            <Button
              onClick={handleAddToInterested}
              className="text-white"
              //   disabled={foodInfo?.status !== "reserved"}
            >
              Add to Interested
            </Button>
          </div>
        ) : (
          <div className="flex justify-between flex-row items-center  w-full">
            <Button
              onClick={handleCompleteDonation}
              className="text-white"
              //   disabled={foodInfo?.status !== "reserved"}
            >
              Remove from Interested
            </Button>
          </div>
        ))}
    </div>
  );
}
