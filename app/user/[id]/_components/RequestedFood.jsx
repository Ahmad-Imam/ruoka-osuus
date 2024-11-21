import Link from "next/link";
import React from "react";

export default function RequestedFood({ requestData }) {
  return (
    <ul className="space-y-2">
      <div className="flex items-center justify-between p-3">
        {/* <p>title</p>
                      <p>Expired Date</p>
                      <p>Amount</p> */}
      </div>
      {requestData?.length !== 0 ? (
        requestData.map((item) => (
          <Link
            href={`/details/request/${item.id}`}
            key={item.id}
            className="bg-gray-50 p-3 rounded-md flex justify-between items-center"
          >
            <div className="font-medium text-gray-900 w-10">{item.title}</div>

            <div className="text-sm text-gray-600 ">
              {new Date(item.created_at).toLocaleDateString()}
            </div>
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
