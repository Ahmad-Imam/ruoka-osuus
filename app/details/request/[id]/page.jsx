import React from "react";
import RequestDetails from "./_components/RequestDetails";
import { getFoodById } from "@/queries/food";
import { getLoggedInUser, getUserById } from "@/queries/user";
import { getRequestById } from "@/queries/request";

export default async function RequestDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await getRequestById(id);

  const { data: userData, error: userError } = await getUserById(
    data[0].userid
  );

  // console.log(userData);
  // [
  //   {
  //     id: "57b0c74d-2455-4a95-93b6-6a2d5800b6ed",
  //     full_name: "Ahmad Imam",
  //     email: "ahmadimam71@gmail.com",
  //     avatar_url:
  //       "https://lh3.googleusercontent.com/a/ACg8ocIFv5RBJUmyAMCOZjf5E7neW7X0F3byrzkNMkMMibnfQFeWSE0nJg=s96-c",
  //     radius: 12,
  //     access_review: 0,
  //     comm_review: 0,
  //     quality_review: 0,
  //   },
  // ];

  return (
    <div>
      <RequestDetails requestInfo={data[0]} requestUser={userData[0]} />
    </div>
  );
}
