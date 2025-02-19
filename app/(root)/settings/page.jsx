"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Settings = () => {
  const [product, setProduct] = useState("");
  const [parentCategory, setParentCategory] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // async function saveCategory(e) {
  //   e.preventDefault();
  //   const data = {
  //     parentCategory,
  //     properties: properties.map((p) => ({
  //       name: p.name,
  //       value: p.value.split(","),
  //     })),
  //   };
  //   if (editedcategory) {
  //     await fetch("/api/categories/", {
  //       method: "PUT",
  //       body: JSON.stringify({ ...data, _id: editedcategory._id }),
  //     });
  //     setEditedcategory(null);
  //   } else {
  //     await fetch("/api/categories", {
  //       headers: { "Content-Type": "application/json" },
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     });
  //   }
  //   setName("");
  //   setParentCategory("");
  //   setProperties([]);
  //   fetchCategories();
  // }

  async function fetchCategories() {
    await fetch("/api/trendingProduct", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.category);
        setTrendingProducts(data.trProduct)
      });
  }

  console.log(trendingProducts);
  

  function deleteCategory(category) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${category.name}`,
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d55",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`/api/categories?_id=${category._id}`, {
          method: "DELETE",
        });
        Swal.fire({
          title: "Deleted!",
          text: `${category.name} has been deleted.`,
          icon: "success",
        });
        fetchCategories();
      }
    });
  }

  const addTrendingProduct = async (e) => {
    e.preventDefault();
    await fetch(`/api/trendingProduct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product }),
    })
      .then(async (result) => result.json())
      .then((data) =>
        setTrendingProducts((prevTrendingProducts) => [
          ...prevTrendingProducts,
          data,
        ])
      );
  };

  return (
    <>
      <h1>Settings</h1>
      <label>Add Trending Products</label>
      <form
        onSubmit={(e) => {
          addTrendingProduct(e);
        }}
      >
        <div className="flex gap-1 mt-1">
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">No parent category</option>
            {allProducts?.length > 0 &&
              allProducts.map((product, index) => (
                <option value={index} key={product._id}>
                  {product.name}
                </option>
              ))}
          </select>

          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="">No Product</option>
            {allProducts?.at(parentCategory)?.children?.length > 0 &&
              allProducts?.at(parentCategory).children.map((product) => (
                <option value={product._id} key={product._id}>
                  {product.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-2">
          <button type="submit" className="btn-default text-sm mb-2 ">
            Add Product
          </button>
        </div>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Product Name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {trendingProducts?.length > 0 &&
            trendingProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product?.parent?.name || "-"}</td>
                <td>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Settings;
