import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/fields/InputField";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMode, setSuccessMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay for sending reset link
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSuccessMode(true);
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-12 lg:pl-0 xl:max-w-[420px]">
        {successMode ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-400/20">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="mb-2.5 text-3xl font-black uppercase tracking-tighter text-brand-900 dark:text-white">
              Check your email
            </h4>
            <p className="mb-9 text-base font-medium text-gray-600 dark:text-gray-400">
              We've sent a password reset link to <br/>
              <span className="font-bold text-brand-500">{email}</span>
            </p>
            <Link
              to="/auth/login"
              className="mt-2 w-full rounded-2xl bg-[#003366] py-[16px] px-8 text-base font-black uppercase tracking-widest text-white transition duration-200 hover:bg-[#0a4a82] dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h4 className="mb-2.5 text-4xl font-black uppercase tracking-tighter text-brand-900 dark:text-white">
              Reset Password
            </h4>
            <p className="mb-9 ml-1 text-base font-medium text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleSubmit} className="mb-4">
              <InputField
                variant="auth"
                extra="mb-6"
                label="Email*"
                placeholder="mail@example.com"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`linear mt-2 w-full rounded-2xl bg-[#003366] py-[16px] text-base font-black uppercase tracking-widest text-white transition duration-200 hover:bg-[#0a4a82] focus:bg-[#0a4a82] active:bg-[#003366] dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending Link..." : "Send Reset Link"}
              </button>
            </form>

            <div className="mt-4">
               <Link
                to="/auth/login"
                className="text-sm font-bold text-brand-500 hover:text-brand-600 dark:text-white"
              >
                &larr; Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
