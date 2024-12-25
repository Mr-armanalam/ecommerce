"use client";
import React, { useEffect, useState } from "react";

const Trend = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function getProducts() {
      await fetch("api/products", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          const sorted = [...data].sort((a, b) => b.sells - a.sells);
          setOrders(sorted);
        });
    }
    getProducts();
  }, []);

  return (
    <div>
      <h1>Trending Items</h1>
      <div>
        <table className="basic font-semibold">
          <thead>
            <tr>
              <td>Product's name</td>
              <td>sells</td>
              <td>Available items</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) =>
              index <= 2 && (
                <tr key={index} className="text-sm text-gray-700 ">
                  <td>{order.title}</td>
                  <td>{order.sells}</td>
                  <td>{order.totalItem - order.sells}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trend;
