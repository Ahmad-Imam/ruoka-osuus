import React from "react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FoodCard({ item }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Quantity: {item.amount}</p>
        <p>Category: {item.category}</p>
        <p>Expires: {item.expirationDate}</p>
        <Button className="mt-4">Request</Button>
      </CardContent>
    </Card>
  );
}
