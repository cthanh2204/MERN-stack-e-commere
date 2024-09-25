import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
function App() {
  return (
    <Router>
      <div className="relative m-0 min-h-screen	pb-16">
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/cart/:id?" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
