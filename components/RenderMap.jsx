"use client";

import { useState, useEffect, useRef, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useJsApiLoader } from "@react-google-maps/api";

export default function RenderMap({ location }) {
  const libs = ["places", "core", "maps", "marker"];

  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    nonce: "477d4456-f7b5-45e2-8945-5f17b3964752",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: libs,
  });

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: {
          ...location,
        },
        zoom: 14,
        mapId: "MY-MAP-ID-1234",
        colorScheme: google.maps.ColorScheme.FOLLOW_SYSTEM,
      };

      const gMap = new google.maps.Map(mapRef.current, mapOptions);

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: gMap,
        position: mapOptions?.center,
        title: "marker",
      });
    }
  }, [isLoaded]);

  return (
    <div className="my-5">
      <div className="flex flex-col space-y-4">
        {isLoaded ? (
          <div className="h-[400px] rounded-md" ref={mapRef} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
