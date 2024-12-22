import OrderStatusBox from '@/components/dashboard/OrderStatusBox'
import React from 'react'


const page = () => {
  return (
    <section className='mt-9 flex gap-8'>
      <OrderStatusBox status={'Shipped'} BgIcon={"truck"} value={76} bgColor={'from-[#6BAAFC] to-[#305FEC]'} />
      <OrderStatusBox status={'Pending'} BgIcon={'cart'} value={12} bgColor={'from-[#E75890] to-[#D9423E]'} />
      <OrderStatusBox status={'New'} BgIcon={'bag'} value={45} bgColor={'from-[#D623FE] to-[#A530F2]'} />
    </section>
  )
}

export default page