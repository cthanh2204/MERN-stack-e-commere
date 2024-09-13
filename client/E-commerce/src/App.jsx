import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Product from "./pages/Product";
function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen justify-between">
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
