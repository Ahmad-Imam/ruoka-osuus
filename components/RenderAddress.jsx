"use client";

import { useState, useEffect, useRef, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useJsApiLoader } from "@react-google-maps/api";

export default function RenderAddress({ setFormData }) {
  const libs = ["places", "core", "maps", "marker"];

  const [map, setMap] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 43.65107,
    lng: -79.347015,
  });

  const mapRef = useRef(null);

  const placesAutoCompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    nonce: "477d4456-f7b5-45e2-8945-5f17b3964752",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: libs,
  });

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: {
          ...currentPosition,
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

      // const cityCircle = new google.maps.Circle({
      //   strokeColor: "#00FF00",
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: "#0FF000",
      //   fillOpacity: 0.35,
      //   map: gMap,
      //   center: {
      //     lat: mapOptions?.center?.lat,
      //     lng: mapOptions?.center.lng,
      //   },
      //   radius: 5000,
      // });

      //   const ontarioBounds = new google.maps.LatLngBounds(
      //     new google.maps.LatLng({ lat: 48.4026688, lng: -89.4053302 }), // south west
      //     new google.maps.LatLng({ lat: 54.3666786, lng: -82.5269667 }) // north east
      //   );

      const gAutoComplete = new google.maps.places.Autocomplete(
        placesAutoCompleteRef.current,
        {
          fields: ["formatted_address", "geometry", "name"],
          // bounds: ontarioBounds,
          componentRestrictions: {
            country: ["fi", "bd"],
          },
        }
      );
      setMap(gMap);
      setAutoComplete(gAutoComplete);
      setFormData((prev) => ({
        ...prev,
        address: "Initial Address",
        location: {
          lat: currentPosition?.lat,
          lng: currentPosition?.lng,
        },
      }));

      //   gAutoComplete.addListener("place_changed", () => {
      //     const place = gAutoComplete.getPlace();
      //     const position = place.geometry?.location;
      //     onAddressSelect(place.formatted_address, {
      //       lat: position?.lat(),
      //       lng: position?.lng(),
      //     });
      //   });
    }
  }, [isLoaded]);

  useEffect(() => {
    autoComplete?.addListener("place_changed", () => {
      const place = autoComplete?.getPlace();

      setSelectedPlace(place);
      setSelectedAddress(place?.formatted_address);
      const position = place.geometry?.location;

      setFormData((prev) => ({
        ...prev,
        address: place?.formatted_address,
        location: {
          lat: position?.lat(),
          lng: position?.lng(),
        },
      }));

      if (position) {
        setMarker(position, place?.name);
      }
      // onAddressSelect(place.formatted_address, {
      //   lat: position?.lat(),
      //   lng: position?.lng(),
      // });
    });
  }, [autoComplete]);

  function setMarker(location, name) {
    if (!map) return;

    map.setCenter(location);
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "marker",
    });

    // const cityCircle = new google.maps.Circle({
    //   strokeColor: "#00FF00",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#0FF000",
    //   fillOpacity: 0.35,
    //   map,
    //   center: {
    //     lat: location?.lat,
    //     lng: location?.lng,
    //   },
    //   radius: 5000,
    // });

    // const infoWindow = new google.maps.InfoWindow({
    //   maxWidth: 200,
    //   position: location,
    //   content: name,
    // });

    // infoWindow.open({
    //   anchor: marker,
    //   map,
    //   shouldFocus: false,
    // });
  }

  function handleCurrentLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    async function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCurrentPosition({ lat: latitude, lng: longitude });
      setMarker({ lat: latitude, lng: longitude }, "Current Location");
      const currentAddress = await new google.maps.Geocoder().geocode(
        {
          location: { lat: latitude, lng: longitude },
        },
        (results, status) => {
          if (status === "OK") {
            setSelectedAddress(results[0].formatted_address);
            setFormData((prev) => ({
              ...prev,
              address: results[0]?.formatted_address,
              location: {
                lat: latitude,
                lng: longitude,
              },
            }));
          }
        }
      );
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <Label htmlFor="foodAddress">Address</Label>
        <button type="button" onClick={handleCurrentLocationClick}>
          Current Location
        </button>
      </div>
      <Input
        ref={placesAutoCompleteRef}
        id="foodAddress"
        name="foodAddress"
        className="mb-2 dark:bg-slate-800"
      />
      <div className="my-5">Selected Address: {selectedAddress}</div>
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
