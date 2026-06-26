"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getRequestById = async (id) => {
  const res = await fetch(`${baseUrl}/api/donation-request/id/${id}`, {
    cache: "no-store", // লেটেস্ট ডেটার জন্য ক্যাশ অফ রাখা হলো
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
};
