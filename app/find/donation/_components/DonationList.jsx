"use client";
import React, { useEffect } from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import DonationCard from "./DonationCard";
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

export default function DonationList({ allFood, userRadius }) {
  // console.log(allFood);
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItems, setFoodItems] = useState(allFood);
  // console.log(currentLocation);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    // console.log("clicked");
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // setCurrentLocation(newLocation);
          setError(null);
          const newFoodList = await getAllFoodLocationAction(
            newLocation,
            userRadius
          );
          console.log(newLocation);
          console.log(newFoodList);

          setFoodItems(newFoodList);
          setLoading(false);
        },
        (error) => setError(error),
        { enableHighAccuracy: true }
      );
    }
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
        {error && <p>{error.message}</p>}
        {loading ? (
          <p className="text-center  text-lg mt-4">Loading...</p>
        ) : foodItems?.length === 0 ? (
          <p className="text-center  text-lg mt-4">
            No items found in your current location.
          </p>
        ) : (
          foodItems?.map((item) => <DonationCard item={item} key={item?.id} />)
        )}
      </div>
    </div>
  );
}
