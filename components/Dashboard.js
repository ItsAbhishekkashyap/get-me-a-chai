"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchuser, updateProfile } from '@/actions/useraction';



const Dashboard = () => {
    const {data: session, update} = useSession()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        profilepic: '',
        coverpic: '',
        razorpayid: '',
        razorpaysecret: ''
    })


    useEffect(() => {
      getData()
      if(!session){
        router.push('/login')
      }
    }, [router, session])

    const getData = async () => {
      let u = await fetchuser(session.user.name)
      setFormData(u)
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})

    }


    const handleSubmit = async (e) => {
      
       let a = await updateProfile(e, session.user.name)
       alert("profile updated")
      };
    
  return (
    <div className=" w-1/2 mx-auto bg-slate-800 shadow-lg rounded-lg p-8 mt-10">
    <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
    <form action={handleSubmit}>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent  rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your username"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="profilePic">
          Profile Picture Link
        </label>
        <input
          type="url"
          id="profilepic"
          name="profilepic"
          value={formData.profilepic}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your profile picture URL"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="coverPic">
          Cover Picture Link
        </label>
        <input
          type="url"
          id="coverpic"
          name="coverpic"
          value={formData.coverpic}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your cover picture URL"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="razorpayId">
          Razorpay ID
        </label>
        <input
          type="text"
          id="razorpayid"
          name="razorpayid"
          value={formData.razorpayid}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your Razorpay ID"
        />
      </div>

      <div className="mb-6">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="razorpaySecret">
          Razorpay Secret
        </label>
        <input
          type="password"
          id="razorpaysecret"
          name="razorpaysecret"
          value={formData.razorpaysecret}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your Razorpay Secret"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
        >
          Save
        </button>
      </div>
    </form>
  </div>
  );
}

export default Dashboard;
