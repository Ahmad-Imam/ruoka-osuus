import React from "react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RequestCard({ item }) {
  // console.log(item);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between ">
          {item.title}
          {item?.distance && <div>Distance: {item.distance.toFixed(2)} KM</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{item.description}</p>
        <Link href={`/details/request/${item?.id}`} className="">
          <Button className="my-4 ">Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
