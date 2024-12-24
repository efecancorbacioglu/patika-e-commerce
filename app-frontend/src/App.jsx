import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/products/indexPage";
import ProductDetails from './pages/products/productDetailsPage'
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";

import DefaultLayout from "./layouts/default";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";

function App() {
  return (
    <Routes>
      {/* Login ve Register sayfaları Layout olmadan */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* Layout kullanılan sayfalar */}
      <Route path="/" element={<ProtectedRoute><DefaultLayout><HomePage /></DefaultLayout></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><DefaultLayout><ProductsPage /></DefaultLayout></ProtectedRoute>} />
      <Route path="/products/:id" element={<ProtectedRoute><DefaultLayout><ProductDetails /></DefaultLayout></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><DefaultLayout><CartPage /></DefaultLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><DefaultLayout><ProfilePage /></DefaultLayout></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
