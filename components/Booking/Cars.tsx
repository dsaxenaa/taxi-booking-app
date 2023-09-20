import React, { useContext, useState } from 'react'

import CarsList from '@/data/CarsList'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import Image from 'next/image'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'

const Cars = () => {
    const [selectedCar, setSelectedCar] = useState<any>()
    const { directionData, setDirectionData } = useContext(DirectionDataContext);
    const {carAmount, setCarAmount} = useContext(SelectedCarAmountContext)
    const getCost=(charges:any)=>{
        return(charges*directionData.routes[0].distance*0.000621371192).toFixed(2)
    }
    
  return (
    <div className='mt-3'>
        <h2 className='font-semibold'>Select Car</h2>
        <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
            {CarsList.map((item,index)=>{
                return(
                    <div key={index} className={`m-3 p-3 border-[2px] rounded-md hover:border-yellow-300 hover:scale-110 transition-all cursor-pointer
                    ${index==selectedCar? 'border-yellow-500 border-[3px]':null}`}
                    onClick={()=>{setSelectedCar(index);
                    setCarAmount(getCost(item.charges))}}>
                        <Image src={item.image}
                        alt={item.name}
                        width={50}
                        height={70}
                        className='w-full'/>
                        <h2 className='text-[15px]'>{item.name}
                        {directionData.routes?
                        <span className='float-right font-medium'>${getCost(item.charges)}</span>:null}
                        </h2>
                    </div>   
                )
            })}
        </div>
    </div>
  )
}
export default Cars