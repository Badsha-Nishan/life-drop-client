import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // আপনার BetterAuth ইনস্ট্যান্স পাথ
import { getAllRequest } from "@/lib/api/getAllRequest";
import DonationRequestsClient from "./DonationRequestsClient";

export default async function DonationRequestsPage() {
  // ১. BetterAuth দিয়ে সার্ভার সাইড সেশন গেট করা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session?.user;

  // ২. মঙ্গোডিবি থেকে রিয়েল ডেটা ফেচ করা হচ্ছে
  let allRequests = [];
  try {
    allRequests = await getAllRequest();
  } catch (error) {
    console.error("Error loading real donation requests:", error);
  }

  return (
    <DonationRequestsClient
      initialRequests={allRequests}
      isLoggedIn={isLoggedIn}
    />
  );
}
