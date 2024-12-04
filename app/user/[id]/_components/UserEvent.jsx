import Link from "next/link";
import React from "react";

export default function UserEvent({ eventData }) {
  return (
    <ul className="space-y-2">
      {eventData?.length !== 0 ? (
        eventData.map((item) => (
          <Link
            href={`/details/event/${item.id}`}
            key={item.id}
            className=" dark:bg-slate-800 cardFull cardFullDark p-3 rounded-md flex justify-between items-center"
          >
            <div className="font-medium">{item.title}</div>

            <div className="text-sm">{item.estimatedate}</div>
          </Link>
        ))
      ) : (
        <p className="text-center  text-lg py-4">You dont have any events.</p>
      )}
    </ul>
  );
}
