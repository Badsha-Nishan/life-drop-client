"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  LayoutHeaderSideContent,
  Person,
  Droplet,
  CirclePlus,
  ArrowRightToSquare,
  Heart,
  Persons,
  Globe,
  CircleArrowRight, // নতুন আইকন মোবাইল মেনুর জন্য
  Xmark, // নতুন আইকন মেনু বন্ধ করার জন্য
} from "@gravity-ui/icons";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // মোবাইল সাইডবার স্টেট

  useEffect(() => {
    async function fetchUserData() {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          const sessionUser = session.data.user;
          const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
          const res = await fetch(`${baseUrl}/api/users/${sessionUser.email}`);

          if (res.ok) {
            const dbUserData = await res.json();
            setUser(dbUserData);
          } else {
            setUser(sessionUser);
          }
        }
      } catch (error) {
        console.error("Error loading user session in layout:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  const userRole = user?.role || "donor";
  const isAdmin = userRole.toLowerCase() === "admin";

  const mainMenu = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutHeaderSideContent },
    { name: "My Profile", href: "/dashboard/profile", icon: Person },
  ];

  const donationMenu = [
    { name: "My Requests", href: "/dashboard/my-requests", icon: Droplet },
    {
      name: "Create Request",
      href: "/dashboard/create-request",
      icon: CirclePlus,
    },
  ];

  const managementMenu = [
    { name: "All Users", href: "/dashboard/all-users", icon: Persons },
    {
      name: "Public Requests",
      href: "/dashboard/public-requests",
      icon: Globe,
    },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  // মেনু লিংকে ক্লিক করলে মোবাইল সাইডবার অটো বন্ধ হবে
  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFC] flex items-center justify-center font-bold text-gray-400 text-sm">
        Loading System Layout...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFC] flex flex-col md:flex-row">
      {/* ─── MOBILE TOP BAR ─── */}
      <div className="md:hidden flex items-center justify-between bg-white px-5 py-4 border-b border-gray-100 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center text-white">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <span className="text-lg font-black text-green-500 tracking-tight">
            Life<span className="text-brand-primary">Drop</span>
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-gray-50 text-brand-dark border border-gray-100"
        >
          {sidebarOpen ? (
            <Xmark className="w-5 h-5" />
          ) : (
            <CircleArrowRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ─── LEFT SIDEBAR (Responsive) ─── */}
      <aside
        className={`
        fixed inset-y-0 mt-34 left-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-5 transform transition-transform duration-300 ease-in-out h-full
        md:translate-x-0 md:sticky md:top-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col gap-8 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
          {/* Logo Section (Hidden on mobile sidebar because of top bar) */}
          <Link href="/" className="hidden md:flex items-center gap-2 px-2">
            <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center text-white">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="text-lg font-black text-green-500 tracking-tight">
              Life<span className="text-brand-primary">Drop</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col gap-5">
            {/* Main Menu */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 block mb-2">
                Main Menu
              </span>
              <nav className="flex flex-col gap-1">
                {mainMenu.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10"
                          : "text-gray-500 hover:text-brand-dark hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Donations Group */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 block mb-2">
                Donations
              </span>
              <nav className="flex flex-col gap-1">
                {donationMenu.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10"
                          : "text-gray-500 hover:text-brand-dark hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Conditional Admin Panel */}
            {isAdmin && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 block mb-2">
                  Management
                </span>
                <nav className="flex flex-col gap-1">
                  {managementMenu.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10"
                            : "text-gray-500 hover:text-brand-dark hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Profile Info & Logout */}
        <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black text-sm shrink-0">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-brand-dark truncate">
                {user?.name || "Active User"}
              </span>
              <span className="text-[10px] text-gray-400 font-medium truncate">
                {user?.email}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full bg-red-50 text-red-500 hover:bg-red-100/70 text-xs font-bold px-4 py-2.5 rounded-xl transition-all text-left"
          >
            <ArrowRightToSquare className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* BACKDROP FOR MOBILE: সাইডবার ওপেন থাকলে বাইরের অংশে ক্লিক করলে বন্ধ হবে */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
        />
      )}

      {/* ─── RIGHT CONTENT CONTAINER ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Floating Header (Hidden or adjusted for mobile) */}
        <header className="h-16 bg-white border-b border-gray-100 px-4 sm:px-8 md:px-12 flex items-center justify-between sticky top-[65px] md:top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-brand-dark tracking-tight">
              Dashboard
            </h1>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Welcome back, {userRole}
            </span>
          </div>

          <span className="text-[10px] font-black text-brand-primary tracking-widest uppercase bg-brand-primary/5 px-2.5 py-1 rounded-md">
            {userRole}
          </span>
        </header>

        {/* Dynamic Page Injector Panel */}
        <main className="p-4 sm:p-8 md:p-12 flex-1 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
