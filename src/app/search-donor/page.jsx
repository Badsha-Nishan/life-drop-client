"use client";

import { useState, useEffect } from "react";
import { Magnifier, MapPin, Envelope } from "@gravity-ui/icons";
import districtData from "@/data/districts.json";
import upazilaData from "@/data/upazilas.json";

export default function SearchDonorPage() {
  const [bloodGroup, setBloodGroup] = useState("Select Group");
  const [district, setDistrict] = useState("Select District");
  const [upazila, setUpazila] = useState("Select Upazila");

  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const districts = districtData[2]?.data || [];
  const allUpazilas = upazilaData[2]?.data || [];
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // 🔄 ডিস্ট্রিক্ট চেঞ্জ হলে উপজেলা ফিল্টার করার এফেক্ট
  useEffect(() => {
    if (district && district !== "Select District") {
      const selectedDistrictObj = districts.find(
        (d) => d.name.toLowerCase() === district.toLowerCase()
      );

      if (selectedDistrictObj) {
        const upz = allUpazilas.filter(
          (u) => u.district_id === selectedDistrictObj.id
        );
        setFilteredUpazilas(upz);
      } else {
        setFilteredUpazilas([]);
      }
    } else {
      setFilteredUpazilas([]);
    }
    setUpazila("Select Upazila");
  }, [district, districts, allUpazilas]);

  // 🎯 ব্যাকএন্ড কল করার মূল ফাংশন
  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

      // 🎯 শুধু যেগুলো ইউজার আসলেই সিলেক্ট করেছে, সেগুলোই অবজেক্টে নিচ্ছি
      const params = {};

      if (bloodGroup && bloodGroup !== "Select Group") {
        params.bloodGroup = bloodGroup;
      }

      if (district && district !== "Select District") {
        params.district = district;
      }

      if (upazila && upazila !== "Select Upazila") {
        params.upazila = upazila;
      }

      // অবজেক্টটিকে কুয়েরি স্ট্রিং-এ রূপান্তর করছি
      const queryParams = new URLSearchParams(params).toString();

      const res = await fetch(`${baseUrl}/api/search-donors?${queryParams}`);
      if (res.ok) {
        const data = await res.json();
        setDonors(data);
      } else {
        setDonors([]);
      }
    } catch (error) {
      console.error("Error searching donors:", error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
        {/* ─── HEADER TITLE ─── */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl sm:text-5xl font-black text-brand-dark tracking-tight">
            Find a <span className="text-brand-primary">Blood Donor</span>
          </h1>
          <p className="text-sm text-gray-400 font-bold max-w-md mx-auto">
            Connecting heroes with those in need. Search by group and location.
          </p>
        </div>

        {/* ─── SEARCH PANEL ─── */}
        <div className="w-full bg-white p-4 sm:p-6 rounded-[32px] border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Blood Group */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
              Blood Group
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100/70 rounded-xl px-4 py-3 text-xs font-bold text-brand-dark outline-none cursor-pointer"
            >
              <option>Select Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
              District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100/70 rounded-xl px-4 py-3 text-xs font-bold text-brand-dark outline-none cursor-pointer"
            >
              <option>Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
              Upazila
            </label>
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              disabled={district === "Select District"}
              className="w-full bg-gray-50 border border-gray-100/70 rounded-xl px-4 py-3 text-xs font-bold text-brand-dark outline-none cursor-pointer disabled:opacity-50"
            >
              <option>Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black h-[44px] rounded-xl transition-all shadow-md shadow-brand-primary/15 flex items-center justify-center gap-2 disabled:opacity-80"
          >
            <Magnifier className="w-4 h-4" />
            {loading ? "Searching..." : "Search Donors"}
          </button>
        </div>

        {/* ─── DYNAMIC RESULTS / EMPTY STATES ─── */}
        <div className="w-full flex flex-col gap-6 items-center">
          {/* ⏳ ৪. ডাটা লোড হওয়ার সময়ের কঙ্কাল লোডার (Skeleton Loader) */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-5 animate-pulse"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="w-12 h-6 bg-gray-200 rounded-xl" />
                  </div>
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                  <div className="space-y-2 pt-2 border-t border-gray-50">
                    <div className="w-full h-3 bg-gray-100 rounded" />
                    <div className="w-2/3 h-3 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ১. ইনিশিয়াল স্টেট */}
          {!searched && !loading && (
            <div className="bg-white/50 border border-dashed border-gray-200 rounded-[32px] p-12 max-w-xl w-full text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center relative animate-pulse">
                <div className="w-4 h-4 rounded-full bg-brand-primary absolute -top-1 -right-1 border-2 border-white"></div>
                <span className="text-brand-primary text-xl font-black">
                  🩸
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-black text-brand-dark">
                  Ready to find a hero?
                </h3>
                <p className="text-xs text-gray-400 font-medium max-w-[280px] mx-auto">
                  Select a blood group and location to see available donors.
                </p>
              </div>
            </div>
          )}

          {/* ২. কোনো ডোনার খুঁজে না পাওয়া গেলে */}
          {searched && !loading && donors.length === 0 && (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-12 text-center max-w-md w-full">
              <span className="text-3xl">🔍</span>
              <h3 className="text-base font-black text-brand-dark mt-3">
                No Active Donors Found
              </h3>
              <p className="text-xs text-gray-400 font-semibold mt-1">
                Try expanding your search parameters or selecting another
                region.
              </p>
            </div>
          )}

          {/* ৩. ডোনার কার্ড লিস্ট */}
          {searched && !loading && donors.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-5 hover:border-brand-primary/20 transition-all relative overflow-hidden group"
                >
                  <span className="absolute top-4 right-4 bg-brand-primary/10 text-brand-primary text-xs font-black px-3 py-1 rounded-xl">
                    {donor.bloodGroup || "N/A"}
                  </span>

                  <div className="flex items-center gap-4">
                    <img
                      src={
                        donor.image || "https://i.ibb.co/Mx8BKPs1/images.png"
                      }
                      alt={donor.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-50"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-sm font-black text-brand-dark truncate">
                        {donor.name}
                      </h4>
                      <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest bg-brand-primary/5 px-2 py-0.5 rounded-md mt-1 w-max">
                        {donor.role || "Donor"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-gray-50 text-xs font-semibold text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">
                        {donor.upazila}, {donor.district}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Envelope className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate text-gray-400 font-medium">
                        {donor.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
