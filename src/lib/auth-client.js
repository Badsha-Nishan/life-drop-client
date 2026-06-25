import { createAuthClient } from "better-auth/react"; // বা vanilla/next-plugins যা ব্যবহার করছেন

export const authClient = createAuthClient({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // 💡 ক্লায়েন্টকেও বলে দিন যে আমরা এই কাস্টম ফিল্ডগুলো নিয়ে কাজ করছি
  user: {
    fields: ["phone", "bloodGroup", "district", "upazila", "role", "status"],
  },
});
