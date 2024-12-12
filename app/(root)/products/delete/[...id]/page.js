'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DeleteProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return ;
    (async function () {
      await fetch(`/api/products?id=${id}`)
      .then(res => res.json())
      .then(responsedata => setProductInfo(responsedata));
    })();
  },[id]);

  function goBack() {
    router.push('/products');
  }
  
  async function deleteProduct() {
    await fetch(`/api/products?id=${id}`, {method: 'DELETE'});
    goBack();
  }
  return (
    <>
      <h1 className='text-center'>Do you really want to delete product <b className='italic'>{productInfo?.title}</b> ?</h1>
      <div className='flex gap-2 justify-center'>
        <button onClick={deleteProduct} className='btn-red'>Yes</button>
        <button className='btn-default' onClick={goBack}>No</button>
      </div>
    </>
  )
}

export default DeleteProductPage