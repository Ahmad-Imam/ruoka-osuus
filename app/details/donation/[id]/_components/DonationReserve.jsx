"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { reserveFoodAction } from "@/app/actions";
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

export default function DonationReserve({ foodInfo, loggedUser }) {
  // console.log(loggedUser);
  // console.log(foodInfo && foodInfo?.userid);
  // console.log(loggedUser?.id);
  const isLoggedUserFoodOwner =
    foodInfo?.userid.toString() === loggedUser?.id.toString();
  // console.log(isLoggedUserFoodOwner);
  // console.log(loggedUser?.id);
  async function handleReserveClick() {
    console.log("Reserve food");

    if (foodInfo?.fstatus === "reserved") {
      await reserveFoodAction(foodInfo.id, "available");
      toast.success("Reservation cancelled");
    } else {
      await reserveFoodAction(foodInfo.id, "reserved", loggedUser?.id);
      toast.success("Food reserved");
    }
  }

  async function handleCompleteDonation() {
    console.log("Complete Donation");
    await reserveFoodAction(foodInfo.id, "completed");
    toast.success("Donation completed");
  }

  return (
    <div className="flex justify-between items-end w-full">
      {isLoggedUserFoodOwner && foodInfo?.fstatus === "reserved" && (
        <div className="flex justify-between flex-row items-center  w-full">
          <Button
            onClick={handleReserveClick}
            //   disabled={foodInfo?.status !== "reserved"}
            variant="outline"
            className=""
          >
            Cancel Reservation
          </Button>
          <Button
            onClick={handleCompleteDonation}
            className=""
            //   disabled={foodInfo?.status !== "reserved"}
          >
            Complete Donation
          </Button>
        </div>
      )}
      {!isLoggedUserFoodOwner && foodInfo?.fstatus === "available" && (
        // <Button
        //   disabled={foodInfo?.status === "reserved"}
        //   onClick={handleReserveClick}
        // >
        //   Reserve Food
        // </Button>

        <AlertDialog>
          <AlertDialogTrigger
            asChild
            disabled={foodInfo?.status === "reserved"}
          >
            <Button className="text-white">Reserve</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You can not cancel it later. Contact the owner if you want to
                cancel.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => console.log("clicked cancel")}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleReserveClick}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
