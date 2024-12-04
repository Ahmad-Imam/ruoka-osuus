import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  UserCheck2Icon,
  UserIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import DonationReserve from "./DonationReserve";
import Link from "next/link";
import { DonationReview } from "./DonationReview";
import { StarFilledIcon } from "@radix-ui/react-icons";
import RenderMap from "@/components/RenderMap";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function DonationDetails({
  foodInfo,
  foodUser,
  loggedUser,
  reservedUser,
}) {
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

  let isLoggedUserReservedUser = false;
  if (loggedUser)
    isLoggedUserReservedUser = reservedUser?.id === loggedUser?.id;

  const reviewCats = ["Ease of Access", "Communication", "Food Quality"];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Card className="max-w-3xl mx-auto cardFull cardFullDark">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                {capitalizeFirstLetter(foodInfo.title)}
              </CardTitle>
              <Badge variant="" className="text-xs">
                {capitalizeFirstLetter(foodInfo.category)}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Badge
                variant="secondary"
                className="text-sm uppercase  justify-center"
              >
                {foodInfo.fstatus}
              </Badge>
              {isLoggedUserReservedUser &&
                foodInfo?.access_review === 0 &&
                foodInfo?.fstatus === "completed" && (
                  <DonationReview foodInfo={foodInfo} />
                )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {foodInfo?.imageUrl && (
            <Image
              src={foodInfo?.imageUrl}
              alt={foodInfo?.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-md"
            />
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm ">
                {capitalizeFirstLetter(foodInfo.description)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm ">{foodInfo.contact}</p>
            </div>
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
            <RenderMap location={foodInfo.location} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shared by</h3>
            <Link
              href={`/user/${foodInfo.userid}`}
              className="flex justify-start items-start w-min"
            >
              <p className="text-sm flex items-center font-bold w-max">
                <UserIcon className="w-6 h-6 mr-1" />
                {foodUser?.full_name}
              </p>
            </Link>
          </div>
          {reservedUser && (
            <div>
              <h3 className="font-semibold mb-2">Reserved by</h3>
              <Link href={`/user/${reservedUser?.id}`}>
                <p className="text-sm flex items-center font-bold">
                  <UserCheck2Icon className="w-6 h-6 mr-1 text-green-500" />
                  {reservedUser?.full_name}
                </p>
              </Link>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Rating:</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium ">{reviewCats[0]}</span>
              <div className="flex">{renderStars(foodInfo.access_review)}</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium ">{reviewCats[1]}</span>
              <div className="flex">{renderStars(foodInfo.comm_review)}</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium ">{reviewCats[2]}</span>
              <div className="flex">{renderStars(foodInfo.quality_review)}</div>
            </div>
          </div>
        </CardContent>
        {loggedUser && (
          <>
            <Separator className="my-4" />
            <CardFooter className="flex justify-between">
              <DonationReserve
                foodInfo={foodInfo}
                foodUser={foodUser}
                loggedUser={loggedUser}
              />
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
