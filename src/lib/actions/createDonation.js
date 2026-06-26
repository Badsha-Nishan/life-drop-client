"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDonation = async (newRequestData) => {
  const res = await fetch(`${baseUrl}/api/donation-request`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newRequestData),
  });
  const data = res.json();
  console.log("Server Response:", data);

  return data;
};
