import { MapPinIcon, UserIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";
import RenderMap from "@/components/RenderMap";

export default function RequestDetails({ requestInfo, requestUser }) {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <Card className="max-w-3xl mx-auto cardFull cardFullDark">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                {requestInfo.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm ">{requestInfo.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm ">{requestInfo.contact}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-sm flex items-start">
              <MapPinIcon className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
              {requestInfo.address}
            </p>
            <RenderMap location={requestInfo.location} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shared by</h3>
            <Link
              href={`/user/${requestInfo.userid}`}
              className="flex justify-start items-start w-min"
            >
              <p className="text-sm flex items-center font-bold w-max">
                <UserIcon className="w-6 h-6 mr-1" />
                {requestUser?.full_name}
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
