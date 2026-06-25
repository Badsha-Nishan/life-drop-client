// app/register/page.jsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // আপনার ব্যাকএন্ড BetterAuth ইনস্ট্যান্স পাথ
import RegisterFormClient from "./RegisterFormClient";

export default async function RegisterPage({ searchParams }) {
  // ১. সার্ভার সাইডেই সেশন চেক করা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ২. ইউজার অলরেডি লগইন থাকলে রিডাইরেক্ট লজিক
  if (session) {
    const resolvedParams = await searchParams;
    const callbackUrl = resolvedParams?.callbackUrl;

    if (callbackUrl) {
      redirect(callbackUrl);
    } else {
      redirect("/dashboard");
    }
  }

  return <RegisterFormClient />;
}
