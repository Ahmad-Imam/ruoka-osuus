import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StarIcon } from "lucide-react";
import ProfileRadius from "./ProfileRadius";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DonatedFood from "./DonatedFood";
import ReceivedFood from "./ReceivedFood";
import RequestedFood from "./RequestedFood";

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

export default function UserProfile({
  userData,
  donatedFoodList,
  reviews,
  reservedFoodList,
  requestData,
}) {
  // Mock data for user profile
  console.log(reservedFoodList?.length);

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
                  <span className="text-sm font-medium ">Accessibility</span>
                  <div className="flex">
                    {renderStars(reviews.access_review)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium ">Communication</span>
                  <div className="flex">{renderStars(reviews.comm_review)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium ">Quality</span>
                  <div className="flex">
                    {renderStars(reviews.quality_review)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Tabs defaultValue="donation" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="donation">Donations</TabsTrigger>
                  <TabsTrigger value="request">Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="donation" className="mt-4">
                  <Tabs defaultValue="donated" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="donated">Donated</TabsTrigger>
                      <TabsTrigger value="received">Reserved</TabsTrigger>
                    </TabsList>
                    <TabsContent value="donated" className="mt-4">
                      <DonatedFood donatedFoodList={donatedFoodList} />
                    </TabsContent>
                    <TabsContent value="received" className="mt-4">
                      <ReceivedFood reservedFoodList={reservedFoodList} />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                <TabsContent value="request" className="mt-4">
                  <RequestedFood requestData={requestData} />
                </TabsContent>
              </Tabs>

              {/* <Tabs defaultValue="donated" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="donated">Donated</TabsTrigger>
                  <TabsTrigger value="received">Received</TabsTrigger>
                </TabsList>
                <TabsContent value="donated" className="mt-4">
                  <DonatedFood donatedFoodList={donatedFoodList} />
                </TabsContent>
                <TabsContent value="received" className="mt-4">
                  <ReceivedFood reservedFoodList={reservedFoodList} />
                </TabsContent>
              </Tabs> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
