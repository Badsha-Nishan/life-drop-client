"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 ১. usePathname হুক ইম্পোর্ট করা হয়েছে
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars,
  CircleXmark,
  ChevronDown,
  ArrowRightFromSquare,
  LayoutHeaderSideContent,
  Heart,
} from "@gravity-ui/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname(); // 👈 ২. কারেন্ট ইউআরএল পাথ নেওয়ার জন্য ইনিশিয়ালাইজেশন

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    name: "Rahat",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  // 👈 ৩. কোড ক্লিন রাখার জন্য কমন নেভিগেশন অ্যারে তৈরি
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Donation Requests", href: "/donation-requests" },
    { name: "Search Donor", href: "/search-donor" },
    ...(isLoggedIn ? [{ name: "Funding", href: "/funding" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-brand-dark tracking-tight">
              Life<span className="text-brand-primary">Drop</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href; // 👈 অ্যাক্টিভ চেক
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? "text-brand-primary font-bold" // অ্যাক্টিভ থাকলে এই ক্লাস পাবে
                      : "text-gray-600 hover:text-brand-primary"
                  }`}
                >
                  {link.name}
                  {/* অ্যাক্টিভ লিঙ্কের নিচে একটি মডার্ন আন্ডারলাইন এফেক্ট (ঐচ্ছিক) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            {/* Auth Condition for Desktop */}
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="bg-brand-primary text-white px-6 py-2.5 rounded-xl hover:bg-brand-primary/90 transition-all shadow-sm shadow-brand-primary/20 font-semibold"
              >
                Login
              </Link>
            ) : (
              /* User Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-lg object-cover ring-2 ring-brand-primary/20"
                  />
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1"
                    >
                      <div className="px-3 py-2 text-xs text-gray-400 font-normal">
                        Logged in as {user.name}
                      </div>
                      <Link
                        href="/dashboard"
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                          pathname === "/dashboard"
                            ? "bg-gray-50 text-brand-primary font-bold"
                            : "text-brand-dark hover:bg-gray-50"
                        }`}
                      >
                        <LayoutHeaderSideContent className="w-4 h-4 text-gray-400" />{" "}
                        Dashboard
                      </Link>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-left"
                      >
                        <ArrowRightFromSquare className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-brand-dark hover:bg-gray-50 transition-colors"
            >
              {isOpen ? (
                <CircleXmark className="w-6 h-6" />
              ) : (
                <Bars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-4 font-medium">
              {/* 👈 ৪. মোবাইল মেন্যুতেও ডাইনামিক অ্যাক্টিভ স্টেট লুপ */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMenu}
                    className={`py-2 transition-colors ${
                      isActive
                        ? "text-brand-primary font-bold"
                        : "text-gray-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <hr className="border-gray-100" />

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={toggleMenu}
                    className={`flex items-center gap-2 py-2 transition-colors ${
                      pathname === "/dashboard"
                        ? "text-brand-primary font-bold"
                        : "text-brand-dark"
                    }`}
                  >
                    <LayoutHeaderSideContent className="w-4 h-4" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      toggleMenu();
                    }}
                    className="flex items-center gap-2 py-2 text-red-600 text-left"
                  >
                    <ArrowRightFromSquare className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-primary/90 transition-all text-center font-semibold"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
