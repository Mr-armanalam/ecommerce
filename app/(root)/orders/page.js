'use client'
import React, { useEffect } from 'react'

const Order = () => {
  useEffect(() =>{},[]);
  return (
    <>
      <h1>Order</h1>
      <table className='basic'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipients</th>
            <th>Products</th>
          </tr>
        </thead>
      </table>
    </>
  )
}

export default Order