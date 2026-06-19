"use client";

import { useState } from "react";
import {
  CircleCheck,
  Clock,
  Droplet,
  CirclePlus,
  TrashBin,
  Pencil,
  Gear,
  ArrowRightToSquare,
} from "@gravity-ui/icons";

export default function DashboardPage() {
  // ডেমো ইউজার ডাটা
  const user = {
    name: "Alex Jon",
    bloodGroup: "O+",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
  };

  // ইউজারের তৈরি করা ব্লাড রিকোয়েস্টের ডেমো ডাটাবেজ
  const [requests, setRequests] = useState([
    {
      id: 1,
      patientName: "Rahim Uddin",
      hospital: "Dhaka Medical College",
      district: "Dhaka",
      bloodGroup: "O+",
      status: "Pending",
      date: "2026-06-22",
    },
    {
      id: 2,
      patientName: "Sumaiya Akter",
      hospital: "Chittagong General Hospital",
      district: "Chittagong",
      bloodGroup: "O+",
      status: "Accepted",
      date: "2026-06-15",
    },
  ]);

  // রিকোয়েস্ট ডিলিট করার হ্যান্ডলার
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this donation request?")) {
      setRequests(requests.filter((req) => req.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-brand-light/30 flex flex-col lg:flex-row">
      {/* 🎛️ Left Sidebar: Navigation & Quick Profile */}
      <aside className="w-full lg:w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 shrink-0">
        <div className="flex flex-col gap-8">
          {/* User Mini Profile */}
          <div className="flex items-center gap-3 bg-brand-light/50 p-3 rounded-2xl border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-xl object-cover border-2 border-white shadow-sm"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-brand-dark truncate">
                {user.name}
              </span>
              <span className="text-[10px] bg-brand-primary/10 text-brand-primary font-bold px-1.5 py-0.5 rounded-md w-max mt-0.5">
                Group: {user.bloodGroup}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1.5">
            <button className="flex items-center gap-3 w-full bg-brand-primary text-white text-sm font-bold px-4 py-3 rounded-xl shadow-md shadow-brand-primary/10 transition-all text-left">
              <Droplet className="w-4 h-4" />
              My Requests
            </button>
            <button className="flex items-center gap-3 w-full text-gray-500 hover:text-brand-dark hover:bg-brand-light/60 text-sm font-semibold px-4 py-3 rounded-xl transition-all text-left">
              <Gear className="w-4 h-4" />
              Profile Settings
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-3 w-full text-red-500 hover:bg-red-50 text-sm font-bold px-4 py-3 rounded-xl transition-all text-left mt-8 lg:mt-0">
          <ArrowRightToSquare className="w-4 h-4" />
          Log Out
        </button>
      </aside>

      {/* 📈 Right Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 max-w-5xl w-full mx-auto">
        {/* Upper Header Grid */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
              Donor Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
              Monitor, update, or create your emergency blood assistance
              requests.
            </p>
          </div>

          {/* Create Request CTA */}
          <button className="flex items-center justify-center gap-2 bg-brand-dark text-grey-400 font-bold text-sm px-5 py-3.5 rounded-xl hover:bg-brand-dark/90 active:scale-98 transition-all shadow-lg shadow-brand-dark/10">
            <CirclePlus className="w-4 h-4" />
            Create Request
          </button>
        </div>

        {/* 📊 Fast Quick-Stats Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-brand-dark tracking-tight">
                {requests.filter((r) => r.status === "Pending").length}
              </span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                Pending Approvals
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center shrink-0">
              <CircleCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black text-brand-dark tracking-tight">
                {requests.filter((r) => r.status === "Accepted").length}
              </span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                Accepted / Active
              </h3>
            </div>
          </div>
        </div>

        {/* 📋 Data Table Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wider">
              Recent Blood Requests
            </h2>
          </div>

          {requests.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-400 font-medium">
              No donation requests found. Create one to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-light/40 text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-4">Patient & Hospital</th>
                    <th className="px-6 py-4">Blood Group</th>
                    <th className="px-6 py-4">Target Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm font-medium text-brand-dark">
                  {requests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-brand-light/20 transition-colors"
                    >
                      {/* Name & Location */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-dark">
                            {req.patientName}
                          </span>
                          <span className="text-xs text-gray-400 font-normal mt-0.5">
                            {req.hospital} ({req.district})
                          </span>
                        </div>
                      </td>
                      {/* Blood Group Badge */}
                      <td className="px-6 py-4">
                        <span className="inline-flex bg-brand-primary/10 text-brand-primary text-xs font-black px-2.5 py-1 rounded-md">
                          {req.bloodGroup}
                        </span>
                      </td>
                      {/* Date */}
                      <td className="px-6 py-4 text-xs font-semibold text-gray-500">
                        {req.date}
                      </td>
                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                            req.status === "Accepted"
                              ? "bg-green-50 text-green-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              req.status === "Accepted"
                                ? "bg-green-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {req.status}
                        </span>
                      </td>
                      {/* Action Triggers */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            title="Edit Request"
                            className="p-2 text-gray-400 hover:text-brand-dark hover:bg-brand-light rounded-lg transition-all"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(req.id)}
                            title="Delete Request"
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <TrashBin className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
