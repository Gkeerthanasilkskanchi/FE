import React, { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import { AddProduct } from "./AddProducts";

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Fetch all products
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = async (id: number) => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    setEditingProduct(data);
  };

  const handleDelete = async (id: number) => {
   if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  };

  const handleUpdateComplete = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      {/* Dashboard Analytics */}
      <section>
        <h1 className="text-clip-gradient mb-4">Admin Dashboard</h1>
        <Dashboard />
      </section>

      {/* Add/Edit Product Form */}
      <section className="p-6 rounded-2xl">
        <h2 className="text-clip-gradient mb-4 text-indigo-600">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <AddProduct product={editingProduct} onUpdateComplete={handleUpdateComplete} />
      </section>

      {/* Table View */}
      {/* <section className="p-6 rounded-xl bg-white shadow">
        <h2 className="text-lg font-semibold mb-4">Product List</h2>
        <table className="min-w-full table-auto text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-t">
                <td className="p-2">{prod.title}</td>
                <td className="p-2">{prod.category}</td>
                <td className="p-2">₹{prod.price}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(prod.id)}
                    title="Edit"
                  >
                     <i className="bi bi-edit"></i>
                  </button>
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => handleDelete(prod.id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}
    </div>
  );
};
