"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getRequestByEmail = async (email) => {
  const res = await fetch(`${baseUrl}/api/donation-request/${email}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();

  console.log("Server Response:", data);

  return data;
};
