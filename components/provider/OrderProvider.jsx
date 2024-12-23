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

  return (
    <DataContext.Provider value={{data, setData}}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
