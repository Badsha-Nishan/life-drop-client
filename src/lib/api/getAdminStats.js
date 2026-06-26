// src/lib/api/getAdminStats.js

export async function getAdminStats() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${baseUrl}/api/admin/stats`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch admin stats");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { totalDonors: 0, totalFunding: 0, bloodRequests: 0 };
  }
}
