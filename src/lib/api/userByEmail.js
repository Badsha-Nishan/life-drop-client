"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUserByEmail = async (email) => {
  const res = await fetch(`${baseUrl}/api/users/${email}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();

  console.log("Server Response:", data);

  return data;
};
