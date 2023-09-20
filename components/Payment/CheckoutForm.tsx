import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js"

import React from 'react'

const CheckoutForm = () => {
    const stripe:any = useStripe();
    const elements = useElements()
    const handleSubmit =async(event:any)=>{
        event.preventDefault()
        if(elements==null){
            return;
        }
        const {error:submitError} = await elements.submit();
        if(submitError){
            return;
        }
        const res = await fetch("/api/create-intent",{
            method:"POST",
            body: JSON.stringify({
                amount: 58,
            })
        })
        const secretKey = await res.json()
        console.log(secretKey)
        const {error} = await stripe.confirmPayment({
            clientSecret: secretKey,
            elements,
            confirmParams:{
                return_url:"http://localhost:3000/"
            }
        })
    }
  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
        <form onSubmit={handleSubmit} className="max-w-md">
            <PaymentElement/>
            <button className="w-full bg-yellow-400 p-2 rounded-md mt-2 " type="submit" disabled={!stripe || !elements}>PAY</button>
        </form>
    </div>
  )
}

export default CheckoutForm