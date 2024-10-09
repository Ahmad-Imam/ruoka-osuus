"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Mock data for available food items
const mockFoodItems = [
  {
    id: 1,
    name: "Apples",
    quantity: "5 lbs",
    category: "Fruits",
    expirationDate: "2023-06-30",
  },
  {
    id: 2,
    name: "Bread",
    quantity: "2 loaves",
    category: "Grains",
    expirationDate: "2023-06-25",
  },
  {
    id: 3,
    name: "Milk",
    quantity: "1 gallon",
    category: "Dairy",
    expirationDate: "2023-06-28",
  },
  {
    id: 4,
    name: "Carrots",
    quantity: "2 lbs",
    category: "Vegetables",
    expirationDate: "2023-07-02",
  },
];

export default function FindFood() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItems, setFoodItems] = useState(mockFoodItems);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter food items based on search term
    const filteredItems = mockFoodItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoodItems(filteredItems);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Available Food</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-grow">
            <Label htmlFor="search" className="sr-only">
              Search for food
            </Label>
            <Input
              id="search"
              type="search"
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {foodItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Quantity: {item.quantity}</p>
              <p>Category: {item.category}</p>
              <p>Expires: {item.expirationDate}</p>
              <Button className="mt-4">Request</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
