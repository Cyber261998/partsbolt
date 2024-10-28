import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/my-account/*"
              element={
                <ProtectedRoute>
                  <MyAccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <ProtectedRoute>
                  <OrderConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};