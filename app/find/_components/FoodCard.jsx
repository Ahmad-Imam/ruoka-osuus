import React from "react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function FoodCard({ item }) {
  console.log(item);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Quantity: {item.amount}</p>
        <p>Category: {item.category}</p>
        <p>Expires: {item.expirationDate}</p>
        <Link href={`/foodDetails/${item?.uuid}`} className="mt-4">
          <Button>Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
