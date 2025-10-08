import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock authentication delay
    await new Promise((r) => setTimeout(r, 1000));

    // Simple mock login check (with API later)
    if (email === "demo@example.com" && password === "password123") {
      alert("✅ Login successful!");
    } else {
      setError("Invalid email or password.");
    }

    setLoading(false);
    navigate("/dashboard");
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-10 p-8 rounded-3xl shadow-sm text-center"
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="w-10 h-10 bg-green-50 rounded-full grid place-items-center">
            <div className="w-5 h-5 bg-green-60 rounded-full"></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-brown-70 text-3xl font-semibold mb-2">
          Welcome Back.
        </h1>
        <p className="text-gray-60 mb-8">
          Let’s sign in to your account and get started.
        </p>

        {/* Email */}
        <div className="text-left mb-4">
          <label className="block text-gray-70 mb-2 text-sm">
            Email Address
          </label>
          <div className="flex items-center bg-white rounded-full border border-gray-30 px-4 py-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 outline-none text-gray-90 bg-transparent"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="text-left mb-4">
          <label className="block text-gray-70 mb-2 text-sm">Password</label>
          <div className="flex items-center bg-white rounded-full border border-gray-30 px-4 py-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="flex-1 outline-none text-gray-90 bg-transparent"
            />

            {/* Toggle visibility icon */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-60 hover:text-brown-70 focus:outline-none ml-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 002.458 12C3.732 16.057 7.523 19 12 19a9.985 9.985 0 004.982-1.342M9.88 9.88a3 3 0 104.24 4.24M15 12a3 3 0 01-3 3m0-6a3 3 0 013 3m4.12 4.12L4.12 4.12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-brown-60 text-white py-3 rounded-full mb-4 flex items-center justify-center space-x-2 cursor-pointer ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-brown-70"
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Sign Up */}
        <p className="text-gray-70 text-sm">
          Don’t have an account?
          <Link
            to={"/register"}
            className="text-green-60 font-medium hover:underline ml-1"
            onClick={() => handleSignUp}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
