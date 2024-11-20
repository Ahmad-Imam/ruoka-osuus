import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

export default function ReceivedFood({ reservedFoodList }) {
  return (
    <ul className="space-y-2">
      {reservedFoodList?.length !== 0 ? (
        reservedFoodList.map((item) => (
          <Link
            href={`/foodDetails/${item.id}`}
            key={item.id}
            className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
          >
            <div className="font-medium text-gray-900 w-10">{item.title}</div>

            <div className="text-sm text-gray-600 ">{item.expirationdate}</div>

            <div className="text-sm text-gray-600 ">{item.amount}</div>
            {item?.access_review === 0 && (
              <Badge className="text-sm text-yellow-500 bg-gray-200">
                Awaiting Review
              </Badge>
            )}
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg py-4">
          You have not saved any food yet.
        </p>
      )}
    </ul>
  );
}
