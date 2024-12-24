'use client'
import OrderStatusBox from '@/components/dashboard/OrderStatusBox'
import { useData } from '@/components/provider/OrderProvider'
import React from 'react'


const page = () => {
  const {data: Orders} = useData();
  
  function getOrderStatus (type, Orders) {
    const TOrders = Orders?.filter(item => item.status === type);
    if (!TOrders) return '00';
    if (TOrders.length <= 9 ) return `0${TOrders.length}`
    return TOrders?.length
  }
  
  return (
    <section className='mt-9 flex gap-8'>
      <OrderStatusBox status={'Delevered'} BgIcon={"bag"} value={getOrderStatus('delevered',Orders)} bgColor={'from-[#6BAAFC] to-[#305FEC]'} />
      <OrderStatusBox status={'Shipped'} BgIcon={'truck'} value={getOrderStatus('shipped',Orders)} bgColor={'from-[#E75890] to-[#D9423E]'} />
      <OrderStatusBox status={'New'} BgIcon={'cart'} value={getOrderStatus('new', Orders)} bgColor={'from-[#D623FE] to-[#A530F2]'} />
    </section>
  )
}

export default page