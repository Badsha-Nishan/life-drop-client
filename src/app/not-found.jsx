import Link from "next/link";
import { ChevronLeft, TriangleExclamation } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6 bg-white border border-gray-100 rounded-[32px] p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Background Decorative Drop Asset */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light/20 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Icon & 404 Badge */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100/50 shadow-sm animate-bounce">
            <TriangleExclamation className="w-10 h-10" />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
            404
          </span>
        </div>

        {/* Heading & Text */}
        <div className="flex flex-col gap-2 mt-2">
          <h2 className="text-2xl font-black text-brand-dark tracking-tight">
            Request <span className="text-brand-primary">Not Found</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
            The donation request you are looking for might have been deleted,
            completed, or the link is invalid.
          </p>
        </div>

        <hr className="w-full border-gray-50 my-2" />

        {/* Action Button */}
        <Link
          href="/donation-requests"
          className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/95 active:scale-98 text-white font-black text-xs py-4 rounded-xl transition-all shadow-md shadow-brand-primary/10 uppercase tracking-wider"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Public Feed
        </Link>
      </div>
    </div>
  );
}
