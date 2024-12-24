'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
    
    useEffect(() => {
      (async () => {
        await fetch("api/orders", { method: "GET" })
          .then((response) => response.json())
          .then((orders) => {
            setData(orders);
          });
      })();
    }, []);

    const totalAmounts = data?.map((order) => {
      let totalAmount = 0;
      order.line_items.forEach((item) => {
        totalAmount += (item.price_data.unit_amount * item.quantity)/100;
      });
      return totalAmount;
    });

  return (
    <DataContext.Provider value={{data, setData, totalAmounts}}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
