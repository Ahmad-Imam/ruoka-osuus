"use client";
import React, { useEffect } from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FoodCard from "./FoodCard";
import { getAllFoodLocationAction } from "@/app/actions";

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

export default function FoodList({ allFood }) {
  // console.log(allFood);
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItems, setFoodItems] = useState(allFood);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  // console.log(currentLocation);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter food items based on search term
    if (searchTerm === "") {
      setFoodItems(allFood);
      return;
    }
    const filteredItems = foodItems.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoodItems(filteredItems);
  };

  async function handleMyLocationClick() {
    console.log("clicked");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }

    const newFoodList = await getAllFoodLocationAction();

    setFoodItems(newFoodList);
  }

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
          <Button type="button" onClick={handleMyLocationClick}>
            Nearby
          </Button>
        </div>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {foodItems.map((item) => (
          <FoodCard item={item} key={item?.uuid} />
        ))}
      </div>
    </div>
  );
}
