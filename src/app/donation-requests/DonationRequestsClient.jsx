"use client";

import { useState } from "react";
import {
  LocationArrow,
  Calendar,
  Clock,
  CircleArrowRight,
  Magnifier,
  TriangleExclamation,
} from "@gravity-ui/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DonationRequestsClient({
  initialRequests,
  isLoggedIn,
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const requests = Array.isArray(initialRequests) ? initialRequests : [];

  // ফিল্টারিং লজিক (আপনার রিয়েল মঙ্গোডিবি ফিল্ডের নাম অনুযায়ী ডেটা ম্যাচ করা হচ্ছে)
  const pendingRequests = requests.filter((req) => {
    const isPending = req.donationStatus?.toLowerCase() === "pending";
    const matchesSearch =
      req.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.recipientDistrict?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.recipientUpazila?.toLowerCase().includes(searchTerm.toLowerCase());

    return isPending && matchesSearch;
  });

  // লগইন না থাকলে callbackUrl সহ রিডাইরেক্ট করার হ্যান্ডলার
  const handleViewDetails = (e, requestId) => {
    if (!isLoggedIn) {
      e.preventDefault();
      const targetUrl = `/donation-requests/${requestId}`;
      router.push(`/login?callbackUrl=${encodeURIComponent(targetUrl)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h2 className="text-3xl font-black text-brand-dark tracking-tight sm:text-4xl">
            Urgent <span className="text-brand-primary">Donation Requests</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
            Your donation can save a life. Browse pending requests below and
            find urgent needs matching your blood group.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
          <div className="relative flex items-center w-full sm:max-w-md">
            <span className="absolute left-4 text-gray-400">
              <Magnifier className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by blood group, area or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F9FAFC] border border-gray-100 pl-11 pr-4 py-2.5 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
            />
          </div>

          <div className="text-xs font-bold text-gray-500 bg-brand-light/50 border border-brand-primary/5 px-4 py-2 rounded-xl">
            Total Active Requests:{" "}
            <span className="text-brand-primary font-black text-sm pl-1">
              {pendingRequests.length}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        {pendingRequests.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[28px] p-12 text-center flex flex-col items-center justify-center gap-4 max-w-md mx-auto shadow-sm mt-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
              <TriangleExclamation className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-bold text-brand-dark">
                No Pending Requests
              </h4>
              <p className="text-xs text-gray-400 font-medium">
                There are currently no live or matching blood requests pending.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
            {pendingRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white border border-gray-100 rounded-[24px] p-5 flex flex-col gap-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
              >
                <div className="bg-[#322fe0] -mx-5 -mt-5 p-5 flex items-center justify-between border-b border-gray-50/50">
                  <div className="bg-white border border-brand-primary/10 text-brand-primary w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-sm tracking-tighter">
                    {request.bloodGroup}
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Recipient
                  </span>
                  <h3 className="text-base font-black text-brand-dark tracking-tight truncate">
                    {request.recipientName}
                  </h3>
                </div>

                <div className="flex flex-col gap-3 text-xs font-semibold text-gray-600 border-t border-b border-gray-50 py-3.5">
                  <div className="flex items-start gap-2.5">
                    <LocationArrow className="w-4 h-4 text-brand-primary/60 shrink-0 mt-0.5" />
                    <span className="truncate">
                      {request.recipientUpazila},{" "}
                      <span className="font-bold text-brand-dark">
                        {request.recipientDistrict}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-brand-primary/60 shrink-0" />
                      <span>{request.donationDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-gray-300" />
                      <span>{request.donationTime}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/donation-requests/${request._id}`}
                  onClick={(e) => handleViewDetails(e, request._id)}
                  className="w-full bg-brand-primary text-white text-xs font-black py-3 rounded-xl hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm shadow-brand-primary/10 group-hover:gap-3"
                >
                  View Details
                  <CircleArrowRight className="w-4 h-4 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
