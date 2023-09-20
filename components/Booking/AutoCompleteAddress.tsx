import React, { useContext, useEffect, useState } from "react";

import { DestinationCoordinates } from "@/context/DestCordiContext";
import { SourceCoordinates } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { v4 as uuidv4 } from "uuid";

const sessiontoken = uuidv4();
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const AutoCompleteAddress = () => {
  const [source, setSource] = useState<any>();
  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDestination] = useState<any>();
  const [destinationAddress, setdestinationAddress] = useState<any>([]);
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);
  const {sourceCoordinates, setSourceCoordinates} = useContext(SourceCoordinates)
  const {destinationCoordinates, setDestinationCoordinates} = useContext(DestinationCoordinates)
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  useEffect(() => {
    const delay = setTimeout(() => {
      getAddress();
    }, 1000);

    return () => clearTimeout(delay);
  }, [source, destination]);

  const getAddress = async () => {
    setAddressList([]);
    const query=sourceChange?source:destination;
    const res = await fetch(
      "http://localhost:3000/api/search-address?q=" + query,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    console.log(result);
    setAddressList(result);
  };

  const onSourceAddressClick = async (item: any) => {
    setSource(item.name);
    setAddressList([]);
    setSourceChange(false);
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        sessiontoken +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    setSourceCoordinates({
      long: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log(sourceCoordinates)
  };

  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.name);
    setdestinationAddress([]);
    setDestinationChange(false);
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        sessiontoken +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    setDestinationCoordinates({
      long: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log(destinationCoordinates)
  };

  // const setCurrentLocation = ()=>{
  //   setSourceCoordinates({
  //     long:userLocation?.long,
  //     lat:userLocation?.lat
  //   })
  // }

  return (
    <div className="mt-3 ">
      <div className="relative">
        <label className="text-gray-500">Where from?</label>
        {/* <span className="float-right text-gray-400 cursor-pointer" onClick={setCurrentLocation}>Select present location</span> */}
        <input
          type="text"
          className="bg-white p-1 border-[2px] focus:border-red-200 rounded-md outline-none w-full "
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />
        {addressList?.suggestions && sourceChange ? (
          <div className="p-2 shadow-lg rounded-md relative w-full bg-white">
            {addressList?.suggestions?.map((item: any, index: number) => {
              return (
                <h2
                  key={index}
                  className="p-3 hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    onSourceAddressClick(item);
                  }}
                >
                  {item.name},{item.place_formatted}
                </h2>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="mt-3">
        <label className="text-gray-500">Where to?</label>
        <input
          type="text"
          className="bg-white p-1 border-[2px] focus:border-red-200 rounded-md outline-none w-full "
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
          }}
        />
        {addressList?.suggestions && destinationChange ? (
          <div className="p-2 shadow-lg rounded-md relative w-full bg-white">
            {addressList?.suggestions?.map((item: any, index: number) => {
              return (
                <h2
                  key={index}
                  className="p-3 hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    onDestinationAddressClick(item);
                  }}
                >
                  {item.name},{item.place_formatted}
                </h2>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
