import Image from "next/image";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FoodMap from "./FoodMap";
import FoodReserve from "./FoodReserve";
import Link from "next/link";
import { FoodReview } from "./FoodReview";
import { StarFilledIcon } from "@radix-ui/react-icons";

export default function FoodDetails({ foodInfo, foodUser }) {
  const renderStars = (rating) => {
    if (rating === null) return "No reviews yet";
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarFilledIcon
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  // console.log(foodUser);
  // console.log(foodInfo);
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                {foodInfo.title}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {foodInfo.category}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Badge
                variant="secondary"
                className="text-sm uppercase  justify-center"
              >
                {foodInfo.status}
              </Badge>
              {foodInfo?.access_review === 0 && (
                <FoodReview foodInfo={foodInfo} />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Image
            src={foodInfo?.imageUrl}
            alt={foodInfo?.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-md"
          />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-gray-600">{foodInfo.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Amount</h3>
              <p>{foodInfo.amount}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Expiration Date</h3>
              <p className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {foodInfo.expirationdate}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-sm flex items-start">
              <MapPinIcon className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
              {foodInfo.address}
            </p>
            <FoodMap location={foodInfo.location} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shared by</h3>
            <Link href={`/user/${foodInfo.userId}`}>
              <p className="text-sm flex items-center">
                <UserIcon className="w-4 h-4 mr-1" />
                User ID: {foodUser?.full_name}
                {foodInfo.userId}
              </p>
            </Link>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Rating:</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                Accessibility
              </span>
              <div className="flex">{renderStars(foodInfo.access_review)}</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                Communication
              </span>
              <div className="flex">{renderStars(foodInfo.comm_review)}</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Quality</span>
              <div className="flex">{renderStars(foodInfo.quality_review)}</div>
            </div>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <div></div>
          <FoodReserve foodInfo={foodInfo} />
        </CardFooter>
      </Card>
    </div>
  );
}
