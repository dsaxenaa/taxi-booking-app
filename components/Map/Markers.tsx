import React, { useContext } from 'react'

import { DestinationCoordinates } from '@/context/DestCordiContext';
import { Marker } from 'react-map-gl';
import { SourceCoordinates } from '@/context/SourceCordiContext';
import { UserLocationContext } from "@/context/UserLocationContext";

const Markers = () => {
    const { userLocation, setUserLocation } = useContext(UserLocationContext);
    const {sourceCoordinates, setSourceCoordinates}
    =useContext(SourceCoordinates);
    const {destinationCoordinates, setDestinationCoordinates}
    =useContext(DestinationCoordinates);
  return (
    <div>
        {sourceCoordinates.length==0?<Marker
              longitude={userLocation?.long}
              latitude={userLocation?.lat}
              anchor="bottom"
            >
              <img src="./pin.png" className="w-10 h-10" />
        </Marker>:null}
        {/* Source Coordinates */}
        {sourceCoordinates.length!=0?<Marker
              longitude={sourceCoordinates?.long}
              latitude={sourceCoordinates?.lat}
              anchor="bottom"
            >
              <img src="./pin.png" className="w-10 h-10" />
        </Marker>:null}
        {/* Destination Coordinates */}
        {destinationCoordinates.length!=0?<Marker
              longitude={destinationCoordinates?.long}
              latitude={destinationCoordinates?.lat}
              anchor="bottom"
            >
              <img src="./pin.png" className="w-10 h-10" />
        </Marker>:null}
    </div>
  )
}

export default Markers