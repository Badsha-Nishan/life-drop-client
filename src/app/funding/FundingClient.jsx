"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileDollar, ArrowUpRight, ShieldCheck } from "@gravity-ui/icons";

export default function FundingClient({ user, totalFunding, initialHistory }) {
  console.log("Histity", initialHistory);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(25); // ডিফল্ট ইউজার ইনপুট অ্যামাউন্ট

  const isSuccess = searchParams.get("success");
  const isCanceled = searchParams.get("canceled");

  // ফান্ড দেওয়ার মেইন ফাংশন
  const handleGiveFund = async () => {
    setLoading(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          userEmail: user.email,
          userName: user.name,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // স্ট্রাইপ পেজে রিডাইরেক্ট
      } else {
        alert("Failed to initiate payment. Try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savePayment = async () => {
      const sessionId = searchParams.get("session_id");
      const successParam = searchParams.get("success");
      const amountParam = searchParams.get("amount");

      if (successParam === "true" && sessionId) {
        try {
          const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
          const res = await fetch(`${baseUrl}/api/save-funding`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userName: user.name,
              userEmail: user.email,
              amount: amountParam, // 🎯 ফিক্সড: searchParams.get() ব্যবহার করা হলো
              sessionId: sessionId,
            }),
          });

          if (res.ok) {
            // 🔄 ডাটাবেজে সেভ হওয়ার পর স্ক্রিন রিফ্রেশ করে নতুন ডাটা আনা ও ইউআরএল ক্লিন করা
            router.replace("/funding");
            router.refresh();
          }
        } catch (err) {
          console.error("Payment save failed", err);
        }
      }
    };
    savePayment();
  }, [searchParams, router, user]);

  return (
    <div className="flex flex-col gap-8 md:px-20 py-10 animate-fade-in w-full">
      {/* ─── TOP SECTION ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-brand-dark tracking-tight">
            <span className="text-xl font-bold text-green-500 tracking-tight">
              Life<span className="text-brand-primary">Drop</span>
            </span>{" "}
            Funding
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Contribute to our foundation and support emergency blood transfers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 pl-2">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-16 text-sm font-black text-brand-dark outline-none bg-transparent"
            min="1"
          />
          <button
            onClick={handleGiveFund}
            disabled={loading}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-brand-primary/10 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Give Fund"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── STATUS TOASTS ─── */}
      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-2xl flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Thank you! Your donation of ${searchParams.get("amount")} was
          processed successfully.
        </div>
      )}
      {isCanceled && (
        <div className="p-4 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold rounded-2xl">
          Payment canceled. No funds were deducted.
        </div>
      )}

      {/* ─── STATS CARD ─── */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-4 relative overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <FileDollar className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Live
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400">
              Total Funding
            </span>
            <span className="text-2xl font-black text-brand-dark mt-1">
              ${(totalFunding || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ─── FUNDING HISTORY TABLE ─── */}
      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider">
          Recent Contributions
        </h3>
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4">Donor Name</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4 text-right">Amount Provided</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs font-semibold text-brand-dark">
                {initialHistory.length === 0 ? (
                  <tr>
                    {/* 🎯 ফিক্স: ৪টি কলামের জন্য colSpan="4" করা হয়েছে */}
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-400 font-medium"
                    >
                      No global funding transactions recorded yet.
                    </td>
                  </tr>
                ) : (
                  initialHistory.map((item) => {
                    // 📆 ডেট এবং টাইমকে সুন্দরভাবে ফরম্যাট করা হলো (যেমন: Jun 27, 2026 • 02:08 PM)
                    const displayDate = item.fundingDate
                      ? `${new Date(item.fundingDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )} • ${new Date(item.fundingDate).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}`
                      : "N/A";

                    return (
                      <tr key={item._id} className="hover:bg-brand-light/5">
                        <td className="px-6 py-4 font-black">
                          {item.userName}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {item.userEmail}
                        </td>
                        {/* 🎯 ফরম্যাটেড ডেট এখানে বসানো হলো */}
                        <td className="px-6 py-4 text-gray-400 font-medium">
                          {displayDate}
                        </td>
                        <td className="px-6 py-4 text-right text-emerald-600 font-black">
                          ${item.amount}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
