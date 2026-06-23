"use client";

import { useState, useEffect, useRef } from "react";
import {
  Funnel,
  ChevronLeft,
  ChevronRight,
  TrashBin,
  Pencil,
  LocationArrow,
  Clock,
  SealCheck,
  EllipsisVertical,
  Eye,
  ArrowLeft,
  Xmark, // 👈 মোডাল বন্ধ করার আইকন
  Stethoscope, // 👈 হাসপাতালের আইকন
  Calendar, // 👈 ক্যালেন্ডার আইকন
  Bulb, // 👈 মেসেজ বক্সের আইকন
} from "@gravity-ui/icons";

export default function MyRequestsPage() {
  // ১. ডায়নামিক ডাটাবেজ স্টেট
  const [allRequests, setAllRequests] = useState([
    {
      id: 1,
      name: "Sabbir Rahman",
      hospital: "Dhaka Medical College",
      location: "Dhaka",
      group: "O+",
      status: "Pending",
      upazila: "Ramna",
      fullAddress: "12/A, Shahbagh, Dhaka",
      date: "2026-06-25",
      time: "23:00",
      message: "Urgent need for bypass surgery. Please help.",
    },
    {
      id: 2,
      name: "Khadija Begum",
      hospital: "Chittagong General Hosp.",
      location: "Chittagong",
      group: "A+",
      status: "Done",
      upazila: "Kotwali",
      fullAddress: "Anderkilla, Chittagong",
      date: "2026-06-18",
      time: "11:30",
      message: "Patient recovery in progress. Donation successfully finished.",
    },
    {
      id: 3,
      name: "Asif Iqbal",
      hospital: "Sylhet MAG Osmani Medical",
      location: "Sylhet",
      group: "B-",
      status: "Pending",
      upazila: "Sylhet Sadar",
      fullAddress: "Kajolshah, Sylhet",
      date: "2026-07-01",
      time: "19:15",
      message: "Thalassemia patient needs immediate blood transfusion.",
    },
    {
      id: 4,
      name: "Akbor",
      hospital: "Hospital 1",
      location: "Noakhali",
      group: "AB+",
      status: "Pending",
      upazila: "Companiganj",
      fullAddress: "Some address near central market",
      date: "2026-06-29",
      time: "22:45",
      message: "Accident case, immediate requirement.",
    },
  ]);

  // ২. ফিল্টার ও পেজিনেশন স্টেট
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const itemsPerPage = 5;

  // ─── 👁️ View Details Modal States ───
  const [selectedRequest, setSelectedRequest] = useState(null);

  // ─── 📝 Edit Mode States ───
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    name: "",
    location: "",
    upazila: "",
    hospital: "",
    fullAddress: "",
    status: "",
  });

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  // বাইরে ক্লিক করলে ক্লোজ হওয়ার ট্রিপল হ্যান্ডলার (Dropdown ও Modal এর জন্য)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedRequest(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ডিলিট ফাংশন
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blood request?")) {
      setAllRequests(allRequests.filter((req) => req.id !== id));
      setActiveDropdown(null);
    }
  };

  // এডিট বোতাম ট্রিগার
  const handleEditClick = (req) => {
    setEditFormData({
      id: req.id,
      name: req.name,
      location: req.location,
      upazila: req.upazila || "",
      hospital: req.hospital,
      fullAddress: req.fullAddress || "",
      status: req.status,
    });
    setIsEditing(true);
    setActiveDropdown(null);
  };

  // সাবমিট বা আপডেট হ্যান্ডলার
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setAllRequests(
      allRequests.map((item) =>
        item.id === editFormData.id
          ? {
              ...item,
              name: editFormData.name,
              location: editFormData.location,
              upazila: editFormData.upazila,
              hospital: editFormData.hospital,
              fullAddress: editFormData.fullAddress,
            }
          : item
      )
    );
    alert("Request updated successfully!");
    setIsEditing(false);
  };

  // ফিল্টারিং ও পেজিনেশন লজিক
  const filteredRequests = allRequests.filter((req) => {
    if (statusFilter === "All") return true;
    return req.status === statusFilter;
  });

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
      setActiveDropdown(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen pb-10 relative">
      {/* ─── মোড ১: এডিট ভিউ মোড ─── */}
      {isEditing ? (
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 mt-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-10 h-10 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-500 hover:text-brand-dark transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-2xl font-black text-brand-dark tracking-tight">
                Edit <span className="text-brand-primary">Request</span>
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                Update the details for this blood requirement.
              </p>
            </div>
            <div className="ml-auto bg-amber-50 text-amber-700 border border-amber-100 text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">
              Current Status: {editFormData.status}
            </div>
          </div>

          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-10 shadow-sm flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  required
                  className="w-full bg-[#F8F9FA] border border-gray-100 px-4 py-3.5 rounded-2xl text-xs font-bold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                  District
                </label>
                <input
                  type="text"
                  value={editFormData.location}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      location: e.target.value,
                    })
                  }
                  required
                  className="w-full bg-[#F8F9FA] border border-gray-100 px-4 py-3.5 rounded-2xl text-xs font-bold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                  Upazila
                </label>
                <input
                  type="text"
                  value={editFormData.upazila}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      upazila: e.target.value,
                    })
                  }
                  required
                  className="w-full bg-white border-2 border-brand-primary/30 px-4 py-3.5 rounded-2xl text-xs font-bold text-brand-dark focus:outline-none focus:border-brand-primary transition-all shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                  Hospital Name
                </label>
                <input
                  type="text"
                  value={editFormData.hospital}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      hospital: e.target.value,
                    })
                  }
                  required
                  className="w-full bg-[#F8F9FA] border border-gray-100 px-4 py-3.5 rounded-2xl text-xs font-bold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                Full Detailed Address
              </label>
              <textarea
                rows={4}
                value={editFormData.fullAddress}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    fullAddress: e.target.value,
                  })
                }
                required
                className="w-full bg-[#F8F9FA] border border-gray-100 px-4 py-3.5 rounded-2xl text-xs font-bold text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 items-center mt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 text-gray-600 font-bold text-xs px-6 py-3.5 rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brand-primary text-white font-black text-xs px-6 py-3.5 rounded-xl hover:bg-brand-primary/95 transition-all shadow-md"
              >
                Update Request
              </button>
            </div>
          </form>
        </div>
      ) : (
        // ─── মোড ২: স্ট্যান্ডার্ড মেইন রিকোয়েস্ট টেবিল লিস্ট ভিউ ───
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-brand-dark tracking-tight">
                My <span className="text-brand-primary">Donation Requests</span>
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-1">
                Manage, filter, and track your active blood donation posts.
              </p>
            </div>

            <div className="relative flex items-center shrink-0">
              <span className="absolute left-3.5 text-gray-400 pointer-events-none">
                <Funnel className="w-3.5 h-3.5" />
              </span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white border border-gray-200 text-xs font-bold text-gray-600 pl-9 pr-8 py-2.5 rounded-xl focus:outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer shadow-sm"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm mt-2">
            {totalResults === 0 ? (
              <div className="p-16 text-center text-sm text-gray-400 font-medium">
                No requests found matching your criteria.
              </div>
            ) : (
              <div className="overflow-visible">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-light/30 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                      <th className="px-6 py-4.5 w-12 text-center">#</th>
                      <th className="px-6 py-4.5">Recipient Info</th>
                      <th className="px-6 py-4.5">Location</th>
                      <th className="px-6 py-4.5 text-center">Blood Group</th>
                      <th className="px-6 py-4.5">Status</th>
                      <th className="px-6 py-4.5 text-right pr-10">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs font-semibold text-brand-dark">
                    {currentItems.map((req, index) => (
                      <tr
                        key={req.id}
                        className="hover:bg-brand-light/20 transition-colors"
                      >
                        <td className="px-6 py-5 text-center font-bold text-gray-400">
                          {(indexOfFirstItem + index + 1)
                            .toString()
                            .padStart(2, "0")}
                        </td>

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

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                            <LocationArrow className="w-3.5 h-3.5 text-gray-400" />
                            <span>{req.location}, Bangladesh</span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex bg-brand-primary/10 text-brand-primary text-xs font-black px-2.5 py-1 rounded-lg">
                            {req.group}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                              req.status === "Done"
                                ? "bg-green-50 text-green-600 border border-green-100"
                                : "bg-amber-50 text-amber-600 border border-amber-100"
                            }`}
                          >
                            {req.status === "Done" ? (
                              <SealCheck className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {req.status}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right pr-10 relative">
                          <div
                            className="inline-block"
                            ref={activeDropdown === req.id ? dropdownRef : null}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === req.id ? null : req.id
                                )
                              }
                              className="p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-xl transition-all"
                            >
                              <EllipsisVertical className="w-4 h-4" />
                            </button>

                            {activeDropdown === req.id && (
                              <div className="absolute right-12 top-12 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-1.5 flex flex-col gap-0.5 text-left animate-fade-in">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedRequest(req);
                                    setActiveDropdown(null);
                                  }} // 👈 সেট রিকোয়েস্ট মোডাল ওপেন
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-gray-600 hover:text-brand-dark hover:bg-gray-50 rounded-xl transition-all"
                                >
                                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                                  View Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEditClick(req)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-gray-600 hover:text-brand-dark hover:bg-gray-50 rounded-xl transition-all"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-gray-400" />
                                  Edit Request
                                </button>
                                <div className="h-px bg-gray-50 my-1" />
                                <button
                                  type="button"
                                  onClick={() => handleDelete(req.id)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                  <TrashBin className="w-3.5 h-3.5 text-red-400" />
                                  Delete Request
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalResults > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 px-1">
              <span className="text-xs text-gray-400 font-medium">
                Showing{" "}
                <span className="font-bold text-brand-dark">
                  {indexOfFirstItem + 1}
                </span>{" "}
                to{" "}
                <span className="font-bold text-brand-dark">
                  {Math.min(indexOfLastItem, totalResults)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-brand-dark">
                  {totalResults}
                </span>{" "}
                results
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold shadow-sm ${
                        currentPage === page
                          ? "bg-brand-primary text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ─── 🌟 ৩. নতুন সংযোজিত প্রিমিয়াম View Details Modal Panel 🌟 ─── */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div
            ref={modalRef}
            className="bg-white border border-gray-100 rounded-[32px] w-full max-w-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6"
          >
            {/* Modal Title Header & Close Toggle */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-black text-brand-dark tracking-tight">
                  Request Details Overview
                </h3>
                <p className="text-[11px] text-gray-400 font-medium">
                  Detailed tracking information of the post
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 hover:text-brand-dark hover:bg-gray-100 flex items-center justify-center transition-all"
              >
                <Xmark className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Row Block */}
            <div className="flex items-center justify-between gap-4 bg-[#FFF8F6] p-4 rounded-2xl border border-brand-primary/5">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Patient Name
                </span>
                <span className="text-base font-black text-brand-dark">
                  {selectedRequest.name}
                </span>
              </div>
              <div className="bg-brand-primary text-white text-sm font-black px-4 py-2 rounded-xl shadow-sm">
                Blood: {selectedRequest.group}
              </div>
            </div>

            {/* Two Column Grid Information Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location Info Box */}
              <div className="flex gap-3 bg-[#FAFBFC] p-3.5 rounded-xl border border-gray-50">
                <Stethoscope className="w-4 h-4 text-brand-primary/70 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">
                    Medical Center
                  </span>
                  <span className="text-xs font-bold text-brand-dark leading-tight">
                    {selectedRequest.hospital}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {selectedRequest.upazila}, {selectedRequest.location}
                  </span>
                </div>
              </div>

              {/* Timing info Box */}
              <div className="flex gap-3 bg-[#FAFBFC] p-3.5 rounded-xl border border-gray-50">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">
                    Date & Schedule
                  </span>
                  <span className="text-xs font-bold text-brand-dark">
                    {selectedRequest.date || "N/A"}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-300" />{" "}
                    {selectedRequest.time || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Full Address Info */}
            <div className="flex flex-col gap-1 bg-[#FAFBFC] p-4 rounded-xl border border-gray-50">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                Full Detailed Address
              </span>
              <p className="text-xs font-medium text-gray-600 leading-relaxed">
                {selectedRequest.fullAddress || "No detailed address provided."}
              </p>
            </div>

            {/* Request Message Box Component */}
            <div className="bg-amber-50/40 border border-amber-100/60 p-4 rounded-xl flex gap-3 items-start">
              <Bulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest">
                  Message Notes
                </span>
                <p className="text-xs italic text-gray-600 font-medium leading-relaxed">
                  "{selectedRequest.message || "No custom notes attached."}"
                </p>
              </div>
            </div>

            {/* Footer Close Control Button */}
            <div className="flex justify-end pt-2 border-t border-gray-50">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="bg-brand-dark text-white font-black text-xs px-5 py-2.5 rounded-xl hover:bg-brand-dark/90 transition-all uppercase tracking-wider"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
