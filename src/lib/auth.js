import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("lifedrop");

export const auth = betterAuth({
  // ১. ডাটাবেজ অ্যাডাপ্টার এখানে শেষ (ব্র্যাকেট ক্লোজিং খেয়াল করুন 👇)
  database: mongodbAdapter(db, {
    client,
  }),

  // ২. BetterAuth এর মূল কনফিগারেশন রুট লেভেলে থাকবে (ফ্রি/আলাদাভাবে)
  emailAndPassword: {
    enabled: true,
  },

  user: {
    fields: {
      phone: { type: "string", required: true },
      bloodGroup: { type: "string", required: true },
      district: { type: "string", required: true },
      upazila: { type: "string", required: true },
      role: { type: "string", required: true },
      status: { type: "string", required: true },
    },
    additionalFields: [
      "phone",
      "bloodGroup",
      "district",
      "upazila",
      "role",
      "status",
    ],
  },
});
