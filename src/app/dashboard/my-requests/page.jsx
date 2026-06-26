import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // আপনার অথ ফাইলের পাথ অনুযায়ী চেঞ্জ করবেন
import { getRequestByEmail } from "@/lib/api/getRequestByEmail";
import MyRequestsClient from "./MyRequestsClient"; // নিচে তৈরি করা ক্লায়েন্ট ফাইলটি

export default async function MyRequestsPage() {
  // ১. সার্ভার সাইড থেকে সেশন নেওয়া
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = {
    name: session?.user?.name || "Guest User",
    email: session?.user?.email || "",
  };

  // ২. সার্ভার সাইড থেকেই ইনিশিয়াল রিয়েল ডেটা ফেচ করা
  let initialRequests = [];
  if (user.email) {
    try {
      initialRequests = await getRequestByEmail(user.email);
    } catch (error) {
      console.error("Error loading initial requests:", error);
    }
  }

  // ৩. ডেটা প্রপ্স হিসেবে ক্লায়েন্ট কম্পোনেন্টে পাস করা
  return <MyRequestsClient user={user} initialRequests={initialRequests} />;
}
