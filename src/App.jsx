import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Drinks from "./Drinks";
import Snacks from "./Snacks";
import Cart from "./Cart";
import Orders from "./Orders";
import Contact from "./Contact";
import About from "./About";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import OtpPage from "./OtpPage";
import Signup from "./Signup";
import Signin from "./Signin";

// ProtectedRoute with layout (header + footer)
function ProtectedRoute({ children, verified, setVerified }) {
  if (!verified) {
    return <Login />;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ✅ Pass setVerified to Header */}
      <Header setVerified={setVerified} />
      <div style={{ flex: "1" }}>{children}</div>
      <Footer />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  // Restore session on reload
  useEffect(() => {
    const savedVerified = localStorage.getItem("verified");
    if (savedVerified === "true") {
      setVerified(true);

      const savedName = localStorage.getItem("userName");
      const savedMobile = localStorage.getItem("userMobile");
      if (savedName && savedMobile) {
        setUser({ name: savedName, mobile: savedMobile });
      }
    }
  }, []);

  // Save verified state
  useEffect(() => {
    if (verified) {
      localStorage.setItem("verified", "true");
    } else {
      localStorage.removeItem("verified");
    }
  }, [verified]);

  return (
    <Routes>
      {/* Public Routes (no header/footer) */}
      <Route path="/" element={<Login setUser={setUser} setOtp={setOtp} />} />
      <Route path="/otp" element={<OtpPage user={user} otp={otp} setVerified={setVerified} />} />

      {/* Protected Routes (with header/footer) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Home user={user} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/veg"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Veg />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nonveg"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Nonveg />
          </ProtectedRoute>
        }
      />
      <Route
        path="/drinks"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Drinks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/snacks"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Snacks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Signin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute verified={verified} setVerified={setVerified}>
            <Signup />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
