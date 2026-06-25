import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // আপনার ব্যাকএন্ড BetterAuth ইনস্ট্যান্স পাথ
import LoginFormClient from "./LoginFormClient";

// Next.js সার্ভার কম্পোনেন্টে searchParams সরাসরি প্রপস হিসেবে পাওয়া যায়
export default async function LoginPage({ searchParams }) {
  // ১. সার্ভার সাইডেই সেশন চেক করা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ২. ইউজার অলরেডি লগইন থাকলে রিডাইরেক্ট লজিক
  if (session) {
    // ইউআরএল থেকে callbackUrl রিড করা হচ্ছে (যেমন: /donation-requests/1)
    const resolvedParams = await searchParams;
    const callbackUrl = resolvedParams?.callbackUrl;

    if (callbackUrl) {
      // যদি কোনো নির্দিষ্ট পেজে যাওয়ার কথা থাকে, তবে সেখানে রিডাইরেক্ট হবে
      redirect(callbackUrl);
    } else {
      // কোনো callbackUrl না থাকলে ডিফল্ট ড্যাশবোর্ডে যাবে
      redirect("/dashboard");
    }
  }

  return <LoginFormClient />;
}
