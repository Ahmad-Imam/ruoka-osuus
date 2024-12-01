import React from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { MapPinIcon } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function EventCard({ item }) {
  return (
    <Card className="flex flex-col justify-between cardFull cardFullDark">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between ">
          {capitalizeFirstLetter(item.title)}
          {item?.distance && <div>Distance: {item.distance.toFixed(2)} KM</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm flex items-start">
            <MapPinIcon className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
            {item.address}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/details/event/${item?.id}`} className="">
          <Button className="text-white">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
