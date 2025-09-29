import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    let newErrors = {};
    setSuccess(""); // reset success

    // validation
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";

    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      newErrors.email = "User already exists with this email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save user in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email, password })
    );

    setErrors({});
    setSuccess("Signup successful! Redirecting to Sign In...");
    setTimeout(() => navigate("/signin"), 1500);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="mb-4 text-center text-primary">Sign Up</h2>

        {/* Success message */}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSignup} autoComplete="off" noValidate>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${
                errors.username ? "is-invalid" : username ? "is-valid" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${
                errors.email ? "is-invalid" : email ? "is-valid" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.password ? "is-invalid" : password ? "is-valid" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword
                  ? "is-invalid"
                  : confirmPassword
                  ? "is-valid"
                  : ""
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/signin" style={{ textDecoration: "none", color: "blue" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
