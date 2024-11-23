import Link from "next/link";
import React from "react";

export default function DonatedFood({ donatedFoodList }) {
  return (
    <ul className="space-y-2">
      <div className="flex items-center justify-between p-3">
        {/* <p>title</p>
                      <p>Expired Date</p>
                      <p>Amount</p> */}
      </div>
      {donatedFoodList?.length !== 0 ? (
        donatedFoodList.map((item) => (
          <Link
            href={`/details/donation/${item.id}`}
            key={item.id}
            className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
          >
            <div className="font-medium text-gray-900 w-10">{item.title}</div>

            <div className="text-sm  ">{item.expirationdate}</div>

            <div className="text-sm  ">{item.amount}</div>
          </Link>
        ))
      ) : (
        <p className="text-center  text-lg py-4">
          You have not donated any food yet.
        </p>
      )}
    </ul>
  );
}
