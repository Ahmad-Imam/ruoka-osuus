"use client";
import React, { useEffect } from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EventCard from "./EventCard";

import { getAllEventLocationAction } from "@/app/actions";

export default function EventList({ allEvents, userRadius }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItems, setFoodItems] = useState(allEvents);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm === "") {
      setFoodItems(allEvents);
      return;
    }
    const filteredItems = allEvents.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
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
          const newFoodList = await getAllEventLocationAction(
            newLocation,
            userRadius
          );

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
      <h1 className="text-3xl font-bold mb-6">Find Available Events</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-grow">
            <Label htmlFor="search" className="sr-only">
              Search for events
            </Label>
            <Input
              id="search"
              type="search"
              placeholder="Search for requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" className="text-white">
            Search
          </Button>
          <Button
            type="button"
            className="text-white"
            onClick={handleMyLocationClick}
          >
            Nearby
          </Button>
        </div>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {error && <p>{error.message}</p>}
        {loading ? (
          <p className="text-center  text-lg mt-4">Loading...</p>
        ) : foodItems?.length === 0 ? (
          <p className="text-center  text-lg mt-4">No items found.</p>
        ) : (
          foodItems?.map((item) => <EventCard item={item} key={item?.id} />)
        )}
      </div>
    </div>
  );
}
