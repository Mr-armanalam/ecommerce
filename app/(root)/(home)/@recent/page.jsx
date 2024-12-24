"use client";

import { useData } from "@/components/provider/OrderProvider";
import React from "react";

const Recent = () => {
  const { data: Orders, totalAmounts } = useData();

  return (
    <div>
      <h1>Recent Payments</h1>
      <div>
        <table className="basic font-semibold">
          <thead>
            <tr>
              <td>Customer name</td>
              <td className="max-w-80">Products</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {Orders.slice(0, 3)?.map((order, index) => (
              <tr key={index} className="text-sm text-gray-600 ">
                <td>{order?.name}</td>
                <td>
                  {order?.line_items?.map((item, k) => (
                    <p key={k}>{item.price_data?.product_data?.name}</p>
                  ))}
                </td>
                <td className="text-green-700"> 
                  {/* for showing individual added amount */}
                  {/* {order?.line_items?.map((item, k) => (
                    <p key={k}>$ {item.price_data?.unit_amount}</p>
                  ))} */}
                  ${totalAmounts[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recent;
