
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Products } from './Component/Products';
import { Layout } from './Component/Layout';
import { Contact } from './Component/Contact';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="products" element={<Products />} />
        <Route path="contact-us" element={<Contact />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
