"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateRequest = async (requestId, updatedData) => {
  const res = await fetch(`${baseUrl}/api/donation-request/id/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return await res.json();
};
