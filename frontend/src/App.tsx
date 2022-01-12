import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart/:id" element={<CartPage/>} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
