import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Products } from './Component/Products';
import { Layout } from './Component/Layout';
import { Contact } from './Component/Contact';
import { Home } from './Component/Home';
import { About } from './Component/About'; 
import { ToastContainer } from "react-toastify";
import { ProductList } from './Component/ProductList';
import { AdminDashboard } from './Component/AdminDashboard';

function App() {
  const role = sessionStorage.getItem("role");

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          {role === "admin" ? (
            <Route path="" element={<AdminDashboard />} />
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

export default App;
