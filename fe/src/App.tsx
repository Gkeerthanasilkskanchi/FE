
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Products } from './Component/Products';
import { Layout } from './Component/Layout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
