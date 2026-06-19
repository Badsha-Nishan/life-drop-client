"use client";

import { useEffect, useState } from "react";
import { Person, CircleDollar, Droplet } from "@gravity-ui/icons";

// অ্যানিমেশনের জন্য কাস্টম কাউন্টার হুক
function useCounter(targetValue, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // যদি ডাটাতে স্ট্রিং থাকে (যেমন: "$12,886" বা "15+"), শুধু সংখ্যাটুকু বের করে নেওয়া
    const numericTarget = parseInt(targetValue.replace(/[^0-8]/g, ""), 10) || 0;
    if (numericTarget === 0) {
      setCount(targetValue);
      return;
    }

    let start = 0;
    const end = numericTarget;
    const totalMiliseconds = duration;
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(totalMiliseconds / frameRate);
    let currentFrame = 0;

    const counterInterval = setInterval(() => {
      currentFrame++;
      // Ease-out টাইমিং ফাংশন যাতে শেষের দিকে এসে গতি কমে যায়
      const progress = currentFrame / totalFrames;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.round(easeOutProgress * end);

      if (currentFrame >= totalFrames) {
        clearInterval(counterInterval);
        setCount(targetValue); // একদম শেষে অরিজিনাল ফরম্যাট (+ বা $ সহ) সেট হবে
      } else {
        // পেমেন্টের সংখ্যার জন্য কমা ফরম্যাট দেওয়া
        if (targetValue.includes("$")) {
          setCount(`$${currentCount.toLocaleString()}`);
        } else if (targetValue.includes("+")) {
          setCount(`${currentCount}+`);
        } else {
          setCount(currentCount);
        }
      }
    }, frameRate);

    return () => clearInterval(counterInterval);
  }, [targetValue, duration]);

  return count;
}

export default function StatsCards({ rawStats }) {
  // কাস্টম হুক কল করা হচ্ছে
  const animatedDonors = useCounter(rawStats.activeDonors);
  const animatedFunding = useCounter(rawStats.totalFunding);
  const animatedRequests = useCounter(rawStats.totalRequests);

  return (
    <div className="max-w-6xl mx-auto w-full px-4 -mt-20 sm:-mt-16 relative z-30 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Active Donors */}
      <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-xl shadow-gray-200/40 border border-gray-100 min-h-[160px] text-center transition-transform hover:-translate-y-1">
        <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-3">
          <Person className="w-5 h-5" />
        </div>
        <span className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight tabular-nums">
          {animatedDonors}
        </span>
        <span className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-gray-400 mt-1">
          Active Donors
        </span>
      </div>

      {/* Card 2: Total Funding */}
      <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-xl shadow-gray-200/40 border border-gray-100 min-h-[160px] text-center transition-transform hover:-translate-y-1">
        <div className="w-10 h-10 bg-brand-primary/5 text-brand-primary rounded-xl flex items-center justify-center mb-3">
          <CircleDollar className="w-5 h-5" />
        </div>
        <span className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight tabular-nums">
          {animatedFunding}
        </span>
        <span className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-gray-400 mt-1">
          Total Funding
        </span>
      </div>

      {/* Card 3: Total Requests */}
      <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-xl shadow-gray-200/40 border border-gray-100 min-h-[160px] text-center transition-transform hover:-translate-y-1">
        <div className="w-10 h-10 bg-brand-primary/5 text-brand-primary rounded-xl flex items-center justify-center mb-3">
          <Droplet className="w-5 h-5" />
        </div>
        <span className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight tabular-nums">
          {animatedRequests}
        </span>
        <span className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-gray-400 mt-1">
          Total Requests
        </span>
      </div>
    </div>
  );
}
