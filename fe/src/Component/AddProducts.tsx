import React, { useState } from "react";
import { addProduct } from "../API/API";
// import { FaPlus, FaTimes, FaSpinner } from "react-icons/fa";

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
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
    form.append("image", formData.image); 
    form.append("title", formData.title);
    form.append("price", formData.price);
    form.append("about", formData.about);
    form.append("cloth", formData.cloth);
    form.append("category", formData.category);
    form.append("bought_by", formData.bought_by);
    form.append("saree_type", formData.saree_type);

    const response = await addProduct(form);
      setMessage(response.data.message || "✅ Product added successfully!");
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
      setShowForm(false);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e:any) => {
  const file = e.target.files[0];
  if (file) {
    // Option 1: Store file for uploading to backend
    setFormData({ ...formData, image: file });
    };
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        {!showForm && (
          <button
            className="btn btn-outline-primary btn-lg d-flex align-items-center mx-auto gap-2"
            onClick={() => setShowForm(true)}
          >
            <i className="bi bi-plus"></i> Add Product
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mx-auto" style={{ maxWidth: "700px" }}>
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">New Product Form</h5>
            <button
              className="btn btn-sm btn-light"
              onClick={() => setShowForm(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="card-body p-4">
            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Select Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                  required
                />
              </div>


              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label className="form-label">Price</label>
                  <input
                    name="price"
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">About Product</label>
                <textarea
                  name="about"
                  className="form-control"
                  rows={3}
                  value={formData.about}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Cloth Type</label>
                  <input
                    name="cloth"
                    className="form-control"
                    value={formData.cloth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label className="form-label">Category</label>
                  <input
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Bought By</label>
                  <input
                    name="bought_by"
                    className="form-control"
                    value={formData.bought_by}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label className="form-label">Saree Type</label>
                  <input
                    name="saree_type"
                    className="form-control"
                    value={formData.saree_type}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-success px-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      {/* <FaSpinner className="me-2 spin" /> */}
                      Adding...
                    </>
                  ) : (
                    <>
                      {/* <FaPlus className="me-2" /> */}
                      Add Product
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
