"use client"

import { useEffect, useState } from "react";

// import Image from 'next/image'
import Booking from "@/components/Booking/Booking";
import { DestinationCoordinates } from "@/context/DestCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBox from "@/components/Map/Mapbox";
import Navbar from "@/components/Navbar";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { SourceCoordinates } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";

export default function Home() {

  const [userLocation, setUserLocation] = useState<any>()
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
  const [directionData, setDirectionData] = useState<any>([])
  const [carAmount, setCarAmount] = useState<any>()

  useEffect(()=>{
    getUserLocation();
  },[])

  const getUserLocation = ()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        long: pos.coords.longitude
      })
    })
  }

  return (
   <div>
    <DirectionDataContext.Provider value={{directionData, setDirectionData}}>
    <DestinationCoordinates.Provider value={{destinationCoordinates,setDestinationCoordinates}}>
    <SourceCoordinates.Provider value={{sourceCoordinates,setSourceCoordinates}}>
    <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
    <SelectedCarAmountContext.Provider value={{carAmount, setCarAmount}}>
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-1 bg-white-300">
        <Booking/>
      </div>
      <div className="col-span-2 ">
        <MapBox/>
      </div>
    </div>
    </SelectedCarAmountContext.Provider>
    </UserLocationContext.Provider>
    </SourceCoordinates.Provider>
    </DestinationCoordinates.Provider>
    </DirectionDataContext.Provider>
   </div>
  )
}
