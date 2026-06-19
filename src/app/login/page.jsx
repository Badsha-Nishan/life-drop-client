"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowRight,
} from "@gravity-ui/icons";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 💡 এখানে পরবর্তীতে ব্যাকএন্ডের JWT লগইন API ইন্টিগ্রেট করা হবে
    console.log("Login credentials submitted:", formData);

    // ডেমো রেসপন্স ডিলে (পরীক্ষার জন্য)
    setTimeout(() => {
      setIsLoading(false);
      alert("Login logic triggered successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-brand-light/30 via-white to-brand-light/20 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 relative z-10">
        {/* Top Header Segment */}
        <div className="text-center flex flex-col items-center">
          <Link
            href="/"
            className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 hover:scale-105 transition-transform"
          >
            <Heart className="w-6 h-6 fill-brand-primary" />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-medium">
            Log in to manage donation requests or save lives.
          </p>
        </div>

        {/* Input Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            {/* Email Input Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Envelope className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@example.com"
                  className="w-full bg-brand-light/60 px-11 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark placeholder-gray-400 focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-brand-light/60 px-11 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark placeholder-gray-400 focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlash className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Login Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold text-sm px-6 py-4 rounded-xl hover:bg-brand-primary/90 disabled:opacity-70 active:scale-[0.99] transition-all shadow-lg shadow-brand-primary/10"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </div>
        </form>

        {/* Redirect Bridge Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500 font-medium">
            New to the platform?{" "}
            <Link
              href="/register"
              className="text-brand-primary font-bold hover:underline transition-all"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
