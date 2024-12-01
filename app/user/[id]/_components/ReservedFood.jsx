import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

export default function ReservedFood({ reservedFoodList }) {
  return (
    <ul className="space-y-2">
      {reservedFoodList?.length !== 0 ? (
        reservedFoodList.map((item) => (
          <Link
            href={`/details/donation/${item.id}`}
            key={item.id}
            className=" dark:bg-slate-800 cardFull cardFullDark p-3 rounded-md flex justify-between items-center"
          >
            <div className="font-medium">{item.title}</div>

            <div className="text-sm">{item.expirationdate}</div>

            {item?.access_review === 0 && (
              <Badge className="text-sm  ">Awaiting Review</Badge>
            )}
          </Link>
        ))
      ) : (
        <p className="text-center  text-lg py-4">
          You dont have any reservation.
        </p>
      )}
    </ul>
  );
}
