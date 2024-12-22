"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Categories = () => {
  const [editedcategory, setEditedcategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function saveCategory(e) {
    e.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        value: p.value.split(","),
      })),
    };
    if (editedcategory) {
      await fetch("/api/categories/", {
        method: "PUT",
        body: JSON.stringify({ ...data, _id: editedcategory._id }),
      });
      setEditedcategory(null);
    } else {
      await fetch("/api/categories", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      });
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  async function fetchCategories() {
    await fetch("/api/categories", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }

  function editCategory(category) {
    setEditedcategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, value }) => ({
        name,
        value: value.join(","),
      }))
    );
  }

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

  function addProperty() {
    setProperties([...properties, { name: "", value: "" }]);
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValueChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].value = newValues;
      return properties;
    });
  }

  function removeProperty(index) {
    setProperties((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <h1>Categories</h1>
      <label>
        {editedcategory
          ? `Edit category ${editedcategory.name}`
          : "New category name"}
      </label>
      <form onSubmit={(e) => saveCategory(e)}>
        <div className="flex gap-1">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">No parent category</option>
            {categories?.length > 0 &&
              categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            {categories?.length > 0 &&
              categories.map((category,index) => (
                <option key={index}>
                  {/* <td>{category.name}</td> */}
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="btn-default text-sm mb-2 "
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2">
                <input
                  className="mb-0"
                  type="text"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                  placeholder="Property name (example: color)"
                />
                <input
                  className="mb-0"
                  type="text"
                  value={property.value}
                  onChange={(e) =>
                    handlePropertyValueChange(index, property, e.target.value)
                  }
                  placeholder="values, comma separated"
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="btn-default"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedcategory && (
            <button
              type="button"
              onClick={() => {
                setEditedcategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedcategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{(category?.parent?.name || '-')}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
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
      )}
    </>
  );
};

export default Categories;
