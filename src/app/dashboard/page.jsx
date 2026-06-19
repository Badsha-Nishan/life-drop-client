"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Welcome Heading Banner */}
      <div>
        <h2 className="text-3xl font-black text-brand-dark tracking-tight">
          Hello, <span className="text-brand-primary">Donor!</span>
        </h2>
        <p className="text-sm text-gray-400 font-medium mt-1">
          Manage your activities and help save lives today.
        </p>
      </div>

      {/* 📦 Empty State Card Container (হুুবহু ইমেজের স্টাইল) */}
      <div className="mt-4 bg-white border border-dashed border-gray-200 rounded-[32px] p-12 sm:p-20 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
        {/* Needle/Syringe Decorative Custom Icon */}
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

      {/* Navigation CTA Call Button */}
      <div className="flex justify-center mt-2">
        <Link
          href="/dashboard/my-requests"
          className="bg-brand-dark text-gray-400 font-extrabold text-xs px-8 py-4 rounded-xl hover:bg-brand-dark/90 active:scale-98 transition-all shadow-md shadow-brand-dark/10 uppercase tracking-wider"
        >
          View All Requests
        </Link>
      </div>
    </div>
  );
}
