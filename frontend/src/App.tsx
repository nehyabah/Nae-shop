import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfileScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
