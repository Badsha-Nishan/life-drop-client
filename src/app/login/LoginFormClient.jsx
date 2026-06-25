// app/login/LoginFormClient.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button, toast } from "@heroui/react"; // 👈 HeroUI ইম্পোর্টস
import {
  Heart,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowRight,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client"; // আপনার BetterAuth ক্লায়েন্ট

export default function LoginFormClient() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // ─── BetterAuth ক্লায়েন্ট সাইড লগইন ───
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || "Invalid email or password.");
    } else {
      toast.success("Logged in successfully!");
      router.push(callbackUrl || "/dashboard");
      router.refresh();
    }
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

        {/* Error Feedback Display */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold animate-fade-in">
            {errorMessage}
          </div>
        )}

        {/* Input Form using HeroUI */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {/* Email Input Field via HeroUI */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                variant="flat"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                // startContent={
                //   <Envelope className="w-4 h-4 text-gray-400 shrink-0" />
                // }
                classNames={{
                  inputWrapper:
                    "bg-brand-light/60 hover:bg-brand-light/90 focus-within:!bg-white border border-transparent focus-within:!border-brand-primary h-12 rounded-xl transition-all",
                  input:
                    "text-sm font-medium text-brand-dark placeholder:text-gray-400",
                }}
              />
            </div>

            {/* Password Input Field via HeroUI */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                variant="flat"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                // startContent={
                //   <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                // }
                endContent={
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="focus:outline-none text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlash className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                }
                classNames={{
                  inputWrapper:
                    "bg-brand-light/60 hover:bg-brand-light/90 focus-within:!bg-white border border-transparent focus-within:!border-brand-primary h-12 rounded-xl transition-all",
                  input:
                    "text-sm font-medium text-brand-dark placeholder:text-gray-400",
                }}
              />
            </div>
          </div>

          {/* Action Login Button via HeroUI */}
          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-brand-primary text-white font-bold text-sm h-12 rounded-xl shadow-lg shadow-brand-primary/10 hover:opacity-90 active:scale-[0.99] transition-all"
              endContent={!isLoading && <ArrowRight className="w-4 h-4" />}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
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
