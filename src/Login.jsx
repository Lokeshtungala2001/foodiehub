
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser, setOtp }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setEnteredOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("login"); // login → otp
  const navigate = useNavigate();

  // ✅ Validate Name + Mobile
  const validateInputs = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Login Step
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtp(newOtp);
    setUser({ name, mobile });

    // Save in localStorage (optional)
    localStorage.setItem("pendingOtp", newOtp);
    localStorage.setItem("userName", name);
    localStorage.setItem("userMobile", mobile);

    setStep("otp"); // move to OTP step
  };

  // ✅ Handle OTP Step (fixed)
  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if ((otp || "").trim() === (generatedOtp || "").trim()) {
      // Mark session verified
      localStorage.setItem("verified", "true");

      // Force redirect so App reads verified flag
      window.location.href = "/home";
    } else {
      setErrors({ otp: "Invalid OTP. Please try again." });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
          width: "380px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px", color: "#d35400", fontWeight: "bold" }}>
          🍴 Foodie Login
        </h2>

        {/* Step 1 → Name + Mobile */}
        {step === "login" && (
          <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                marginBottom: "5px",
                padding: "12px",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
            {errors.name && (
              <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
                {errors.name}
              </p>
            )}

            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{
                marginBottom: "5px",
                padding: "12px",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
            {errors.mobile && (
              <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
                {errors.mobile}
              </p>
            )}

            <button
              type="submit"
              style={{
                padding: "12px",
                width: "100%",
                background: "linear-gradient(90deg, #ff6a00, #ee0979)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Get OTP
            </button>
          </form>
        )}

        {/* Step 2 → Enter OTP */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              style={{
                marginBottom: "5px",
                padding: "12px",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                letterSpacing: "4px",
                textAlign: "center",
              }}
            />
            {errors.otp && (
              <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
                {errors.otp}
              </p>
            )}

            {/* ✅ Show OTP on screen for testing */}
            <p style={{ color: "green", fontSize: "14px", marginBottom: "10px" }}>
              Your OTP is: <b>{generatedOtp}</b>
            </p>

            <button
              type="submit"
              style={{
                padding: "12px",
                width: "100%",
                background: "linear-gradient(90deg, #43cea2, #185a9d)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
