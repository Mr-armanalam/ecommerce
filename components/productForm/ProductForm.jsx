"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: exisitingTitle,
  description: exisitingDescription,
  price: exisitingPrice,
  images: existingImages,
  category: signedCategory,
  properties: assignedProperties,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(exisitingTitle || "");
  const [description, setDescription] = useState(exisitingDescription || "");
  const [price, setPrice] = useState(exisitingPrice || "");
  const [category, setCategory] = useState(signedCategory || "");
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [images, setImages] = useState(existingImages || []);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function () {
      await fetch(`/api/categories`, { method: "GET" })
        .then((res) => res.json())
        .then((product) => {
          setCategories(product);
        });
    })();
  }, []);

  async function saveProduct(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };

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

  const updateImagesOrder = useCallback((images) => {
    setImages(images);
    // console.log("arguments");
  });

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
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
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p, i) => (
          <div key={i}>
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <select
              value={productProperties[p.name]}
              onChange={(e) => setProductProp(p.name, e.target.value)}
            >
              {p.value.map((v, index) => (
                <option key={index} value={v}>{v}</option>
              ))}
            </select>
          </div>
        ))}
      <label htmlFor="photos">Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-2"
        >
          {!!images?.length &&
            images.map((image, index) => (
              <div key={index} className="w-24 h-24 bg-gray-50 border rounded-lg border-gray-100 p-4 shadow-md">
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
        <label className="w-24 cursor-pointer h-24 flex flex-col items-center 
        justify-center text-sm gap-1 text-blue-900 font-medium rounded-lg bg-gray-50 shadow-md border border-gray-100 "
        >
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
          <div>Add image</div>
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
