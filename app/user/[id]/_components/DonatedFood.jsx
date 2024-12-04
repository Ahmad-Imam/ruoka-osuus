import Link from "next/link";
import React from "react";

export default function DonatedFood({ donatedFoodList }) {
  return (
    <ul className="space-y-2">
      <div className="flex items-center justify-between p-3"></div>
      {donatedFoodList?.length !== 0 ? (
        donatedFoodList.map((item) => (
          <Link
            href={`/details/donation/${item.id}`}
            key={item.id}
            className=" dark:bg-slate-800 cardFull cardFullDark p-3 rounded-md flex justify-between items-center"
          >
            <div className="font-medium">{item.title}</div>

            <div className="text-sm">{item.expirationdate}</div>
          </Link>
        ))
      ) : (
        <p className="text-center  text-lg py-4">You dont have any donation.</p>
      )}
    </ul>
  );
}
