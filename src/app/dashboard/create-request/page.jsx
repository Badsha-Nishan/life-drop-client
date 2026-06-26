// app/donation-request/page.jsx
// import { auth } from "@/auth"; // অথবা আপনার প্রজেক্টের NextAuth / সেশন হ্যান্ডলারের পাথ
import { auth } from "@/lib/auth";
import CreateRequestClient from "./CreateRequestClient";
import { headers } from "next/headers";

export const metadata = {
  title: "Create Donation Request | Blood Platform",
};

export default async function CreateRequestPage() {
  // সার্ভার সাইড থেকে লগইন করা ইউজারের ডেটা নেওয়া হলো
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = {
    name: session?.user?.name || "Guest User",
    email: session?.user?.email || "",
  };

  return <CreateRequestClient user={user} />;
}
