import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FundingClient from "./FundingClient";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function FundingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // ব্যাকএন্ড থেকে টোটাল স্ট্যাটস এবং ফান্ডিং হিস্ট্রি আনা হচ্ছে
  let stats = { totalFunding: 12895 }; // ডিফল্ট বা হার্ডকোডেড ব্যাকআপ
  let history = [];

  try {
    const statsRes = await fetch(`${baseUrl}/api/admin/stats`, {
      cache: "no-store",
    });
    if (statsRes.ok) stats = await statsRes.json();

    const historyRes = await fetch(`${baseUrl}/api/funding-history`, {
      cache: "no-store",
    });
    if (historyRes.ok) history = await historyRes.json();
  } catch (error) {
    console.error("Error loading funding data:", error);
  }

  return (
    <FundingClient
      user={session.user}
      totalFunding={stats.totalFunding}
      initialHistory={history}
    />
  );
}
