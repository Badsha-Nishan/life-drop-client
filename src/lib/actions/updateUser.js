"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateUser = async (email, userData) => {
  const res = await fetch(`${baseUrl}/api/users/${email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return await res.json();
};
