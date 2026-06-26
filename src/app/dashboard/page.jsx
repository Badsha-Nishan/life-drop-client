// app/dashboard/page.jsx
import { auth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import { headers } from "next/headers";

export default async function DashboardPage() {
  // ১. সার্ভার সাইড থেকে সেশন নেওয়া
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = {
    name: session?.user?.name || "Guest User",
    email: session?.user?.email || "",
  };

  let initialRequests = [];

  if (user?.email) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      // আপনার সেই ফিক্সড এপিআই যা ইমেইল দিয়ে ডেটা এনে দেয়
      const res = await fetch(`${baseUrl}/api/donation-request/${user.email}`, {
        cache: "no-store", // রিয়েল-টাইম ডেটার জন্য
      });
      if (res.ok) {
        initialRequests = await res.json();
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  return <DashboardClient user={user} initialRequests={initialRequests} />;
}
