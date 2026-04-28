import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import InputField from "../../../components/fields/InputField";
import Checkbox from "../../../components/checkbox";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setIsSubmitting(true);
    const result = await signup(name, email, password);
    
    if (result.success) {
      navigate("/admin/default", { replace: true });
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-12 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-black uppercase tracking-tighter text-brand-900 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base font-medium text-gray-600 dark:text-gray-400">
          Enter your details to create a new account!
        </p>
        
        <form onSubmit={handleSubmit} className="mb-4">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-500 dark:bg-red-900/10">
              {error}
            </div>
          )}

          <InputField
            variant="auth"
            extra="mb-3"
            label="Full Name*"
            placeholder="John Doe"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <InputField
            variant="auth"
            extra="mb-6"
            label="Confirm Password*"
            placeholder="Repeat your password"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />

          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox id="terms" required />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white break-words">
                I agree to the <a href=" " className="text-brand-500 hover:text-brand-600">Terms and Conditions</a>
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`linear mt-2 w-full rounded-2xl bg-[#003366] py-[16px] text-base font-black uppercase tracking-widest text-white transition duration-200 hover:bg-[#0a4a82] focus:bg-[#0a4a82] active:bg-[#003366] dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-400">
            Already have an account?
          </span>
          <Link
            to="/auth/login"
            className="ml-1 text-sm font-bold text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
