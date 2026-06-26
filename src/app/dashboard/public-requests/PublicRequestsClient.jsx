"use client";

import { useState } from "react";
import { LocationArrow, Clock, SealCheck, EllipsisVertical } from "@gravity-ui/icons";

export default function PublicRequestsClient({ initialRequests }) {
  const [requests] = useState(initialRequests);

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      <div>
        <h2 className="text-2xl font-black text-brand-dark tracking-tight">
          Public Blood Requests
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          Global overview of all active and completed blood donation requests on
          LifeDrop.
        </p>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4.5 w-12 text-center">#</th>
                <th className="px-6 py-4.5">Recipient Info</th>
                <th className="px-6 py-4.5">Location</th>
                <th className="px-6 py-4.5 text-center">Blood Group</th>
                <th className="px-6 py-4.5 text-center">Status</th>
                <th className="px-6 py-4.5 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-semibold text-brand-dark">
              {requests.map((req, index) => (
                <tr
                  key={req._id}
                  className="hover:bg-brand-light/10 transition-colors"
                >
                  <td className="px-6 py-4 text-center font-bold text-gray-300">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-black text-brand-dark">
                        {req.recipientName}
                      </span>
                      <span className="text-xs text-gray-400 font-normal">
                        {req.hospitalName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                      <LocationArrow className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex bg-brand-primary/10 text-brand-primary text-xs font-black px-2.5 py-1 rounded-lg">
                      {req.bloodGroup}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
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
                      {req.donationStatus || "Pending"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-brand-dark transition-all">
                      <EllipsisVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
