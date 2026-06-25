"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createUsers = async (newUsers) => {
  const res = await fetch(`${baseUrl}/api/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUsers),
  });
  const data = res.json();
  console.log("Server Response:", data);

  return data;
};
