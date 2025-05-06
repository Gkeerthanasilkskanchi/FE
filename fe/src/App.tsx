
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Products } from './Component/Products';
import { Layout } from './Component/Layout';
import { Contact } from './Component/Contact';
import { Home } from './Component/Home';
import { About } from './Component/About'; 


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Products />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
