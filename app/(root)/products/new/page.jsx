"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  

  async function createProduct(e) {
    e.preventDefault();
    const data = {title, description, price}
    const res = await fetch('/api/products', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
    const Responsedata = await res.json();
    // console.log(Responsedata);
    // console.log(res);
    
    if (res.status === 200) {
      router.push("/products");
    }
  }
  return (
    <form onSubmit={createProduct}>
      <h1>New Product</h1>
      <label htmlFor="pname">Product name</label>
      <input
        type="text"
        id="pname"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="price">Price (in USD)</label>
      <input
        type="number"
        id="price"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">Save</button>
    </form>
  );
};

export default page;
