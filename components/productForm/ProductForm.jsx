"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Spinner from "../Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: exisitingTitle,
  description: exisitingDescription,
  price: exisitingPrice,
  images: existingImages,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(exisitingTitle || "");
  const [description, setDescription] = useState(exisitingDescription || "");
  const [price, setPrice] = useState(exisitingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [uploading, setUploading] = useState(false);

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price, images };

    if (_id) {
      await fetch("/api/products/", {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({ ...data, _id }),
      }).then((res) => {
        if (res.status === 200) router.push("/products");
      });
    } else {
      await fetch("/api/products", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) router.push("/products");
      });
    }
  }

  async function uploadImages(e) {
    const files = e.target?.files;

    if (files.length > 0) {
      setUploading(true);
      const formData = new FormData();
      for (const file of files) {
        formData.append("file", file);
      }

      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setImages((OldImages) => [...OldImages, data.url]);
        });
      setUploading(false);
    }
  }

  function updateImagesOrder (images) {
    setImages(images);        
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
      <label htmlFor="photos">Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable 
        list={images} 
        setList={updateImagesOrder}
        className="flex flex-wrap gap-1"
        >
          {!!images?.length && images.map((image, index) => (
            <div key={index} className="w-20 h-24">
              <img
                src={image}
                alt="Product image"
                className=" h-full rounded-md "
              />
            </div>
          ))}
        </ReactSortable>
        {uploading && (
          <div className="h-24 flex items-center ">
            <Spinner />
          </div>
        )}
        <label className="w-24 cursor-pointer h-24 flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
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
