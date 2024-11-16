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

export default function FoodDetails({ foodInfo, foodUser }) {
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
              <FoodReview foodInfo={foodInfo} />
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
