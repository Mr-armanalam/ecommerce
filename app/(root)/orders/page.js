'use client'
import React, { useEffect, useState } from 'react'

const Order = () => {
  const [orders, setOrders]= useState([]);
  useEffect(() =>{
    (async function () {
      await fetch('/api/orders', {method: 'GET'})
      .then(response => response.json())
      .then(order => {
        // console.log(order);
        setOrders(order)
      });
    })();
  },[]);
  
  return (
    <>
      <h1>Order</h1>
      <table className='basic'>
        <thead>
          <tr>
            <th className='text-left' >Date</th>
            <th className='text-left'>Paid</th>
            <th className='text-left '>Recipients</th>
            <th className='text-left' >Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map((order => (
            <tr key={order._id} className='text-wrap text-sm font-semibold text-gray-600'>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td className={`${order.paid ? 'text-green-600': 'text-red-600'}`}>{order.paid? 'Yes' : 'No'}</td>
              <td >
                name: {order.name} <br />
                email: {order.email} <br />
                address: {order.city} {","} {order.postalCode} 
                {","} {order.landmark} 
                {","} {order.country}
              </td>
              <td>
                {order.line_items.map((l, index) => (
                <p key={index}>{l.price_data.product_data.name} x {l.quantity}</p>
              ))}</td>
            </tr>
          )))}
        </tbody>
      </table>
    </>
  )
}

export default Order