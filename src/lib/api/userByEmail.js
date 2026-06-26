// src/lib/api/userByEmail.js

export async function getUserByEmail(email) {
  // ইমেইল না থাকলে এপিআই কল করারই দরকার নেই, সরাসরি null রিটার্ন করবে
  if (!email || email === "undefined") {
    console.error("getUserByEmail: Email is missing or undefined!");
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const res = await fetch(`${baseUrl}/api/users/${email}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data;
}
