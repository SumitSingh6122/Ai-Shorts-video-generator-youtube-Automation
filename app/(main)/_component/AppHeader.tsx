"use client"
import { useAuthContext } from '@/app/provider'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import React from 'react'

const AppHeader = () => {
    const {user} =useAuthContext();
  return (
    <div className='p-3 flex items-center justify-between'>
        <SidebarTrigger/>
        <Image src={user?.pictureUrl || '/'} alt='userImage' height={40} width={40} className='rounded-full'/>
    </div>
  )
}

export default AppHeader