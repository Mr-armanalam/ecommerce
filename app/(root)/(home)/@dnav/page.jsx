"use client";
import { useData } from "@/components/provider/OrderProvider";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaCaretUp } from "react-icons/fa";

const Dnav = () => {
  const { data: session } = useSession();
  const { totalAmounts } = useData();  

  // const latestAmount = (Orders[0]?.line_items[0]?.price_data?.unit_amount/100) ;
  const latestAmount = totalAmounts[0]
  
  return (
    <div className="flex text-blue-900 justify-between">
      <div>
        <p className="font-semibold text-sm">Total Revenue</p>
        <div className="flex gap-1">
          <span className="text-2xl font-bold">$ 0{session?.user?.totalRevenue}.00</span>
          <div className="inline-flex mt-auto mb-1 text-green-700">
            <FaCaretUp />
            <span className="text-xs font-semibold">${latestAmount}</span>
          </div>
        </div>
      </div>
      <div className="flex h-fit bg-blue-900 text-white rounded-3xl overflow-hidden">
        <Image
          src={session?.user?.image || ""}
          width={35}
          height={30}
          alt="avatar"
          className="border-2 border-blue-900 rounded-full object-contain "
        />
        <span className="py-2 text-sm font-semibold pl-2 pr-4">
          {session?.user?.name}
        </span>
      </div>
    </div>
  );
};

export default Dnav;
