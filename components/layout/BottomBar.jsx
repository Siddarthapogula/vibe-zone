'use client'

import { sidebarLinks } from '@constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BottomBar = () => {
  const pathname = usePathname();
  return (
        <div className=' flex  fixed bottom-0 z-20 w-full bg-dark-1 px-5 items-center justify-between md:hidden  gap-2'>
          {sidebarLinks.map((link, index)=>{
            const isActive = pathname == link.route
            return(
              <Link key={link.label} href={link.route} className={`flex gap-2 items-center rounded-lg py-2 px-4 ${isActive && "bg-purple-1"} `} >
                {link.icon}<p className=' text-light-1 font-small-medium max-sm:hidden'>{link.label}</p>
              </Link>
            )
          })}
        </div>
  )
}

export default BottomBar