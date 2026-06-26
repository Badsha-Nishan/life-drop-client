// app/donation-request/CreateRequestClient.jsx
"use client";

import { useState, useEffect } from "react";
import districtData from "@/data/districts.json";
import upazilaData from "@/data/upazilas.json";
import {
  CircleInfo,
  Person,
  Envelope,
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Bulb,
  ArrowRight,
} from "@gravity-ui/icons";
import { createDonation } from "@/lib/actions/createDonation";
import toast from "react-hot-toast";


export default function CreateRequestClient({ user }) {
  const [isLoading, setIsLoading] = useState(false);

  // ব্যাকএন্ডের রিকোয়ার্ড স্কিমা অনুযায়ী স্টেট সাজানো হয়েছে
  const [formData, setFormData] = useState({
    recipientName: "",
    bloodGroup: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  // JSON ফাইল থেকে ডেটা লোড (আপনার স্ট্রাকচার অনুযায়ী ইন্ডেক্স [2] রাখা হলো)
  const districts = districtData[2]?.data || districtData || [];
  const upazilas = upazilaData[2]?.data || upazilaData || [];

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // ডিস্ট্রিক্ট চেঞ্জ হলে উপজেলা ফিল্টার করার রিয়েল মেকানিজম
  const handleDistrictChange = (e) => {
    const districtName = e.target.value;

    setFormData((prev) => ({
      ...prev,
      recipientDistrict: districtName,
      recipientUpazila: "", // ডিস্ট্রিক্ট পাল্টালে আগের উপজেলা রিসেট হবে
    }));

    // ডিস্ট্রিক্টের আইডি খুঁজে বের করে উপজেলা ফিল্টার করা
    const matchedDistrict = districts.find((d) => d.name === districtName);
    if (matchedDistrict) {
      const upazilaList = upazilas.filter(
        (u) => u.district_id === matchedDistrict.id
      );
      setFilteredUpazilas(upazilaList);
    } else {
      setFilteredUpazilas([]);
    }
  };

  // সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ফাইনাল অবজেক্ট যা ব্যাকএন্ডের PATCH/POST API রিসিভ করবে
    const finalPayload = {
      requesterName: user.name,
      requesterEmail: user.email,
      ...formData,
      donationStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await createDonation(finalPayload);

      if (response?.error) {
        throw new Error(response.error);
      }

      toast.success("Emergency donation request broadcasted successfully!");

      // ফর্ম রিসেট করা
      setFormData({
        recipientName: "",
        bloodGroup: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        fullAddress: "",
        donationDate: "",
        donationTime: "",
        requestMessage: "",
      });
      setFilteredUpazilas([]);
    } catch (error) {
      console.error("Submission Error: ", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* ─── Page Title Header ─── */}
      <div>
        <h2 className="text-2xl font-black text-brand-dark tracking-tight">
          New <span className="text-brand-primary">Donation Request</span>
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-1">
          Complete the form below to broadcast an urgent request to the donor
          community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
        {/* ─── SECTION 1: Requester Info ─── */}
        <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CircleInfo className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black text-brand-dark tracking-tight">
              Requester Info
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Your Name
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Person className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 px-11 py-3 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Your Email
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Envelope className="w-3.5 h-3.5" />
                </span>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 px-11 py-3 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── SECTION 2: Patient Details ─── */}
        <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <Droplet className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black text-brand-dark tracking-tight">
              Patient Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Recipient Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Recipient Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                className="w-full bg-[#F9FAFC] border border-gray-100 px-4 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                required
              />
            </div>

            {/* Blood Group Needed */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Blood Group Needed
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) =>
                  setFormData({ ...formData, bloodGroup: e.target.value })
                }
                className="w-full bg-[#F9FAFC] border border-gray-100 px-4 py-3 rounded-xl text-xs font-black text-brand-primary focus:outline-none focus:bg-white focus:border-brand-primary transition-all cursor-pointer"
                required
              >
                <option value="">Select Group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                  <option
                    key={g}
                    value={g}
                    className="text-brand-dark font-bold"
                  >
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Real District Loop */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                District
              </label>
              <select
                value={formData.recipientDistrict}
                onChange={handleDistrictChange}
                className="w-full bg-[#F9FAFC] border border-gray-100 px-4 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all cursor-pointer"
                required
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Real Upazila Loop (Filtered) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Upazila
              </label>
              <select
                value={formData.recipientUpazila}
                onChange={(e) =>
                  setFormData({ ...formData, recipientUpazila: e.target.value })
                }
                className="w-full bg-[#F9FAFC] border border-gray-100 px-4 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.recipientDistrict}
                required
              >
                <option value="">
                  {formData.recipientDistrict
                    ? "Select Upazila"
                    : "Select District First"}
                </option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ─── SECTION 3: Hospital & Timing ─── */}
        <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black text-brand-dark tracking-tight">
              Hospital & Timing
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Hospital Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Hospital Name
              </label>
              <input
                type="text"
                placeholder="Enter hospital name"
                value={formData.hospitalName}
                onChange={(e) =>
                  setFormData({ ...formData, hospitalName: e.target.value })
                }
                className="w-full bg-[#F9FAFC] border border-gray-100 px-4 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                required
              />
            </div>

            {/* Full Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Full Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="Street / Ward / Area"
                  value={formData.fullAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, fullAddress: e.target.value })
                  }
                  className="w-full bg-[#F9FAFC] border border-gray-100 px-11 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Required Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Required Date
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                </span>
                <input
                  type="date"
                  value={formData.donationDate}
                  onChange={(e) =>
                    setFormData({ ...formData, donationDate: e.target.value })
                  }
                  className="w-full bg-[#F9FAFC] border border-gray-100 px-11 py-3 rounded-xl text-xs font-bold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Required Time */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Required Time
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <input
                  type="time"
                  value={formData.donationTime}
                  onChange={(e) =>
                    setFormData({ ...formData, donationTime: e.target.value })
                  }
                  className="w-full bg-[#F9FAFC] border border-gray-100 px-11 py-3 rounded-xl text-xs font-bold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Request Message */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Request Message
              </label>
              <div className="relative flex items-start">
                <span className="absolute left-4 top-3.5 text-gray-400">
                  <Bulb className="w-3.5 h-3.5" />
                </span>
                <textarea
                  rows="4"
                  placeholder="Explain why the blood is needed..."
                  value={formData.requestMessage}
                  onChange={(e) =>
                    setFormData({ ...formData, requestMessage: e.target.value })
                  }
                  className="w-full bg-[#F9FAFC] border border-gray-100 px-11 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all resize-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── CTA Form Submit Button ─── */}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-brand-primary text-white font-extrabold text-xs px-8 py-4 rounded-xl hover:bg-brand-primary/90 active:scale-98 transition-all shadow-md shadow-brand-primary/10 uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Broadcasting..." : "Create Donation Request"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
