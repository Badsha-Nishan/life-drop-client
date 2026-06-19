"use client";

import { useState } from "react";
import {
  Person,
  Envelope,
  LocationArrow,
  Droplet,
  Calendar,
  CloudArrowUpIn,
  FileCheck,
  ShieldExclamation,
} from "@gravity-ui/icons";

export default function ProfilePage() {
  // ডেমো ইউজার ডাটা ও স্টেট ম্যানেজমেন্ট
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "donor@gmail.com",
    bloodGroup: "O+",
    district: "Dhaka",
    upazila: "Dhanmondi",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
    lastDonated: "2026-03-10",
    isAvailable: true,
  });

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile configurations saved successfully!");
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* ─── Page Title Header ─── */}
      <div>
        <h2 className="text-2xl font-black text-brand-dark tracking-tight">
          My <span className="text-brand-primary">Account Profile</span>
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-1">
          View your stats, manage identity information and toggle donor
          availability status.
        </p>
      </div>

      {/* ─── Main Content Two-Column Grid Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2 items-start">
        {/* 📋 Column 1: Profile Summary Card & Availability (Left side) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-gray-100 rounded-[28px] p-6 flex flex-col items-center text-center shadow-sm">
            {/* Glossy Avatar Wrapper */}
            <div className="relative group w-24 h-24 rounded-2xl overflow-hidden bg-brand-light border-2 border-gray-100 shadow-sm mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 bg-brand-dark/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-bold gap-1">
                <CloudArrowUpIn className="w-4 h-4" />
                Upload
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>

            <h3 className="text-base font-black text-brand-dark tracking-tight">
              {profile.name}
            </h3>
            <span className="text-[10px] font-black tracking-widest text-brand-primary uppercase mt-0.5">
              Verified Donor
            </span>

            <div className="w-full border-t border-gray-50 my-5" />

            {/* Blood Group Highlight Badge */}
            <div className="flex items-center justify-between w-full bg-brand-light/40 px-4 py-3 rounded-xl border border-brand-primary/5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Blood Group
              </span>
              <span className="bg-brand-primary text-white text-xs font-black px-3 py-1 rounded-lg shadow-sm shadow-brand-primary/20">
                {profile.bloodGroup}
              </span>
            </div>
          </div>

          {/* Quick Stats: Donation Toggle Switch Card */}
          <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs font-bold text-brand-dark">
                Available to Donate
              </h4>
              <p className="text-[10px] text-gray-400 font-medium">
                Show in public search list
              </p>
            </div>

            {/* Custom Toggle Switch */}
            <button
              onClick={() =>
                setProfile({ ...profile, isAvailable: !profile.isAvailable })
              }
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                profile.isAvailable ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-md shadow-sm transform transition-transform duration-200 ${
                  profile.isAvailable ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 📝 Column 2: Details Modification Form (Right side) */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-2 bg-white border border-gray-100 rounded-[28px] p-6 sm:p-8 shadow-sm flex flex-col gap-6"
        >
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-brand-primary" /> Personal
            Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Person className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full bg-[#F9FAFC] border border-gray-100 px-11 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Envelope className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 px-11 py-3 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* District Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                District / City
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <LocationArrow className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={profile.district}
                  onChange={(e) =>
                    setProfile({ ...profile, district: e.target.value })
                  }
                  className="w-full bg-[#F9FAFC] border border-gray-100 px-11 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Upazila Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Upazila / Area
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <LocationArrow className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={profile.upazila}
                  onChange={(e) =>
                    setProfile({ ...profile, upazila: e.target.value })
                  }
                  className="w-full bg-[#F9FAFC] border border-gray-100 px-11 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Last Donation Date Setter */}
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Last Donation Date
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Calendar className="w-4 h-4" />
                </span>
                <input
                  type="date"
                  value={profile.lastDonated}
                  onChange={(e) =>
                    setProfile({ ...profile, lastDonated: e.target.value })
                  }
                  className="w-full bg-[#F9FAFC] border border-gray-100 px-11 py-3 rounded-xl text-xs font-bold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Secure Warning Area */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <ShieldExclamation className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
              Blood group modifications require official medical certification.
              Please contact a verified coordinator or system volunteer if your
              registered blood type contains errors.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex justify-end pt-2 border-t border-gray-50">
            <button
              type="submit"
              className="bg-brand-dark text-gray-400 font-extrabold text-xs px-6 py-3.5 rounded-xl hover:bg-brand-dark/90 active:scale-98 transition-all shadow-md shadow-brand-dark/10 uppercase tracking-wider"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
