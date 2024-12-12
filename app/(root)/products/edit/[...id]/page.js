'use client'
import ProductForm from '@/components/productForm/ProductForm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditProductPage = () => {
  const {id} =  useParams();
  const [productInfo, setProductInfo] = useState(null);
  // console.log(id);
  
  useEffect(() => {
    if (!id) return;

    (async function () {
      await fetch(`/api/products?id=${id}`)
       .then(res => res.json())
       .then(product => {
          setProductInfo(product);          
        })
       .catch(err => console.error(err));
    })();
  }, [id])
  
  return (
  <>
    <h1>Edit Product</h1>
    {productInfo &&
    <ProductForm {...productInfo}/>
    }
  </>
  )
}

export default EditProductPage