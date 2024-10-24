import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/404";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserList from "./pages/UserList";
import Admin from "./pages/Admin";
import UserEdit from "./pages/UserEdit";
import ProductEdit from "./pages/ProductEdit";
import ProductList from "./pages/ProductList";
import OrderList from "./pages/OrderList";
function App() {
  return (
    <Router>
      <div className="relative m-0  min-h-screen	pb-16">
        <Header />
        <main className="container mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart/:id?" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<Order />} />
            {/* Search Product route */}
            <Route path="/search/:keyword" element={<Home />} exact />
            <Route path="/page/:pageNumber" element={<Home />} exact />

            {/* Admin route */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users-list" element={<UserList />} />
            <Route path="/admin/user/:id" element={<UserEdit />} />
            <Route path="/admin/products-list" element={<ProductList />} />
            <Route
              path="/admin/products-list/:pageNumber"
              element={<ProductList />}
            />

            <Route path="/admin/product/:id" element={<ProductEdit />} />
            <Route path="/admin/orders-list" element={<OrderList />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
