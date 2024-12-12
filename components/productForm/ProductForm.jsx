"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProductForm = ({
  _id,
  title: exisitingTitle,
  description: exisitingDescription,
  price: exisitingPrice,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(exisitingTitle || "");
  const [description, setDescription] = useState(exisitingDescription || "");
  const [price, setPrice] = useState(exisitingPrice || "");

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price };

    if (_id) {
      await fetch("/api/products/", {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({ ...data, _id }),
      }).then(res => {if (res.status === 200) router.push("/products")} );
    } else {
      await fetch("/api/products", {
        headers: {"Content-Type": "application/json",},
        method: "POST",
        body: JSON.stringify(data),
      }).then(res => {if (res.status === 200) router.push("/products")});
    }
    
  }
  return (
    <form onSubmit={saveProduct}>
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
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
