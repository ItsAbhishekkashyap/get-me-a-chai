"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import Dashboard from '@/components/Dashboard'


const dashboard = () => {
  const { data: session, status } = useSession()
     if(!session) {
        const router = useRouter()
        router.push('/login')
  }
  return (
    <div>
      <Dashboard/>
    </div>
  )
}

export default dashboard
