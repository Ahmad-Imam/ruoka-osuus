"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

// Mock data for food history
const donatedFood = [
  { id: 1, name: "Homemade Lasagna", date: "2023-11-15" },
  { id: 2, name: "Vegetable Soup", date: "2023-11-10" },
  { id: 3, name: "Chocolate Chip Cookies", date: "2023-11-05" },
];

const receivedFood = [
  { id: 1, name: "Fresh Bread", date: "2023-11-18" },
  { id: 2, name: "Fruit Salad", date: "2023-11-12" },
];

// Helper function to render stars
const renderStars = (rating) => {
  if (rating === null) return "No reviews yet";
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
};

export default function UserProfile() {
  // Mock data for user profile
  const [user, setUser] = useState({
    id: "57b0c74d-2455-4a95-93b6-6a2d5800b6ed",
    full_name: "Ahmad Imam",
    email: "ahmadimam71@gmail.com",
    avatar_url:
      "https://lh3.googleusercontent.com/a/ACg8ocIFv5RBJUmyAMCOZjf5E7neW7X0F3byrzkNMkMMibnfQFeWSE0nJg=s96-c",
    radius: 10,
    access_review: 4,
    comm_review: 5,
    quality_review: 3,
  });

  const [radius, setRadius] = useState(user.radius || "");

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const handleRadiusSubmit = () => {
    setUser((prevUser) => ({ ...prevUser, radius: Number(radius) }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar_url} alt={user.full_name} />
                <AvatarFallback>
                  {user.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.full_name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">
                  Radius
                </span>
                <Input
                  type="number"
                  value={radius}
                  onChange={handleRadiusChange}
                  placeholder="Set radius"
                  className="w-24"
                />
                <span className="text-sm text-gray-500">km</span>
                <Button
                  onClick={handleRadiusSubmit}
                  variant="outline"
                  size="sm"
                >
                  Set
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Accessibility
                  </span>
                  <div className="flex">{renderStars(user.access_review)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Communication
                  </span>
                  <div className="flex">{renderStars(user.comm_review)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Quality
                  </span>
                  <div className="flex">{renderStars(user.quality_review)}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Tabs defaultValue="donated" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="donated">Donated Food</TabsTrigger>
                  <TabsTrigger value="received">Received Food</TabsTrigger>
                </TabsList>
                <TabsContent value="donated" className="mt-4">
                  <ul className="space-y-2">
                    {donatedFood.map((item) => (
                      <li
                        key={item.id}
                        className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-900">
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="received" className="mt-4">
                  <ul className="space-y-2">
                    {receivedFood.map((item) => (
                      <li
                        key={item.id}
                        className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-900">
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
