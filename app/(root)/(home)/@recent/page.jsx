"use client";

import { useData } from "@/components/provider/OrderProvider";
import React, { useEffect, useState } from "react";

const Recent = () => {
  const { data:Orders} = useData();
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
                  {order?.line_items?.map((item, k) => (
                    <p key={k}>$ {item.price_data?.unit_amount}</p>
                  ))}
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
