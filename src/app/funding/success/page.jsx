"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Copy } from "@gravity-ui/icons";
import { Suspense } from "react";

function FundingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amount = searchParams.get("amount") || "0";
  // একটি ডেমো ট্রানজেকশন আইডি জেনারেট করা হলো ট্র্যাকিং দেখানোর জন্য
  const transactionId =
    "TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white max-w-md w-full rounded-[32px] border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* 🌟 গ্রিন সাকসেস অ্যানিমেটেড আইকন */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/10">
          <ShieldCheck className="w-8 h-8" />
        </div>

        {/* হেডার টেক্সট */}
        <h2 className="text-2xl font-black text-brand-dark tracking-tight">
          Donation Successful!
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-1 max-w-[280px]">
          Thank you for your generous contribution. Your support helps us save
          innocent lives.
        </p>

        {/* 💰 ডোনেশন অ্যামাউন্ট ডিসপ্লে */}
        <div className="my-6 bg-gray-50 border border-gray-100/50 rounded-2xl p-4 w-full flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Amount Contributed
          </span>
          <span className="text-3xl font-black text-brand-dark mt-1">
            ${Number(amount).toLocaleString()}
          </span>
        </div>

        {/* 📋 ট্রানজেকশন ডিটেইলস */}
        <div className="w-full flex flex-col gap-3 text-xs font-semibold text-brand-dark mb-8">
          <div className="flex justify-between items-center py-1 border-b border-gray-50">
            <span className="text-gray-400">Payment Status</span>
            <span className="text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
              Completed
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-400">Transaction ID</span>
            <span className="font-mono text-gray-500 flex items-center gap-1">
              {transactionId}
              <button
                onClick={() => navigator.clipboard.writeText(transactionId)}
                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
              >
                <Copy className="w-3 h-3" />
              </button>
            </span>
          </div>
        </div>

        {/* ─── ACTION BUTTONS ─── */}
        <div className="flex flex-col gap-2 w-full">
          <Link
            href="/dashboard/funding"
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md shadow-brand-primary/10 flex items-center justify-center gap-2"
          >
            Go Back to Funding
          </Link>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FundingSuccess() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FundingSuccessPage></FundingSuccessPage>
    </Suspense>
  );
}
