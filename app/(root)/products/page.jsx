'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async() => {
    const res = await fetch('/api/products',{
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',     
    })
    await res.json().then((data) => {
      setProducts(data)
    })
  }
    fetchProduct()
  },[])
  return (
    <>
      <Link className='bg-blue-900 text-white rounded-md py-1 px-2' href={"/products/new"}>Add new product</Link>
      <table className='basic'>
        <thead>
          <tr>
            <td>Product</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {product.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                buttons
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default page