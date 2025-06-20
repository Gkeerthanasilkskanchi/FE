import React, { useEffect, useState } from "react";
import {
  addProduct,

  deleteProduct,
  editProduct,
  getFilteredProduct,
  getProductDeatilsById,
} from "../API/API";
import { toast } from "react-toastify";
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
  const [editingId, setEditingId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");


  const fetchProducts = async (page = 1, keyword = "") => {
    try {
      setLoading(true);
      const res: any = await getFilteredProduct(page, keyword);

      setProducts(res?.data?.data?.products);
      setTotalPages(Math.ceil(res?.data?.data?.total / 10));
      setCurrentPage(page);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts(currentPage, searchKeyword);
  }, [currentPage, searchKeyword]);


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


      if (isEdit && editingId) {
        form.append("id", formData.id)
        await editProduct(form);
        toast.success(" Product updated successfully!", { autoClose: 1000 });
      } else {
        await addProduct(form);
        toast.success(" Product added successfully!", { autoClose: 1000 });
      }

      fetchProducts();
      resetForm();
      setShowForm(false);
    } catch (error: any) {
      toast.error(error?.message, { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const res = await getProductDeatilsById(id);
      const product = res.data;


      if (!product || !product.title) {
        console.error("Product data is invalid:", product);
        return;
      }

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
        toast.success("Product Deleted!", { autoClose: 1000 });
      } catch (err) {
        console.error("Delete failed", err);
        toast.error("Failed to delete the product", { autoClose: 1000 })
      }
    }
  };

  return (
    <>
      <Loader loading={loading} />

      <div className="container py-5">
       <div className="d-flex justify-content-between align-items-center flex-wrap flex-sm-nowrap mb-3 gap-2">
  <input
    type="text"
    className="form-control custom-search-input"
    placeholder="Search..."
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
  />

  {!showForm && (
    <button
      className="btn btn-primary custom-add-btn"
      onClick={() => {
        resetForm();
        setShowForm(true);
      }}
    >
      <i className="bi bi-plus me-1"></i> Add Product
    </button>
  )}
</div>




        {showForm && (
          <div className="product-form card border-0 rounded-4 mx-auto my-5 w-100" style={{ maxWidth: "600px" }}>
            <div className="card-header d-flex justify-content-between align-items-center text-white flex-wrap" style={{ backgroundColor: "#0d6efd", padding: "0.75rem 1rem", gap: "0.5rem" }}>
              <h5 className="mb-0" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>
                {isEdit ? "Edit Product" : "Add New Product"}
              </h5>
              <button className="btn btn-sm text-white" onClick={() => setShowForm(false)} style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", padding: "0.25rem 0.5rem" }}>
                <i className="bi bi-x cross-icon"></i>
              </button>
            </div>
            <div className="card-body p-4">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Choose Image</label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!isEdit}
                  />
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="title" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                      <label htmlFor="title">Title</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                      <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="form-control" placeholder="Price" required />
                      <label htmlFor="price">Price</label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control" placeholder="About this product" id="about" name="about" value={formData.about} onChange={handleChange} style={{ height: '100px' }}></textarea>
                  <label htmlFor="about">About</label>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                      <input id="cloth" name="cloth" placeholder="Cloth" type="text" value={formData.cloth} onChange={handleChange} className="form-control" />
                      <label htmlFor="cloth">Cloth</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                      <input id="category" name="category" type="text" value={formData.category} onChange={handleChange} className="form-control" placeholder="Category" />
                      <label htmlFor="category">Category</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                      <input id="bought_by" type="text" name="bought_by" value={formData.bought_by} onChange={handleChange} className="form-control" placeholder="Bought By" />
                      <label htmlFor="bought_by">Bought By</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-floating mb-3">
                      <input id="saree_type" name="saree_type" type="text" value={formData.saree_type} onChange={handleChange} className="form-control" placeholder="Saree Type" />
                      <label htmlFor="saree_type">Saree Type</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-3 mt-4 action-buttons">
                  <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success px-4">{isEdit ? "Update" : "Add"} Product</button>
                </div>


              </form>
            </div>
          </div>
        )}

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
                  <td>{index + 1}</td>
                  <td>{prod.title}</td>
                  <td>{prod.price}</td>
                  <td>{prod.category}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(prod.id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}

              {products?.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="d-flex justify-content-center my-3">
              <nav>
                <ul className="pagination">
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`} onClick={() => fetchProducts(i + 1, searchKeyword)}>
                      <button className="page-link">{i + 1}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
