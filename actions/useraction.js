"use server"
import React from "react"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDB()
        var instance = new Razorpay({key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret:
            process.env.KEY_SECRET
        })
    
        // instance.orders.create({
        //     amount: 50000,
        //     currency:"INR",
        //     receipt: "receipt#1",
        //     notes: {
        //         key1: "value3",
        //         key2: "value2"
        //     }
        // })
    
        let options = {
            amount: Number.parseInt(amount),
            currency: "INR",
        }
    
        let x = await instance.orders.create(options);
        // create a payment object which shows a pending payment in the database
        await Payment.create({oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message:paymentform.message})
        return x
    } catch (error) {
        console.error('Error initiating payment:', error);
        throw new Error('Failed to initiate payment');
    }
   
}

export const fetchuser = async (username) => {
 
        await connectDB()
        console.log(username)
        let u = await User.findOne({username: username})

        let user = u.toObject({flattenObjectIds: true})
        return user
   
   
   
}

export const fetchpayments = async (username) => {
    try {
        await connectDB()
        // find all payments sorted by decresing no of amounts
        let p = await Payment.find({to_user: username, done:true}).sort({amount: -1}).lean()
    
        return p
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw new Error('Failed to fetch payments');
    }
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data) 
    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username){

        let u = await User.findOne({username: ndata.username})
        if (u){
            return {error: "username already exists"}
        }
    }

    await User.updateOne({email: ndata.email}, ndata)
}