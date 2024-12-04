import Image from "next/image";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import RenderMap from "@/components/RenderMap";

export default function EventDetails({ eventInfo, eventOwner, loggedUser }) {
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
        </CardContent>
      </Card>
    </div>
  );
}
