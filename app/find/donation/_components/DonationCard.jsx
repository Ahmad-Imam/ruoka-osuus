import React from "react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function DonationCard({ item }) {
  // console.log(item);
  return (
    <Card className="cardFull cardFullDark">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between ">
          {capitalizeFirstLetter(item.title)}
          <div className="flex gap-2 items-center justify-between">
            <Badge className="text-gray-200">{item.fstatus}</Badge>
            {item?.distance && (
              <div>Distance: {item.distance.toFixed(2)} KM</div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Quantity: {item.amount}</p>
        <p>Category: {item.category}</p>
        <p>Expires: {item.expirationdate}</p>
        <Link href={`/details/donation/${item?.id}`} className="">
          <Button className="my-4 text-white">Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
