// app/dashboard/DashboardClient.jsx
"use client";

import Link from "next/link";
import { LocationArrow, Clock, SealCheck, ArrowRight } from "@gravity-ui/icons";

export default function DashboardClient({ user, initialRequests }) {
  const userRole = user?.role || "Donor";

  // ডেটা অ্যারে চেক করে সর্বশেষ ৩টি ডাটা নেওয়া হলো
  const requests = Array.isArray(initialRequests) ? initialRequests : [];
  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-6 animate-fade-in p-4 sm:p-6 max-w-5xl mx-auto w-full">
      {/* Welcome Heading Banner */}
      <div>
        <h2 className="text-3xl font-black text-brand-dark tracking-tight capitalize">
          Hello,{" "}
          <span className="text-brand-primary">{user?.name || "User"}!</span>
        </h2>
        <p className="text-sm text-gray-400 font-medium mt-1">
          Role:{" "}
          <span className="text-brand-dark font-bold uppercase text-xs bg-brand-light/80 px-2.5 py-1 rounded-md">
            {userRole}
          </span>{" "}
          • Manage your activities and help save lives today.
        </p>
      </div>

      {/* ─── কন্ডিশনাল রেন্ডারিং: টেবিল ভিউ অথবা এম্পটি স্টেট ─── */}
      {recentRequests.length > 0 ? (
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center justify-between pl-1">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Recent Requests (Latest 3)
            </h3>
            <Link
              href="/dashboard/my-requests"
              className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
            >
              View All ({requests.length}) <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* টেবিল কন্টেইনার (হুবহু My Requests পেজের মতো) */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-light/30 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                    <th className="px-6 py-4.5 w-12 text-center">#</th>
                    <th className="px-6 py-4.5">Recipient Info</th>
                    <th className="px-6 py-4.5">Location</th>
                    <th className="px-6 py-4.5 text-center">Blood Group</th>
                    <th className="px-6 py-4.5 text-right pr-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs font-semibold text-brand-dark">
                  {recentRequests.map((req, index) => (
                    <tr
                      key={req._id}
                      className="hover:bg-brand-light/20 transition-colors"
                    >
                      <td className="px-6 py-5 text-center font-bold text-gray-400">
                        {(index + 1).toString().padStart(2, "0")}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-black text-brand-dark">
                            {req.recipientName}
                          </span>
                          <span className="text-xs text-gray-400 font-normal">
                            {req.hospitalName}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                          <LocationArrow className="w-3.5 h-3.5 text-gray-400" />
                          <span>
                            {req.recipientDistrict}, {req.recipientUpazila}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex bg-brand-primary/10 text-brand-primary text-xs font-black px-2.5 py-1 rounded-lg">
                          {req.bloodGroup}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right pr-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            req.donationStatus?.toLowerCase() === "done"
                              ? "bg-green-50 text-green-600 border border-green-100"
                              : "bg-amber-50 text-amber-600 border border-amber-100"
                          }`}
                        >
                          {req.donationStatus?.toLowerCase() === "done" ? (
                            <SealCheck className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {req.donationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* 📦 Empty State Card Container */
        <div className="mt-4 bg-white border border-dashed border-gray-200 rounded-[32px] p-12 sm:p-20 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300">
            <svg
              className="w-8 h-8 transform rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M3 12l-3 3m3-3l3 3M6.75 6.75l10.5 10.5M10.5 10.5h.008v.008h-.008V10.5zm3.75 3.75h.008v.008h-.008v-.008z"
              />
            </svg>
          </div>

          <h3 className="text-base font-black text-gray-400 tracking-tight">
            No Recent Requests
          </h3>
        </div>
      )}

      {/* Navigation CTA Call Button */}
      <div className="flex justify-center mt-2">
        <Link
          href="/dashboard/my-requests"
          className="flex items-center bg-blue-500 text-white font-extrabold text-xs h-12 px-8 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-brand-dark/10 uppercase tracking-wider"
        >
          View All Requests
        </Link>
      </div>
    </div>
  );
}
