"use client";

import { useState } from "react";
import {
  Person,
  Envelope,
  LocationArrow,
  Calendar,
  CloudArrowUpIn,
  FileCheck,
  ShieldExclamation,
  PencilToLine,
} from "@gravity-ui/icons";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // মূল প্রোফাইল স্টেট
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

  // ক্যানসেল করলে আগের ডেটা ফিরিয়ে আনার জন্য ব্যাকআপ স্টেট
  const [backupProfile, setBackupProfile] = useState({ ...profile });

  // এডিট মোড টগল হ্যান্ডলার
  const handleEditToggle = () => {
    if (!isEditing) {
      // এডিট শুরু করার সময় বর্তমান ডেটা ব্যাকআপে রাখছি
      setBackupProfile({ ...profile });
    } else {
      // ক্যানসেল করার সময় ব্যাকআপ ডেটা ফিরিয়ে দিচ্ছি
      setProfile({ ...backupProfile });
    }
    setIsEditing(!isEditing);
  };

  // সব ইনপুট ফিল্ডের কমন চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ইমেজ আপলোড ও প্রিভিউ হ্যান্ডলার
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // এখানে আপনি চাইলে আপনার API কল বা ব্যাকএন্ডে ডেটা পাঠানোর লজিক লিখতে পারেন
    alert("Profile configurations saved successfully!");
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* ─── Page Title Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-brand-dark tracking-tight">
            My <span className="text-brand-primary">Account Profile</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-1">
            View your stats, manage identity information and toggle donor
            availability status.
          </p>
        </div>

        {/* ডাইনামিক এডিট/ক্যান্সেল বাটন */}
        <button
          type="button"
          onClick={handleEditToggle}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
            isEditing
              ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100/70"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"
          }`}
        >
          <PencilToLine className="w-3.5 h-3.5" />
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </button>
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
              {/* শুধুমাত্র এডিট মোডে ইমেজ আপলোড অপশন কাজ করবে */}
              {isEditing && (
                <label className="absolute inset-0 bg-brand-dark/50 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer text-[10px] font-bold gap-1 animate-fade-in">
                  <CloudArrowUpIn className="w-4 h-4" />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
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
              type="button"
              disabled={!isEditing}
              onClick={() =>
                setProfile((prev) => ({
                  ...prev,
                  isAvailable: !prev.isAvailable,
                }))
              }
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                profile.isAvailable ? "bg-green-500" : "bg-gray-200"
              } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}
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
                  name="name"
                  value={profile.name}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full border px-11 py-3 rounded-xl text-xs font-semibold transition-all focus:outline-none ${
                    isEditing
                      ? "bg-[#F9FAFC] border-gray-200 text-brand-dark focus:bg-white focus:border-brand-primary"
                      : "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
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
                  name="email"
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
                  name="district"
                  value={profile.district}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full border px-11 py-3 rounded-xl text-xs font-semibold transition-all focus:outline-none ${
                    isEditing
                      ? "bg-[#F9FAFC] border-gray-200 text-brand-dark focus:bg-white focus:border-brand-primary"
                      : "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
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
                  name="upazila"
                  value={profile.upazila}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full border px-11 py-3 rounded-xl text-xs font-semibold transition-all focus:outline-none ${
                    isEditing
                      ? "bg-[#F9FAFC] border-gray-200 text-brand-dark focus:bg-white focus:border-brand-primary"
                      : "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
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
                  name="lastDonated"
                  value={profile.lastDonated}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full border px-11 py-3 rounded-xl text-xs font-bold transition-all focus:outline-none ${
                    isEditing
                      ? "bg-[#F9FAFC] border-gray-200 text-brand-dark focus:bg-white focus:border-brand-primary"
                      : "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
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

          {/* একশন বাটন এরিয়া (শুধুমাত্র এডিট মোডে দৃশ্যমান হবে) */}
          {isEditing && (
            <div className="flex justify-end pt-2 border-t border-gray-50 animate-fade-in">
              <button
                type="submit"
                className="bg-brand-primary text-white font-extrabold text-xs px-6 py-3.5 rounded-xl hover:bg-brand-primary/90 active:scale-98 transition-all shadow-md shadow-brand-primary/10 uppercase tracking-wider"
              >
                Save Configuration
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
