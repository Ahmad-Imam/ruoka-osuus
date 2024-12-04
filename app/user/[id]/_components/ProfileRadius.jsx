"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setUserRadiusAction } from "@/app/actions";
import { toast } from "sonner";

export default function ProfileRadius({ userData, isLoggedUser }) {
  const [radius, setRadius] = useState(userData?.radius || "");
  const [radiusEdit, setRadiusEdit] = useState(false);

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const handleRadiusSubmit = async () => {
    await setUserRadiusAction(userData.id, Number(radius));
    setRadiusEdit(false);
    toast.success("Radius updated successfully");
  };

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="text-sm font-medium ">Radius</div>
      {radiusEdit ? (
        <div className="flex items-center justify-center gap-2">
          <Input
            type="number"
            value={radius}
            onChange={handleRadiusChange}
            placeholder="Set radius"
            className="w-24"
          />
          <span className="text-sm ">km</span>
          <Button onClick={handleRadiusSubmit} className="text-white" size="sm">
            Set
          </Button>
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-center">
          <span>{radius} km</span>
          {isLoggedUser && (
            <Button
              className="text-white font-semibold"
              onClick={() => setRadiusEdit(true)}
              size="sm"
            >
              Edit
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
