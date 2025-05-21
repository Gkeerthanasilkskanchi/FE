import React from "react";
import { Dashboard } from "./Dashboard";
import { AddProduct } from "./AddProducts";


export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      {/* Section: Dashboard Analytics */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <Dashboard />
      </section>

      {/* Section: Add Product Form */}
      <section className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Add New Product</h2>
        <AddProduct />
      </section>
    </div>
  );
};
