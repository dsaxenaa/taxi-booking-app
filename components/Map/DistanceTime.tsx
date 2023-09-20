import React, { useContext } from 'react'

import { DirectionDataContext } from '@/context/DirectionDataContext';

const DistanceTime = () => {
    const { directionData, setDirectionData } = useContext(DirectionDataContext);
  return (
    (directionData?.routes ?( 
    <div className='bg-yellow-600 p-3'>
        <h2 className='text-yellow-100 opacity-80 text-[20px]'>
            Distance: <span className='font-bold mr-3 text-black'>{((directionData.routes[0].distance/1000).toFixed(2))} Km</span>
            Duration: <span className='font-bold mr-3 text-black'>{(directionData.routes[0].duration/60).toFixed(2)} Min</span>
        </h2>
    </div>
    ): null)
  )
}

export default DistanceTime