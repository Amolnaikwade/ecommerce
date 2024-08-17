import React from 'react';
import * as yup from 'yup';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import About from './components/About';
import Contact from './components/Contact';
import CustomerSupport from './components/CustomerSupport';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Orders from './components/Orders';
import AccountSettingsPage from './components/AccountSettingsPage'; // Import the new page
import MyReviewsAndRatings from './components/MyReviewsAndRatings'; // Import the MyReviewsAndRatings page
import CartProvider from './context/CartContext';
import AuthProvider from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { OrderProvider } from './context/OrderContext'; // Correct import here
import SearchResults from './components/SearchResults';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserLogin from './components/UserLogin';
import RegistrationPage from './components/RegistrationPage';
import Products from './components/Products';





function App() {
  const getHeaderTitle = (path) => {
    switch (path) {
      case '/':
        return 'Welcome to KrazeCart';
      case '/products':
        return 'Products';
      case '/about':
        return 'About Us';
      case '/contact':
        return 'Get in Touch';
      case '/customer-support':
        return 'Customer Support';
      case '/login':
        return 'Login to Your Account';
      case '/cart':
        return 'Your Cart';
      case '/checkout':
        return 'Checkout';
      case '/admin':
        return 'Admin Dashboard';
      case '/profile':
        return 'Your Profile';
      case '/settings':
        return 'Account Settings';
      case '/Orders':
        return 'My Orders'; // Title for the Orders page
      case '/account-settings':
        return 'Account Settings'; // Title for the Account Settings page
      case '/my-reviews-and-ratings':
        return 'My Reviews & Ratings'; // Title for the My Reviews & Ratings page
        default:
        return 'Welcome to KrazeCart';
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider> {/* Wrap the app with OrderProvider */}
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<><Header title={getHeaderTitle('/')} /><Home /></>} />
              <Route path="/products" element={<><Header title={getHeaderTitle('/products')} /><ProductList /></>} />
              <Route path="/about" element={<><Header title={getHeaderTitle('/about')} /><About /></>} />
              <Route path="/contact" element={<><Header title={getHeaderTitle('/contact')} /><Contact /></>} />
              <Route path="/customer-support" element={<><Header title={getHeaderTitle('/customer-support')} /><CustomerSupport /></>} />
              <Route path="/login" element={<><Header title={getHeaderTitle('/login')} /><Login /></>} />
              <Route path="/cart" element={<><Header title={getHeaderTitle('/cart')} /><Cart /></>} />
              <Route path="/checkout" element={<><Header title={getHeaderTitle('/checkout')} /><Checkout /></>} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute 
                    element={<><Header title={getHeaderTitle('/admin')} /><Admin /></>} 
                  />
                } 
              />
              <Route path="/reg" element={<RegistrationPage />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Products" element={<products />} />
              <Route path="/UserLogin" element={<UserLogin />} />
              <Route path="/profile" element={<ProtectedRoute element={<><Header title={getHeaderTitle('/profile')} /><Profile /></>} />} />
              <Route path="/settings" element={<><Header title={getHeaderTitle('/settings')} /><Settings /></>} />
              <Route path="/Orders" element={<><Header title={getHeaderTitle('/Orders')} /><Orders /></>} /> {/* Route for the Orders page */}
              <Route path="/account-settings" element={<><Header title={getHeaderTitle('/account-settings')} /><AccountSettingsPage /></>} /> {/* Route for the Account Settings page */}
              <Route path="/my-reviews-and-ratings" element={<><Header title={getHeaderTitle('/my-reviews-and-ratings')} /><MyReviewsAndRatings /></>} /> {/* Route for the My Reviews & Ratings page */}
              <Route path="/search-results" element={<SearchResults />} /> {/* Search results route */}
            </Routes>
            <Footer />
          </div>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
