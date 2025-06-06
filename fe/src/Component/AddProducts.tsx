import React, { useEffect, useState } from "react";
import {
  addProduct,

  deleteProduct,
  editProduct,
  getFilteredProduct,
  getProductDeatilsById,
} from "../API/API";
import { Loader } from "./Loader";
type AddProductProps = {
  product?: any;
  onUpdateComplete?: () => void;
};
export const AddProduct: React.FC<AddProductProps> = ({ product, onUpdateComplete }) => {
  const [formData, setFormData] = useState<any>({
    image: "",
    title: "",
    price: "",
    about: "",
    cloth: "",
    category: "",
    bought_by: "",
    saree_type: "",
  });

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await getFilteredProduct({ page: 1 });

      setProducts(res?.data?.data?.products);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: file });
  };

  const resetForm = () => {
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
    setEditingId(null);
    setIsEdit(false);
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

      let response;
      if (isEdit && editingId) {
        form.append("id", formData.id)
        response = await editProduct(form);
        setMessage("✅ Product updated successfully!");
      } else {
        response = await addProduct(form);
        setMessage("✅ Product added successfully!");
      }

      fetchProducts();
      resetForm();
      setShowForm(false);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await getProductDeatilsById(id);
      const product = res.data?.data;
      setFormData(product);
      setIsEdit(true);
      setEditingId(id);
      setShowForm(true);
    } catch (err) {
      console.error("Failed to load product", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
        alert("Product deleted");
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <>
      <Loader loading={loading} />

      <div className="container py-5">
        <div className="text-center mb-4" style={{ float: 'right' }}>
          {!showForm && (
            <button
              className="btn btn-primary "
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <i className="bi bi-plus"></i> Add Product
            </button>
          )}
        </div>
        {showForm && (
          <div className="product-form card border-0 rounded-4 mx-auto my-5" style={{ maxWidth: "600px" }}>
            <div className="card-header d-flex justify-content-between align-items-center bg-gradient text-white" style={{ backgroundColor: "#0d6efd" }}>
              <h5 className="mb-0">{isEdit ? "Edit Product" : "Add New Product"}</h5>
              <button className="btn btn-sm " onClick={() => setShowForm(false)}>
                <i className="bi bi-x cross-icon"></i>
              </button>
            </div>

            <div className="card-body  p-4">
              {message && <div className="alert alert-info">{message}</div>}

              <form onSubmit={handleSubmit}>
                {/* Image Upload */}
                <div className="form-floating-wrapper">
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!isEdit}
                  />
                </div>

                {/* Title & Price */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating-wrapper">
                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                      <label>Title</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating-wrapper">
                      <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                      <label>Price</label>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="form-floating-wrapper">
                  <textarea
                    name="about"
                    className="form-control"
                    rows={3}
                    value={formData.about}
                    onChange={handleChange}

                  />
                  <label htmlFor="about">About</label>
                </div>


                {/* Cloth & Category */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating-wrapper">
                      <input
                        name="cloth"
                        value={formData.cloth}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label>Cloth</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating-wrapper">
                      <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label>Category</label>
                    </div>
                  </div>
                </div>

                {/* Bought By & Saree Type */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating-wrapper">
                      <input
                        name="bought_by"
                        value={formData.bought_by}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label>Bought By</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating-wrapper">
                      <input
                        name="saree_type"
                        value={formData.saree_type}
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label>Saree Type</label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-end gap-3 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-success px-4">
                    {isEdit ? "Update" : "Add"} Product
                  </button>

                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table below form */}
        <div className="table-responsive mt-5 w-100">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((prod, index) => (
                <tr key={prod?.id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>{prod.title}</td>
                  <td>{prod.price}</td>
                  <td>{prod.category}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(prod.id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(prod.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
