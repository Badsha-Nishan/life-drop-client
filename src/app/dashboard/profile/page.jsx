// app/profile/page.jsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // আপনার BetterAuth ইনস্ট্যান্স পাথ
// import { getUserByEmail } from "@/lib/actions/users"; // আপনার তৈরি করা অ্যাকশন ফাইল পাথ
import ProfileFormClient from "./ProfileFormClient";
import { getUserByEmail } from "@/lib/api/userByEmail";

export default async function ProfilePage() {
  // ১. সার্ভার সাইড সেশন গেট করা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // সেশন না থাকলে লগইন পেজে পাঠানো
  if (!session?.user) {
    redirect("/login?callbackUrl=/profile");
  }

  // ২. আপনার তৈরি করা ফাংশন দিয়ে ইমেইল অনুযায়ী রিয়েল ইউজার ডেটা ফেচ করা
  const dbUser = await getUserByEmail(session.user.email);

  if (!dbUser) {
    return (
      <div className="p-8 text-center font-bold text-red-500">
        User profile data not found in database.
      </div>
    );
  }

  // ৩. রিয়েল ডেটা ক্লায়েন্ট ফর্মে প্রপ্স হিসেবে পাঠানো
  return <ProfileFormClient initialUser={dbUser} />;
}
