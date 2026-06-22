"use client";

import { useState } from "react";
import {
  Funnel,
  ChevronLeft,
  ChevronRight,
  TrashBin,
  Pencil,
  LocationArrow,
  Clock,
  SealCheck,
} from "@gravity-ui/icons";

export default function MyRequestsPage() {
  // ১. ডেমো ডাটাবেজ (পেজিনেশন ও ফিল্টার টেস্ট করার জন্য একটু বেশি ডাটা দেওয়া হলো)
  const [allRequests, setAllRequests] = useState([
    {
      id: 1,
      name: "Sabbir Rahman",
      hospital: "Dhaka Medical College",
      location: "Dhaka",
      group: "O+",
      status: "Pending",
    },
    {
      id: 2,
      name: "Khadija Begum",
      hospital: "Chittagong General Hosp.",
      location: "Chittagong",
      group: "A+",
      status: "Accepted",
    },
    {
      id: 3,
      name: "Asif Iqbal",
      hospital: "Sylhet MAG Osmani Medical",
      location: "Sylhet",
      group: "B-",
      status: "Pending",
    },
    {
      id: 4,
      name: "Fatima Zahra",
      hospital: "Rajshahi Shishu Hospital",
      location: "Rajshahi",
      group: "AB+",
      status: "Accepted",
    },
    {
      id: 5,
      name: "Imran Khan",
      hospital: "Khulna City Medical",
      location: "Khulna",
      group: "O-",
      status: "Pending",
    },
    {
      id: 6,
      name: "Nusrat Jahan",
      hospital: "Barisal Sadar Hospital",
      location: "Barisal",
      group: "A-",
      status: "Accepted",
    },
    {
      id: 7,
      name: "Tamim Iqbal",
      hospital: "Rangpur Medical College",
      location: "Rangpur",
      group: "B+",
      status: "Pending",
    },
    {
      id: 8,
      name: "Riya Moni",
      hospital: "Mymensingh Medical",
      location: "Mymensingh",
      group: "O+",
      status: "Accepted",
    },
    {
      id: 9,
      name: "Mahmudullah R.",
      hospital: "Kurmitola General Hosp.",
      location: "Dhaka",
      group: "AB-",
      status: "Pending",
    },
    {
      id: 10,
      name: "Mitu Akter",
      hospital: "Labaid Specialized",
      location: "Dhaka",
      group: "A+",
      status: "Accepted",
    },
    {
      id: 11,
      name: "Rakib Hasan",
      hospital: "Square Hospital",
      location: "Dhaka",
      group: "O+",
      status: "Pending",
    },
  ]);

  // ২. ফিল্টার ও পেজিনেশন স্টেট
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // প্রতি পেজে ৫টি করে ডাটা দেখাবে

  // ৩. রিকোয়েস্ট ডিলিট করার ফাংশন
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blood request?")) {
      setAllRequests(allRequests.filter((req) => req.id !== id));
    }
  };

  // ৪. ফিল্টারিং লজিক
  const filteredRequests = allRequests.filter((req) => {
    if (statusFilter === "All") return true;
    return req.status === statusFilter;
  });

  // ৫. পেজিনেশন ম্যাথমেটিক্যাল ক্যালকুলেশন
  const totalResults = filteredRequests.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* ─── Top Header & Filter Segment ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-brand-dark tracking-tight">
            My <span className="text-brand-primary">Donation Requests</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Manage, filter, and track your active blood donation posts.
          </p>
        </div>

        {/* Status Dropdown Filter */}
        <div className="relative flex items-center shrink-0">
          <span className="absolute left-3.5 text-gray-400 pointer-events-none">
            <Funnel className="w-3.5 h-3.5" />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); // ফিল্টার পাল্টালে পেজ ১ এ ফেরত যাবে
            }}
            className="bg-white border border-gray-200 text-xs font-bold text-gray-600 pl-9 pr-8 py-2.5 rounded-xl focus:outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer shadow-sm shadow-gray-100"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="InProgress">InProgress</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* ─── Custom Premium Table Component ─── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-2">
        {totalResults === 0 ? (
          <div className="p-16 text-center text-sm text-gray-400 font-medium">
            No requests found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-light/30 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4.5 w-12 text-center">#</th>
                  <th className="px-6 py-4.5">Recipient Info</th>
                  <th className="px-6 py-4.5">Location</th>
                  <th className="px-6 py-4.5 text-center">Blood Group</th>
                  <th className="px-6 py-4.5">Status</th>
                  <th className="px-6 py-4.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs font-semibold text-brand-dark">
                {currentItems.map((req, index) => (
                  <tr
                    key={req.id}
                    className="hover:bg-brand-light/20 transition-colors"
                  >
                    {/* Index Serial */}
                    <td className="px-6 py-5 text-center font-bold text-gray-400">
                      {indexOfFirstItem + index + 1}
                    </td>

                    {/* Patient & Hospital */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-black text-brand-dark">
                          {req.name}
                        </span>
                        <span className="text-xs text-gray-400 font-normal">
                          {req.hospital}
                        </span>
                      </div>
                    </td>

                    {/* Location Badge */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                        <LocationArrow className="w-3.5 h-3.5 text-gray-400" />
                        <span>{req.location}, Bangladesh</span>
                      </div>
                    </td>

                    {/* Blood Group Icon-Style Tag */}
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex bg-brand-primary/10 text-brand-primary text-xs font-black px-2.5 py-1 rounded-lg">
                        {req.group}
                      </span>
                    </td>

                    {/* Dynamic Status Badge */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          req.status === "Accepted"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}
                      >
                        {req.status === "Accepted" ? (
                          <SealCheck className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {req.status}
                      </span>
                    </td>

                    {/* Quick Row Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1">
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

      {/* ─── Pagination Navigation Control (হুুবহু ইমেজের লজিক অনুযায়ী কিন্তু নতুন ডিজাইনে) ─── */}
      {totalResults > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 px-1">
          {/* Dynamic Records Range Text */}
          <span className="text-xs text-gray-400 font-medium">
            Showing{" "}
            <span className="font-bold text-brand-dark">
              {indexOfFirstItem + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-brand-dark">
              {Math.min(indexOfLastItem, totalResults)}
            </span>{" "}
            of <span className="font-bold text-brand-dark">{totalResults}</span>{" "}
            results
          </span>

          {/* Interactive Button Numbers */}
          <div className="flex items-center gap-1.5">
            {/* Prev Trigger */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Numeric Array Loop */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-sm ${
                  currentPage === page
                    ? "bg-brand-primary text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Trigger */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
