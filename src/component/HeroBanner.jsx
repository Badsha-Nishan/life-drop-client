import Image from "next/image";
import { Heart, Eye } from "@gravity-ui/icons";
import StatsCards from "./StatsCards";

export default async function HeroBanner() {
  // ব্যাকএন্ড থেকে আসা রিয়েল ডাটা (আপাতত হার্ডকোডেড)
  const stats = {
    activeDonors: "15+",
    totalFunding: "$12,886",
    totalRequests: "19",
  };

  return (
    <section className="relative w-full bg-white flex flex-col justify-between">
      {/* Immersive Dark Banner Wrapper */}
      <div className="relative w-full min-h-[550px] md:min-h-[600px] rounded-b-[40px] md:rounded-b-[60px] flex items-center justify-center px-4 overflow-hidden">
        {/* Next.js Optimized Background Image */}
        <Image
          src="/hero-image.jpg" // public/ ফোল্ডারে আপনার রাখা ইমেজ পাথ
          alt="Blood Donation Background"
          fill
          priority
          className="object-cover object-center z-0"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/55 z-10" />

        {/* Content Container */}
        <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 pt-10 pb-20">
          {/* Top Trust Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary animate-pulse" />
            Trusted by {stats.activeDonors} Local Heroes
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Saving Lives, <br />
            <span className="text-brand-primary">One Drop</span> at a Time
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-200/90 font-medium leading-relaxed">
            Connect directly with {stats.totalRequests} pending requests or join
            our community of donors to help save more lives.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
            <a
              href="/register"
              className="flex items-center justify-center gap-2 bg-brand-primary text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-brand-primary/90 active:scale-98 transition-all w-full sm:w-48 shadow-lg shadow-brand-primary/20"
            >
              Become a Donor &rarr;
            </a>

            <a
              href="/search"
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-white/30 active:scale-98 transition-all w-full sm:w-48"
            >
              Search Donors <Eye className="w-4 h-4 text-white/80" />
            </a>
          </div>
        </div>
      </div>

      {/* 📊 Client Component with Increase Count Animation */}
      <StatsCards rawStats={stats} />
    </section>
  );
}
