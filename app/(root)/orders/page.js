'use client'
import { useData } from '@/components/provider/OrderProvider';
import React, { useState, useEffect } from 'react'

const Order = () => {
  const { data: orders } = useData();
  const [orderList, setOrderList] = useState([]);
  
  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const handleOrderStatus = async ({_id, productsIds}) => {
    console.log(_id, productsIds ); 
    await fetch('api/orders', {
      method: 'PUT',
      body: JSON.stringify({ _id, productsIds }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then((data) => {
      if (data.success ) { 
        setOrderList(prevOrders =>
          prevOrders.map(order =>
            order._id === _id ? { ...order, status: 'shipped' } : order
          )
        );
      }
    });
  };

  return (
    <>
      <h1>Order</h1>
      <table className='basic'>
        <thead>
          <tr>
            <th className='text-left'>Date</th>
            <th className='text-left'>Paid</th>
            <th className='text-left'>Recipients</th>
            <th className='text-left'>Products</th>
            <th className='text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderList.length > 0 && orderList.map((order) => (
            <tr key={order._id} className='text-wrap text-sm font-semibold text-gray-600'>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td className={`${order.paid ? 'text-green-600' : 'text-red-600'}`}>{order.paid ? 'Yes' : 'No'}</td>
              <td>
                name: {order.name} <br />
                email: {order.email} <br />
                address: {order.city}, {order.postalCode} 
                {order.landmark && `, ${order.landmark}`} 
                , {order.country}
              </td>
              <td>
                {order.line_items.map((l, index) => (
                  <p key={index}>{l.price_data.product_data.name} x {l.quantity}</p>
                ))}
              </td>
              <td className='text-xs'>
                {order?.status === 'new' && (
                  <button 
                    onClick={() => handleOrderStatus({_id: order._id, productsIds: order.products})} 
                    className='bg-green-600 px-2 py-1 rounded text-white'>
                    Accept
                  </button>
                )}
                {order?.status !== 'new' && (
                  <span className={`${order.status === 'shipped' ? 'text-yellow-800' : 'text-gray-700 font-bold'}`}>
                    {order?.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Order;
