import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import InputField from "../../../components/fields/InputField";
import Checkbox from "../../../components/checkbox";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The page they were trying to visit, or the dashboard by default
  const from = location.state?.from?.pathname || "/admin/default";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-12 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-black uppercase tracking-tighter text-brand-900 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base font-medium text-gray-600 dark:text-gray-400">
          Enter your email and password to sign in!
        </p>

        <form onSubmit={handleSubmit} className="mb-4">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-500 dark:bg-red-900/10">
              {error}
            </div>
          )}

          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-6"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-6"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox id="remember" />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged in
              </p>
            </div>
            <Link
              className="text-sm font-bold text-brand-500 hover:text-brand-600 dark:text-white"
              to="/auth/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`linear mt-2 w-full rounded-2xl bg-[#003366] py-[16px] text-base font-black uppercase tracking-widest text-white transition duration-200 hover:bg-[#0a4a82] focus:bg-[#0a4a82] active:bg-[#003366] dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-400">
            Not registered yet?
          </span>
          <Link
            to="/auth/signup"
            className="ml-1 text-sm font-bold text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>


      </div>
    </div>
  );
}
