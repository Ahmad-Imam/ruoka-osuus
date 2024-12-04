"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { submitReviewFoodAction } from "@/app/actions";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

const ReviewStar = ({ filled, onClick }) => (
  <StarFilledIcon
    className={`h-8 w-8 cursor-pointer ${
      filled ? "text-yellow-400" : "text-gray-300"
    } hover:text-yellow-400 `}
    onClick={onClick}
  />
);

export function DonationReview({ foodInfo }) {
  const reviewCats = ["Ease of Access", "Communication", "Food Quality"];
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState({
    access_review: foodInfo?.access_review || 0,
    comm_review: foodInfo?.comm_review || 0,
    quality_review: foodInfo?.quality_review || 0,
  });

  const handleStarClick = (category, rating) => {
    setReviews((prev) => ({ ...prev, [category]: rating }));
  };

  const handleSubmit = async () => {
    if (
      reviews.access_review === 0 ||
      reviews.comm_review === 0 ||
      reviews.quality_review === 0
    ) {
      return;
    }

    await submitReviewFoodAction(reviews, foodInfo.id);
    toast.success("Review submitted successfully");
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="" variant="outline">
          Leave a Review
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Leave a Review for {foodInfo?.title}</DrawerTitle>
            <DrawerDescription>
              Rate your experience in these three categories
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {Object.keys(reviews).map((category, i) => (
              <div key={category} className="mb-4">
                <h3 className="mb-2 text-sm font-medium  capitalize">
                  {reviewCats[i]}
                </h3>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <ReviewStar
                      key={star}
                      filled={star <= reviews[category]}
                      onClick={() => handleStarClick(category, star)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 pt-0">
            <Button onClick={handleSubmit} className="w-full text-white">
              Submit Review
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
