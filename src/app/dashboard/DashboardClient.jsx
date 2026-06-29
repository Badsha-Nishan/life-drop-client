"use client";

import Link from "next/link";
import {
  LocationArrow,
  Clock,
  SealCheck,
  ArrowRight,
  CopyTransparent,
} from "@gravity-ui/icons";

export default function DashboardClient({
  user,
  initialRequests,
  adminStats,
  volunteerStats,
}) {
  // ১. ইউজারের রোল ট্র্যাকিং (কেস ইনসেনসিটিভ হ্যান্ডেল করা হয়েছে)
  const userRole = (user?.role || "donor").toLowerCase();
  const isAdmin = userRole === "admin";
  const isVolunteer = userRole === "volunteer";

  // এডমিন অথবা ভলান্টিয়ার উভয়েই ড্যাশবোর্ড স্ট্যাটস ভিউ দেখতে পাবেন
  const isManagement = isAdmin || isVolunteer;

  // ২. রেগুলার ডোনারদের রিকোয়েস্ট ডেটা সেটআপ
  const requests = Array.isArray(initialRequests) ? initialRequests : [];
  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // ৩. এডমিন এবং ভলান্টিয়ারের জন্য স্ট্যাটস ডেটা কম্বাইন হ্যান্ডেলিং
  // সার্ভার থেকে নির্দিষ্ট ডেটা না আসলে ডিফল্ট ফলব্যাক ভ্যালু দেখাবে
  const stats = adminStats ||
    volunteerStats || {
      totalDonors: 16,
      totalFunding: 12886,
      bloodRequests: 20,
    };

  return (
    <div className="flex flex-col gap-6 animate-fade-in p-4 sm:p-6 max-w-5xl mx-auto w-full">
      {/* ─── ১. Welcome Heading Banner ─── */}
      <div>
        <h2 className="text-3xl font-black text-brand-dark tracking-tight capitalize">
          Hello,{" "}
          <span className="text-brand-primary">{user?.name || "User"}!</span>
        </h2>
        <p className="text-sm text-gray-400 font-medium mt-1">
          Role:{" "}
          <span className="text-brand-dark font-black uppercase text-[10px] bg-brand-light/80 px-2.5 py-1 rounded-md tracking-wider">
            {user?.role || "donor"}
          </span>{" "}
          • Manage your activities and help save lives today.
        </p>
      </div>

      {/* ─── ২. কন্ডিশনাল ড্যাশবোর্ড ভিউ (Management বনাম Donor) ─── */}
      {isManagement ? (
        /* 🌟 MANAGEMENT VIEW: Admin এবং Volunteer উভয়েই এই স্ট্যাটস কার্ডগুলো দেখতে পাবেন */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          {/* কার্ড ১: Total Donors */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </div>
              <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-black px-2.5 py-1 rounded-full">
                <CopyTransparent className="w-3 h-3 stroke-[2.5]" /> +12%
              </span>
            </div>
            <div className="mt-6">
              <p className="text-xs font-black text-gray-400 tracking-wide">
                Total Donors
              </p>
              <h3 className="text-4xl font-black text-brand-dark mt-1 tracking-tight">
                {stats.totalDonors}
              </h3>
            </div>
          </div>

          {/* কার্ড ২: Total Funding */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-black px-2.5 py-1 rounded-full">
                <CopyTransparent className="w-3 h-3 stroke-[2.5]" /> +5%
              </span>
            </div>
            <div className="mt-6">
              <p className="text-xs font-black text-gray-400 tracking-wide">
                Total Funding
              </p>
              <h3 className="text-4xl font-black text-brand-dark mt-1 tracking-tight">
                ${stats.totalFunding?.toLocaleString()}
              </h3>
            </div>
          </div>

          {/* কার্ড ৩: Blood Requests */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-brand-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-black px-2.5 py-1 rounded-full">
                <CopyTransparent className="w-3 h-3 stroke-[2.5]" /> +8%
              </span>
            </div>
            <div className="mt-6">
              <p className="text-xs font-black text-gray-400 tracking-wide">
                Blood Requests
              </p>
              <h3 className="text-4xl font-black text-brand-dark mt-1 tracking-tight">
                {stats.bloodRequests}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        /* 🩸 DONOR VIEW: সাম্প্রতিক রিকোয়েস্টের তালিকা বা এম্পটি স্টেট */
        <>
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
                  View All ({requests.length}){" "}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* টেবিল কন্টেইনার */}
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

          {/* Navigation CTA Call Button (শুধু ডোনার ভিউতে দেখাবে) */}
          <div className="flex justify-center mt-2">
            <Link
              href="/dashboard/my-requests"
              className="flex items-center bg-blue-500 text-white font-extrabold text-xs h-12 px-8 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-brand-dark/10 uppercase tracking-wider"
            >
              View All Requests
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
