"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DonationCard from "./DonationCard";
import { getAllFoodLocationAction } from "@/app/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Fruits",
  "Vegetables",
  "Grains",
  "Protein",
  "Dairy",
  "Other",
];

export default function DonationList({ allFood, userRadius }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [foodItems, setFoodItems] = useState(allFood);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (
      searchTerm === "" &&
      (searchCategory === "" || searchCategory === "all")
    ) {
      setFoodItems(allFood);
      return;
    }
    const filteredItems = allFood.filter(
      (item) =>
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          searchTerm === "") &&
        (item.category.toLowerCase() === searchCategory.toLowerCase() ||
          searchCategory === "all")
    );
    setFoodItems(filteredItems);
  };

  async function handleMyLocationClick() {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setError(null);
          const newFoodList = await getAllFoodLocationAction(
            newLocation,
            userRadius
          );

          const filteredItems = newFoodList.filter(
            (item) =>
              (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                searchTerm === "") &&
              (item.category.toLowerCase() === searchCategory.toLowerCase() ||
                searchCategory === "all")
          );

          setFoodItems(filteredItems);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError(new Error("Geolocation is not supported by your browser"));
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto px-4 py-8 w-4/5">
      <h1 className="text-3xl font-bold mb-6">Find Available Donations</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="w-full sm:w-48">
            <Select value={searchCategory} onValueChange={setSearchCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full sm:w-auto text-white">
            Search
          </Button>
          <Button
            type="button"
            onClick={handleMyLocationClick}
            className="w-full sm:w-auto text-white"
          >
            Nearby
          </Button>
        </div>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {error && <p className="text-red-500 col-span-full">{error.message}</p>}
        {loading ? (
          <p className="text-center text-lg mt-4 col-span-full">Loading...</p>
        ) : foodItems?.length === 0 ? (
          <p className="text-center text-lg mt-4 col-span-full">
            No items found.
          </p>
        ) : (
          foodItems?.map((item) => <DonationCard item={item} key={item?.id} />)
        )}
      </div>
    </div>
  );
}
