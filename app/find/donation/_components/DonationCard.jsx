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
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function DonationCard({ item }) {
  return (
    <Card className="cardFull cardFullDark">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between gap-2 items-start">
          {capitalizeFirstLetter(item?.title)}

          <Badge className="text-gray-200">{item?.fstatus}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {item?.distance && <div>Distance: {item.distance.toFixed(2)} KM</div>}
        <p>Quantity: {item?.amount}</p>
        <p>Category: {capitalizeFirstLetter(item?.category)}</p>
        <p>Expires: {item?.expirationdate}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/details/donation/${item?.id}`} className="">
          <Button className="text-white">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
