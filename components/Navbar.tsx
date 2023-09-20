import Image from 'next/image'
import React from 'react'
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className='flex justify-between p-3 px-10 shadow-md border-b-[2px]'>
        <div className='flex gap-10 items-center'>
        <Image src='/image1.jpg'
        alt='logo'
        width={220}
        height={50}
        />
        <div className='hidden md:flex gap-6'>
            <h2 className='hover:bg-red-200 p-2 rounded-lg cursor-pointer transition-all'>Home</h2>
            <h2 className='hover:bg-red-200 p-2 rounded-lg cursor-pointer transition-all'>History</h2>
            <h2 className='hover:bg-red-200 p-2 rounded-lg cursor-pointer transition-all'>Help</h2>
        </div>
    </div>
    <div className='py-5'>
    <UserButton afterSignOutUrl="/"/>
    </div>
    </div>
  )
}

export default Navbar