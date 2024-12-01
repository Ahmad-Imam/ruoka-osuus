import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  UserCheck2Icon,
  UserIcon,
} from "lucide-react";
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
import EventMap from "./EventMap";
import EventInterest from "./EventInterest";
import Link from "next/link";
import RenderMap from "@/components/RenderMap";

export default function EventDetails({
  eventInfo,
  eventOwner,
  loggedUser,
  isLoggedUserInterestedUser,
}) {
  // console.log(foodUser);
  // console.log(foodInfo);

  // const isLoggedUserReservedUser = reservedUser?.id === loggedUser?.id;
  // console.log(loggedUser);
  // console.log(reservedUser);
  // console.log("isLoggedUserReservedUser");
  // console.log(isLoggedUserReservedUser);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Card className="max-w-3xl mx-auto cardFull cardFullDark">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                {eventInfo.title}
              </CardTitle>
            </div>
            <div className="flex flex-col gap-2">
              <Badge
                variant="secondary"
                className="text-sm uppercase  justify-center"
              >
                {eventInfo.fstatus}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {eventInfo?.imageUrl && (
            <Image
              src={eventInfo?.imageUrl}
              alt={eventInfo?.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-md"
            />
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm ">{eventInfo.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm ">{eventInfo.contact}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Estimated Date</h3>
              <p className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {eventInfo.estimatedate}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm flex items-start">
                <MapPinIcon className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
                {eventInfo.address}
              </p>
            </div>
          </div>

          <RenderMap location={eventInfo.location} />

          <div className="">
            <h3 className="font-semibold mb-2">Shared by</h3>
            <Link
              href={`/user/${eventInfo.userid}`}
              className="flex justify-start items-start w-min"
            >
              <p className="text-sm flex items-center font-bold w-max">
                <UserIcon className="w-6 h-6 mr-1" />
                {eventOwner?.full_name}
              </p>
            </Link>
          </div>
          {/* {reservedUser && (
            <div>
              <h3 className="font-semibold mb-2">Reserved by</h3>
              <Link href={`/user/${reservedUser?.id}`}>
                <p className="text-sm flex items-center font-bold">
                  <UserCheck2Icon className="w-6 h-6 mr-1 text-green-500" />
                  {reservedUser?.full_name}
                </p>
              </Link>
            </div>
          )} */}
        </CardContent>
        {/* {loggedUser && (
          <>
            <Separator className="my-4" />
            <CardFooter className="flex justify-between">
              <EventInterest
                eventInfo={eventInfo}
                foodUser={eventOwner}
                loggedUser={loggedUser}
                isLoggedUserInterestedUser={isLoggedUserInterestedUser}
              />
            </CardFooter>
          </>
        )} */}
      </Card>
    </div>
  );
}
