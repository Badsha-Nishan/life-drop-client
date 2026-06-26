import { auth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import { headers } from "next/headers";

export default async function DashboardPage() {
  // ১. সার্ভার সাইড থেকে সেশন নেওয়া
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const sessionEmail = session?.user?.email;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  let dbUser = null;
  let initialRequests = [];
  let adminStats = null;

  if (sessionEmail) {
    try {
      // 🌟 ট্রিক: সেশনের রোলের ওপর ভরসা না করে সরাসরি ব্যাকএন্ড থেকে তাজা ডাটা আনা হচ্ছে
      const userRes = await fetch(`${baseUrl}/api/users/${sessionEmail}`, {
        cache: "no-store",
      });

      if (userRes.ok) {
        dbUser = await userRes.json();
      }

      // ২. ডাটাবেজ থেকে পাওয়া রিয়েল-টাইম রোল অনুযায়ী কন্ডিশনাল ডেটা ফেচিং
      const currentRole = dbUser?.role || "donor";

      if (currentRole.toLowerCase() === "admin") {
        // ইউজার এডমিন হলে এডমিন ড্যাশবোর্ডের স্ট্যাটস ফেচ হবে
        const statsRes = await fetch(`${baseUrl}/api/admin/stats`, {
          cache: "no-store",
        });
        if (statsRes.ok) {
          adminStats = await statsRes.json();
        }
      } else {
        // ইউজার সাধারণ ডোনার হলে শুধু তার নিজের ব্লাড রিকোয়েস্টগুলো ফেচ হবে
        const res = await fetch(
          `${baseUrl}/api/donation-request/${sessionEmail}`,
          {
            cache: "no-store",
          }
        );
        if (res.ok) {
          initialRequests = await res.json();
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  // ৩. ফাইনাল ইউজার অবজেক্ট তৈরি (ডাটাবেজের রিয়েল-টাইম রোল সহ)
  const user = {
    name: dbUser?.name || session?.user?.name || "Guest User",
    email: sessionEmail || "",
    role: dbUser?.role || "donor", // এখানে এখন ডাটাবেজের 'admin' রোলটি আসবে
  };

  return (
    <DashboardClient
      user={user}
      initialRequests={initialRequests}
      adminStats={adminStats}
    />
  );
}
