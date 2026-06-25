// app/dashboard/page.jsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // আপনার ব্যাকএন্ড BetterAuth ইনস্ট্যান্স পাথ
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  // ১. সার্ভার সাইডেই সিকিউরলি সেশন এবং ইউজার ডাটা তুলে আনা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ২. লগইন করা না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট করা (প্রোটেকশন)
  if (!session) {
    redirect("/login");
  }

  // ৩. ইউজারের ডাটা ক্লায়েন্ট কম্পোনেন্টে পাস করা
  return <DashboardClient user={session.user} />;
}
