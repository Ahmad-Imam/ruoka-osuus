import React from "react";
import RequestDetails from "./_components/RequestDetails";
import { getFoodById } from "@/queries/food";
import { getLoggedInUser, getUserById } from "@/queries/user";
import { getRequestById } from "@/queries/request";

export const metadata = {
  title: "Request Details",
  description: "Request Details",
};

export default async function RequestDetailsPage({ params }) {
  const { id } = params;

  const { data, error } = await getRequestById(id);

  const { data: userData, error: userError } = await getUserById(
    data[0].userid
  );

  return (
    <div>
      <RequestDetails requestInfo={data[0]} requestUser={userData[0]} />
    </div>
  );
}
