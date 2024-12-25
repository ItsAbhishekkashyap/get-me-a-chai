"use client"
import React, { useEffect, useState } from 'react';
import Script from 'next/script';

import connectDB from '@/db/connectDb';
import { useSession } from 'next-auth/react';
import { fetchuser, fetchpayments, initiate } from '@/actions/useraction';

const PaymentPage = ({username}) => {
  // const {data: session} = useSession
  const [paymentform, setPaymentform] = useState({})
  const [currentuser, setCurrentuser] = useState({})
  const [payments, setPayments] = useState([])

  useEffect(() => {
    getData()
  }, [])
  

  const handleChange = (e) => {
    setPaymentform({...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username)
    setCurrentuser(u)
    console.log(currentuser)
    let dbpayments = await fetchpayments(username)
    setPayments(dbpayments)
    console.log(dbpayments)
  }

  const pay = async (amount) => {
    // Get the order ID

    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    var options = {
      "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Get Me A Chai", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
  },
        "notes": {
          "address": "Razorpay Corporate Office"
  },
        "theme": {
          "color": "#3399cc"
  }
};
        var rzp1 = new Razorpay(options);
        
          rzp1.open();
       
    
  }




  return (
    <>

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      


      <div className='cover relative text-white w-full '>

        <img className='object-cover w-full h-[350]' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo2MjAsIndlIjoxfQ%3D%3D/16.gif?token-time=1725408000&token-hash=wq5ivWXu9Iaw8f7kPO8-AGTz8exbg5dVqq2GgdLgZWw%3D" alt="" />
        <div className="absolute -bottom-20 right-[48%] items-center justify-center border-white border-2 rounded-full    ">
          <img className='bg-cover rounded-full' width={150} height={150} src="https://img.freepik.com/premium-photo/poster-movie-spiderman_1084624-429.jpg?w=740" alt="" />
        </div>
      </div>
      <div className="info flex flex-col gap-2 justify-center items-center my-24">
        <div className='font-bold text-lg'>

          @{username}
        </div>
        <div className='text-slate-400'>
          Creating animated art for VITs
        </div>
        <div className='text-slate-400'>
          9719 members. 82 posts. $15,450/release
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10">
            {/* Show list of all the supporters as a leaderboard */}
            <h2 className='text-2xl  font-bold my-5'>Supporters</h2>
            <ul className='mx-4 text-lg'>
              {payments.length == 0 && <li>No payments yet</li>}
              {payments.map((p,i) => {
                return  <li key={i} className='my-4 flex gap-2 items-center'>
                  
                 <img width={33} src="user.gif" alt="user" /> 
                <span>{p.name} donated <span className='font-bold'>₹{(Number.parseInt(p.amount)/100)}</span>  with a message "{p.message}"</span> </li>
              })}

             
             

            </ul>
          </div>
          <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-700 ' placeholder='Enter name' />
              <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-700 ' placeholder='Enter message' />
              <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-700 ' placeholder='Enter Amount' />
              <button onClick={() => pay(Number.parseInt(paymentform.amount)*100)} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Pay</button>
            </div>
            {/* or choose form those amount */}
            <div className='flex gap-2 mt-5'>
              <button className='bg-slate-700 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
              <button className='bg-slate-700 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
              <button className='bg-slate-700 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>

            </div>
          </div>
        </div>
      </div>



    </>
  );
}

export default PaymentPage;
