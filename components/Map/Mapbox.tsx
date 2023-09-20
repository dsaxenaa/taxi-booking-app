"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import Map, { Marker } from "react-map-gl";
import React, { useContext, useEffect, useRef } from "react";

import { DestinationCoordinates } from "@/context/DestCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import DistanceTime from "./DistanceTime";
import MapBoxRoute from "./MapboxRoute";
import Markers from "./Markers";
import { SourceCoordinates } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { v4 as uuidv4 } from "uuid";

const sessiontoken = uuidv4();
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";

const MapBox = () => {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCoordinates);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinates
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates?.long, sourceCoordinates?.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates?.long, destinationCoordinates?.lat],
        duration: 2500,
      });
    }

    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCoordinates.long +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCoordinates.long +
        "," +
        destinationCoordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    console.log(result);
    setDirectionData(result);
  };

  return (
    <div className="p-3 m-1">
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.long,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 700, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="absolute bottom-20 z-20  right-[30px] hidden md:block"> 
        <DistanceTime/>
      </div>
    </div>
  );
};

export default MapBox;
