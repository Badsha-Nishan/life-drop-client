"use client";

import { useState } from "react";
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

export default function CreateRequestPage() {
  // ফর্মের ডেটা স্টেট
  const [formData, setFormData] = useState({
    recipientName: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    hospitalName: "",
    fullAddress: "",
    requiredDate: "",
    requiredTime: "",
    message: "",
  });

  // সাবমিট হ্যান্ডলার
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Request Data: ", formData);
    alert("Emergency donation request broadcasted successfully!");
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
            {/* Your Name (Read Only Like Image) */}
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
                  value="Donor"
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 px-11 py-3 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Your Email (Read Only Like Image) */}
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
                  value="donor@gmail.com"
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
                <option value="" className="text-gray-400 font-normal">
                  Select Group
                </option>
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

            {/* District */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                District
              </label>
              <select
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                className="w-full bg-[#F9FAFC] border border-gray-100 px-4 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all cursor-pointer"
                required
              >
                <option value="">Select District</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Noakhali">Noakhali</option>
              </select>
            </div>

            {/* Upazila */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Upazila
              </label>
              <select
                value={formData.upazila}
                onChange={(e) =>
                  setFormData({ ...formData, upazila: e.target.value })
                }
                className="w-full bg-[#F9FAFC] border border-gray-100 px-4 py-3 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all cursor-pointer"
                required
              >
                <option value="">Select Upazila</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Companiganj">Companiganj</option>
                <option value="Hathazari">Hathazari</option>
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
                  value={formData.requiredDate}
                  onChange={(e) =>
                    setFormData({ ...formData, requiredDate: e.target.value })
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
                  value={formData.requiredTime}
                  onChange={(e) =>
                    setFormData({ ...formData, requiredTime: e.target.value })
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
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
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
            className="bg-brand-primary text-white font-extrabold text-xs px-8 py-4 rounded-xl hover:bg-brand-primary/90 active:scale-98 transition-all shadow-md shadow-brand-primary/10 uppercase tracking-wider flex items-center gap-2"
          >
            Create Donation Request
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
