import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileRadius from "./ProfileRadius";
import { StarFilledIcon } from "@radix-ui/react-icons";

import DonatedFood from "./DonatedFood";
import ReservedFood from "./ReservedFood";
import RequestedFood from "./RequestedFood";
import UserEvent from "./UserEvent";

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

export default function Profile({
  userData,
  donatedFoodList,
  reviews,
  reservedFoodList,
  requestData,
  isLoggedUser,
  eventData,
}) {
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className=" shadow-lg">
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
                <h1 className="text-2xl font-bold ">{userData.full_name}</h1>
                <p className="">{userData.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-4">
              <ProfileRadius userData={userData} isLoggedUser={isLoggedUser} />
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="donation">Donations</TabsTrigger>
                  <TabsTrigger value="request">Requests</TabsTrigger>
                  <TabsTrigger value="event">Events</TabsTrigger>
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
                      <ReservedFood reservedFoodList={reservedFoodList} />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                <TabsContent value="request" className="mt-4">
                  <RequestedFood requestData={requestData} />
                </TabsContent>
                <TabsContent value="event" className="mt-4">
                  <UserEvent eventData={eventData} />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
