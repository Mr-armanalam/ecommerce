'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const Layout = ({dnav, orderstatus}) => {
  const {data: session} = useSession();
  return (
    <div>
      {session?.user && 
      <>
        {dnav}
        {orderstatus}
        <div className=' py-5 flex gap-4'>
          <div className='border flex-1'>skjk</div>
          <div className='border flex-1'>ss</div>
        </div>
      </>}
    </div>
  )
}

export default Layout