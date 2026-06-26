// app/donation-requests/[id]/DonationRequestDetailsClient.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Person,
  Stethoscope,
  LocationArrow,
  Calendar,
  Clock,
  Bulb,
  CircleCheck,
  Heart,
  ChevronLeft,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";

export default function DonationRequestDetailsClient({ initialRequest, id }) {
  console.log("initial:", initialRequest);
  const router = useRouter();

  // সেফটি গার্ড: যদি initialRequest কোনো কারণে খালি থাকে
  const [request, setRequest] = useState(initialRequest || {});
  const [isUpdating, setIsUpdating] = useState(false);

  console.log("initial:", initialRequest);

  // ─── Donate Now বাটনের মূল লজিক ───
  const handleDonateNow = async () => {
    setIsUpdating(true); // বাটন সাথে সাথে লোডিং/ডিসেবল স্টেটে চলে যাবে

    try {
      // নিশ্চিত করুন .env ফাইলে NEXT_PUBLIC_BASE_URL ডিফাইন করা আছে, অন্যথায় খালি স্ট্রিং "" রাখুন (যদি একই ডোমেইন হয়)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

      // ব্যাকএন্ড PATCH এপিআই কল করে স্ট্যাটাস 'in-progress' করা হচ্ছে
      const response = await fetch(`${baseUrl}/api/donation-request/id/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ donationStatus: "in-progress" }),
      });

      const resData = await response.json();

      if (response.ok) {
        // ১. ক্লায়েন্ট স্টেট সাথে সাথে আপডেট করছি
        setRequest((prev) => ({ ...prev, donationStatus: "in-progress" }));

        // ২. সাকসেস মেসেজ দেখাচ্ছি
        toast.success("Thank you! Request status updated to IN-PROGRESS.");

        // ৩. সার্ভার কম্পোনেন্টের ডেটা রিফ্রেশ করছি যাতে ব্যাকএন্ডের সাথে সিঙ্ক থাকে
        router.refresh();
      } else {
        toast.error(
          resData.message || "Failed to update status. Please try again."
        );
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error updating donation status:", error);
      toast.error("Something went wrong. Please try again.");
      setIsUpdating(false);
    }
  };

  const currentStatus = request.donationStatus?.toLowerCase() || "pending";

  return (
    <div className="min-h-screen bg-[#FAFBFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-brand-dark self-start transition-colors bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Requests
        </button>

        {/* ─── Page Header Title ─── */}
        <div className="text-center flex flex-col gap-1 mb-2">
          <h2 className="text-3xl font-black text-brand-dark tracking-tight">
            Request <span className="text-brand-primary">Details</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            View urgency, location, and requirements.
          </p>
        </div>

        {/* ─── Main Request Details Card ─── */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-10 shadow-sm flex flex-col gap-8 relative overflow-hidden">
          {/* Dynamic Badge Component */}
          <div className="absolute top-6 right-6 sm:top-10 sm:right-10">
            {currentStatus === "pending" ? (
              <span className="bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Pending
              </span>
            ) : (
              <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                In Progress
              </span>
            )}
          </div>

          {/* Top Section: Profile info & Blood Group Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary border border-brand-primary/5 shadow-sm">
                <Person className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-brand-dark tracking-tight">
                  {request.recipientName}
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Recipient • Patient
                </span>
              </div>
            </div>

            {/* Blood Badge layout */}
            <div className="bg-[#FFF8F6] border border-brand-primary/5 px-5 py-3 rounded-2xl flex items-center gap-4 sm:self-center self-start">
              <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center text-base font-black shadow-sm shadow-brand-primary/20">
                {request.bloodGroup}
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-brand-primary tracking-widest uppercase">
                  Required
                </span>
                <span className="text-xs font-black text-brand-dark">
                  Blood Group
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-50" />

          {/* Middle Section: Two-Column Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Box: Location Details */}
            <div className="flex flex-col gap-5 bg-[#FAFBFC] p-5 rounded-2xl border border-gray-50">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Location Details
              </h4>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Hospital
                  </span>
                  <span className="text-xs font-bold text-brand-dark leading-snug">
                    {request.hospitalName}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-brand-primary shrink-0">
                  <LocationArrow className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Full Address
                  </span>
                  <span className="text-xs font-medium text-gray-600 leading-relaxed">
                    {request.fullAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Box: Timing & Urgency */}
            <div className="flex flex-col gap-5 bg-[#FAFBFC] p-5 rounded-2xl border border-gray-50">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Timing & Urgency
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Required Date
                    </span>
                    <span className="text-xs font-black text-brand-dark">
                      {request.donationDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Time
                    </span>
                    <span className="text-xs font-black text-brand-dark">
                      {request.donationTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Request Message Display */}
              <div className="bg-amber-50/40 border border-amber-100/50 p-3.5 rounded-xl flex gap-2.5 items-start mt-1">
                <Bulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest">
                    Request Message
                  </span>
                  <p className="text-xs italic text-gray-600 font-medium leading-relaxed">
                    "{request.requestMessage || "Emergency Needed."}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Bottom Action Button Segment ─── */}
          <div className="flex justify-end pt-4 border-t border-gray-50">
            {currentStatus === "pending" ? (
              <button
                type="button"
                onClick={handleDonateNow}
                disabled={isUpdating}
                className={`${
                  isUpdating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-brand-primary hover:bg-brand-primary/95 active:scale-98"
                } text-white font-black text-xs px-8 py-4 rounded-xl transition-all shadow-md shadow-brand-primary/10 uppercase tracking-wider flex items-center gap-2`}
              >
                <Heart className="w-4 h-4 animate-pulse" />
                {isUpdating ? "Processing..." : "Donate Now"}
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="bg-gray-100 text-gray-400 border border-gray-200 font-black text-xs px-8 py-4 rounded-xl cursor-not-allowed uppercase tracking-wider flex items-center gap-2"
              >
                <CircleCheck className="w-4 h-4 text-gray-400" /> In Progress /
                Taken
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
