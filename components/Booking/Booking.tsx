"use client";

import React, { useContext, useEffect, useState } from "react";

import AutoCompleteAddress from "./AutoCompleteAddress";
import Cards from "./Cards";
import Cars from "./Cars";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { useRouter } from "next/navigation";

const Booking = () => {
  const [screenHeight, setscreenHeight] = useState(0);
  const {carAmount, setCarAmount} = useContext(SelectedCarAmountContext)
  const router:any = useRouter()
  useEffect(() => {
    setscreenHeight(window.innerHeight);
  }, []);
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[2px] p-5 rounded-md">
        <AutoCompleteAddress />
        <Cars />
        <Cards />
        <div className="mt-5 flex justify-center items-center">
          {carAmount?<button className={`w-full bg-yellow-300 p-1 rounded-md mt-3 hover:scale-105 transition-all`} onClick={()=>router.push('/payment')}>
            BOOK
          </button>:
          // <button className={`w-[150px] bg-gray-300 p-1 rounded-md mt-3 `}>
          //   BOOK
          // </button>
          null
          }
        </div>
      </div>
    </div>
  );
};
export default Booking;
