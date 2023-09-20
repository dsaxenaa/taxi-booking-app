"use client"

import React, { useContext } from 'react'

import CheckoutForm from '@/components/Payment/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'
import { loadStripe } from '@stripe/stripe-js'

const Payment = () => {
    // const {carAmount, setCarAmount} = useContext(SelectedCarAmountContext)
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any)
    const options:any={
        mode:'payment',
        amount:100,
        currency:'usd'
    }
  return (
    <Elements stripe={stripePromise} options={options}>
        <CheckoutForm/>
    </Elements>
  )
}

export default Payment