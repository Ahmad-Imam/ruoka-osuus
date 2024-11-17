import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StarIcon } from "lucide-react";
import ProfileRadius from "./ProfileRadius";
import { StarFilledIcon } from "@radix-ui/react-icons";

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
      <StarFilledIcon
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
};

export default function UserProfile({ userData, donatedFoodList, reviews }) {
  // Mock data for user profile

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={userData.avatar_url}
                  alt={userData.full_name}
                />
                <AvatarFallback>
                  {userData.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userData.full_name}
                </h1>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-4">
              <ProfileRadius userData={userData} />
              <div className="flex items-center space-x-2"></div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Accessibility
                  </span>
                  <div className="flex">
                    {renderStars(reviews.access_review)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Communication
                  </span>
                  <div className="flex">{renderStars(reviews.comm_review)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Quality
                  </span>
                  <div className="flex">
                    {renderStars(reviews.quality_review)}
                  </div>
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
                    <div className="flex items-center justify-between p-3">
                      <p>title</p>
                      <p>Expired Date</p>
                      <p>Amount</p>
                    </div>
                    {donatedFoodList.map((item) => (
                      <li
                        key={item.id}
                        className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
                      >
                        <div className="font-medium text-gray-900 w-10">
                          {item.title}
                        </div>

                        <div className="text-sm text-gray-600 ">
                          {item.expirationdate}
                        </div>

                        <div className="text-sm text-gray-600 ">
                          {item.amount}
                        </div>
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
