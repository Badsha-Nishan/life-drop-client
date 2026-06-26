import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AllUsersClient from "./AllUsersClient";

export const dynamic = "force-dynamic";

export default async function AllUsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // ১. সিকিউরিটি চেক: লগইন না থাকলে বা এডমিন না হলে রিডাইরেক্ট
  if (!session?.user?.email) {
    redirect("/login");
  }

  // ডাটাবেজ থেকে রিয়েল-টাইম রোল চেক
  const userRes = await fetch(`${baseUrl}/api/users/${session.user.email}`, {
    cache: "no-store",
  });
  const dbUser = userRes.ok ? await userRes.json() : null;

  if (dbUser?.role?.toLowerCase() !== "admin") {
    redirect("/dashboard"); // এডমিন না হলে ড্যাশবোর্ডে ব্যাক পাঠাবে
  }

  // ২. সব ইউজারদের ডাটা ফেচ করা
  let users = [];
  try {
    const res = await fetch(`${baseUrl}/api/users`, { cache: "no-store" });
    if (res.ok) {
      users = await res.json();
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return <AllUsersClient initialUsers={users} />;
}
