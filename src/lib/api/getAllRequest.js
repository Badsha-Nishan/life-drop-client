"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllRequest = async () => {
  const res = await fetch(`${baseUrl}/api/donation-request`);
  const data = res.json();
  console.log("Server Response:", data);

  return data;
};
