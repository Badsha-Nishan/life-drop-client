import { auth } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const sessionEmail = session?.user?.email;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  let dbUser = null;
  let initialRequests = [];
  let adminStats = null;
  let volunteerStats = null; // ভলান্টিয়ারের জন্য নতুন ডাটা হোল্ডার

  if (sessionEmail) {
    try {
      const userRes = await fetch(`${baseUrl}/api/users/${sessionEmail}`, {
        cache: "no-store",
      });

      if (userRes.ok) {
        dbUser = await userRes.json();
      }

      const currentRole = (dbUser?.role || "donor").toLowerCase();

      // ৩টি রোলের জন্য কন্ডিশনাল ডাটা ফেচিং
      if (currentRole === "admin") {
        const statsRes = await fetch(`${baseUrl}/api/admin/stats`, {
          cache: "no-store",
        });
        if (statsRes.ok) {
          adminStats = await statsRes.json();
        }
      } else if (currentRole === "volunteer") {
        // রিয়েল প্রজেক্ট রিকোয়ারমেন্ট: ভলান্টিয়ারের জন্য আলাদা কোনো এপিআই থাকলে তা এখানে আসবে
        const volunteerRes = await fetch(`${baseUrl}/api/volunteer/stats`, {
          cache: "no-store",
        });
        if (volunteerRes.ok) {
          volunteerStats = await volunteerRes.json();
        }
      } else {
        // সাধারণ donor হলে শুধুমাত্র তার নিজের তৈরি করা রিকোয়েস্টগুলো আসবে
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

  const user = {
    name: dbUser?.name || session?.user?.name || "Guest User",
    email: sessionEmail || "",
    role: dbUser?.role || "donor",
  };

  return (
    <DashboardClient
      user={user}
      initialRequests={initialRequests}
      adminStats={adminStats}
      volunteerStats={volunteerStats} // ক্লায়েন্ট কম্পোনেন্টে প্রপ পাস করা হলো
    />
  );
}
