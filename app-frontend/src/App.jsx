import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

import DefaultLayout from "./layouts/default";

function App() {
  return (
    <Routes>
      {/* Login ve Register sayfaları Layout olmadan */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Layout kullanılan sayfalar */}
      <Route path="/" element={<DefaultLayout><HomePage /></DefaultLayout>} />
      <Route path="/products" element={<DefaultLayout><ProductsPage /></DefaultLayout>} />
      <Route path="/cart" element={<DefaultLayout><CartPage /></DefaultLayout>} />
    </Routes>
  );
}

export default App;
