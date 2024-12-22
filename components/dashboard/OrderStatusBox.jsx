import React from 'react';
import { FaTruck } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";


const OrderStatusBox = ({bgColor, status, BgIcon, value}) => {
  return (
    <div className={`flex pl-8 relative flex-1 justify-between bg-gradient-to-r ${bgColor} p-5 h-fit border rounded-2xl`}>
      <span className='absolute bottom-0 transform pb-2 opacity-15 text-white -rotate-12'>
        {BgIcon=== 'truck' && <FaTruck size={70} />}
        {BgIcon=== 'cart' && <FaCartShopping size={70} />}
        {BgIcon=== 'bag' && <GiShoppingBag size={70} />}
      </span>
      <h1 className='font-bold text-white text-lg'>{status} Orders</h1>
      <h1 className='text-white mr-4 text-6xl mt-4'>{value}</h1>
    </div>
  )
}

export default OrderStatusBox