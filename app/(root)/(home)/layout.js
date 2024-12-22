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
      </>}
    </div>
  )
}

export default Layout