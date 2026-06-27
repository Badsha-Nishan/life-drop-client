import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FundingClient from "./FundingClient";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function FundingPage({ searchParams }) {
  const params = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // 🎯 কোনো হার্ডকোডেড ডাটা ছাড়া ডিফল্ট অবজেক্ট রেডি করা হলো
  let stats = { totalFunding: 0 };
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
