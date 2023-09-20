import React, { useState } from 'react'

import CardsList from '@/data/CardsList'
import Image from 'next/image'

const Cards = () => {

    const [card, setCard] = useState<any>()

  return (
    <div className='mt-3'>
        <h2 className='font-semibold'>Select Payment</h2>
        <div className='grid grid-cols-5 mt-2 md:grid-cols-2 lg:grid-cols-5 sm:grid-cols-2'>
            {
                CardsList.map((item, index)=>{
                    return(
                        <div key={index} className={`w-[70px] m-3 p-1 border-[2px] flex items-center  rounded-md hover:border-red-300 hover:scale-110 transition-all cursor-pointer
                        ${index==card? 'border-red-500 border-[3px]':null}`}
                        onClick={()=>{setCard(index)}}>
                            <Image src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            />
                        </div>    

                    )
                })
            }
            
        </div>
    </div>
  )
}

export default Cards