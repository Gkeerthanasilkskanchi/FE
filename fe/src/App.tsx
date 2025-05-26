import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { About } from "./Component/About";
import { AdminDashboard } from "./Component/AdminDashboard";
import { Contact } from "./Component/Contact";
import { Home } from "./Component/Home";
import { Layout } from "./Component/Layout";
import { ProductList } from "./Component/ProductList";
import { Products } from "./Component/Products";
const role = localStorage.getItem("role"); 

function AppRouter() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          {role === "admin" ? (
            <Route index element={<AdminDashboard />} />
          ) : (
            <>
              <Route index element={<Products />} />
              <Route path="home" element={<Home />} />
              <Route path="contact-us" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="products/:type" element={<ProductList />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
