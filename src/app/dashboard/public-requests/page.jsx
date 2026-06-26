import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PublicRequestsClient from "./PublicRequestsClient";

export const dynamic = "force-dynamic";

export default async function PublicRequestsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userRes = await fetch(`${baseUrl}/api/users/${session.user.email}`, {
    cache: "no-store",
  });
  const dbUser = userRes.ok ? await userRes.json() : null;

  if (dbUser?.role?.toLowerCase() !== "admin") {
    redirect("/dashboard");
  }

  let allRequests = [];
  try {
    const res = await fetch(`${baseUrl}/api/donation-request`, {
      cache: "no-store",
    });
    if (res.ok) {
      allRequests = await res.json();
    }
  } catch (error) {
    console.error("Error fetching all donation requests:", error);
  }

  return <PublicRequestsClient initialRequests={allRequests} />;
}
