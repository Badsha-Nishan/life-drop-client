// app/login/page.jsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // আপনার ব্যাকএন্ড BetterAuth ইনস্ট্যান্স পাথ
import LoginFormClient from "./LoginFormClient";

export default async function LoginPage() {
  // ১. সার্ভার সাইডেই সেশন চেক করা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ২. ইউজার অলরেডি লগইন থাকলে সরাসরি ড্যাশবোর্ডে রিডাইরেক্ট
  if (session) {
    redirect("/dashboard");
  }

  return <LoginFormClient />;
}
