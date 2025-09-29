
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpPage({ user, otp, setVerified }) {
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    if (enteredOtp === otp) {
      console.log("✅ OTP matched, setting verified and going home...");
      setVerified(true);

      // Delay navigate so App re-renders with verified = true
      setTimeout(() => navigate("/home"), 100);
    } else {
      setError("❌ Invalid OTP, try again!");
    }
  };

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>⚠ Please login first.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Enter OTP</h2>
      <p>OTP sent to {user.mobile}</p>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={enteredOtp}
          onChange={(e) => setEnteredOtp(e.target.value)}
          style={{ margin: "10px", padding: "10px", width: "250px" }}
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ padding: "10px 20px", background: "blue", color: "white" }}>
          Verify OTP
        </button>
      </form>

      {/* Debug OTP for testing */}
      <p style={{ color: "green" }}>Test OTP: <b>{otp}</b></p>
    </div>
  );
}

export default OtpPage;
