"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutHeaderSideContent, 
  Person, 
  Droplet, 
  CirclePlus, 
  ArrowRightToSquare,
  Heart 
} from "@gravity-ui/icons";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // সাইডবার মেনু আইটেমস
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutHeaderSideContent },
    { name: "My Profile", href: "/dashboard/profile", icon: Person },
    { name: "My Requests", href: "/dashboard/my-requests", icon: Droplet },
    { name: "Create Request", href: "/dashboard/create-request", icon: CirclePlus },
  ];

  // ডেমো ইউজার ডাটা (যা ইমেজের নিচের কোণায় আছে)
  const loggedInUser = {
    name: "Admin User",
    email: "donor@gmail.com",
    role: "DONOR"
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] flex">
      
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-5 fixed h-full z-30">
        
        <div className="flex flex-col gap-10">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 px-2">
            <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center text-white">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="text-lg font-black text-brand-dark tracking-tight">
              Blood<span className="text-brand-primary">Bridge</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col gap-6">
            {/* Navigation Group 1 */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 block mb-3">
                Main Menu
              </span>
              <nav className="flex flex-col gap-1">
                {menuItems.slice(0, 2).map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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

            {/* Navigation Group 2 */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 block mb-3">
                Donations
              </span>
              <nav className="flex flex-col gap-1">
                {menuItems.slice(2).map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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
          </div>
        </div>

        {/* Bottom User Info & Logout Button */}
        <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
          {/* Active Profile Info */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black text-sm shrink-0">
              {loggedInUser.name.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-brand-dark truncate">{loggedInUser.name}</span>
              <span className="text-[10px] text-gray-400 font-medium truncate">{loggedInUser.email}</span>
            </div>
          </div>

          {/* Logout Action */}
          <button className="flex items-center gap-3 w-full bg-red-50 text-red-500 hover:bg-red-100/70 text-xs font-bold px-4 py-3 rounded-xl transition-all text-left">
            <ArrowRightToSquare className="w-4 h-4" />
            Logout
          </button>
        </div>

      </aside>

      {/* ─── RIGHT CONTENT CONTAINER ─── */}
      <div className="flex-1 pl-64 flex flex-col">
        
        {/* Top Floating Header (হুুবহু ইমেজের মতো) */}
        <header className="h-16 bg-white border-b border-gray-100 px-8 sm:px-12 flex items-center justify-between sticky top-0 z-20">
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-brand-dark tracking-tight">Dashboard</h1>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Welcome back, Donor</span>
          </div>
          
          {/* Top Right Role Indicator */}
          <span className="text-[10px] font-black text-brand-primary tracking-widest uppercase bg-brand-primary/5 px-2.5 py-1 rounded-md">
            {loggedInUser.role}
          </span>
        </header>

        {/* 📋 Dynamic Page Injector Panel */}
        <main className="p-8 sm:p-12 flex-1 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}