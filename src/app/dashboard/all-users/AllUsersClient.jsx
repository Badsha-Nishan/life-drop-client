"use client";

import { useState } from "react";
import { EllipsisVertical } from "@gravity-ui/icons";

export default function AllUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      <div>
        <h2 className="text-2xl font-black text-brand-dark tracking-tight">
          All Users
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          Manage system users, update roles, and review account statuses.
        </p>
      </div>

      {/* ইউজার টেবিল কন্টেইনার */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4.5 w-16 text-center">#</th>
                <th className="px-6 py-4.5">User Details</th>
                <th className="px-6 py-4.5">Email Address</th>
                <th className="px-6 py-4.5 text-center">Role</th>
                <th className="px-6 py-4.5 text-center">Status</th>
                <th className="px-6 py-4.5 w-16 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-semibold text-brand-dark">
              {users.map((item, index) => {
                const roleLower = item.role?.toLowerCase() || "donor";
                const statusLower = item.status?.toLowerCase() || "active";

                return (
                  <tr
                    key={item._id}
                    className="hover:bg-brand-light/10 transition-colors"
                  >
                    {/* সিরিয়াল */}
                    <td className="px-6 py-4 text-center font-bold text-gray-300">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>

                    {/* ইউজার ইনফো (ছবি + নাম) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.image || "https://i.ibb.co/Mx8BKPs1/images.png"
                          }
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-100"
                        />
                        <span className="text-sm font-black text-brand-dark">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* ইমেইল */}
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {item.email}
                    </td>

                    {/* রোল ব্যাজ */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          roleLower === "admin"
                            ? "bg-purple-50 text-purple-600"
                            : roleLower === "volunteer"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-50 text-gray-500"
                        }`}
                      >
                        {item.role || "donor"}
                      </span>
                    </td>

                    {/* স্ট্যাটাস পিল */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          statusLower === "active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            statusLower === "active"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        {item.status || "active"}
                      </span>
                    </td>

                    {/* থ্রি-ডট অ্যাকশন মেনু */}
                    <td className="px-6 py-4 text-center">
                      <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-brand-dark transition-all">
                        <EllipsisVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
