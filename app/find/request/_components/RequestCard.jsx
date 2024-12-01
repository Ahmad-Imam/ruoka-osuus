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
import { capitalizeFirstLetter } from "@/lib/utils";

export default function RequestCard({ item }) {
  return (
    <Card className="flex flex-col justify-between cardFull cardFullDark">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between ">
          {capitalizeFirstLetter(item.title)}
          {item?.distance && <div>Distance: {item.distance.toFixed(2)} KM</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{capitalizeFirstLetter(item.description)}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/details/request/${item?.id}`} className="">
          <Button className="text-white">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
