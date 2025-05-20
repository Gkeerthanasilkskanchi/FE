import React, { useState } from "react";
import { addProduct } from "../API/API";

export const AddProduct = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    price: "",
    about: "",
    cloth: "",
    category: "",
    bought_by: "",
    saree_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Update form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Adjust your backend URL here
      const response = await addProduct(formData);
      setMessage(response.data.message || "Product added successfully!");
      setFormData({
        image: "",
        title: "",
        price: "",
        about: "",
        cloth: "",
        category: "",
        bought_by: "",
        saree_type: "",
      });
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container" style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Add New Product</h2>
      {message && <div style={{ marginBottom: 10 }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="about"
          placeholder="About Product"
          value={formData.about}
          onChange={handleChange}
          required
        />
        <input
          name="cloth"
          placeholder="Cloth"
          value={formData.cloth}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          name="bought_by"
          placeholder="Bought By"
          value={formData.bought_by}
          onChange={handleChange}
          required
        />
        <input
          name="saree_type"
          placeholder="Saree Type"
          value={formData.saree_type}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};


