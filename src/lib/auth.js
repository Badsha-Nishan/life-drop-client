import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("lifedrop");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  // ─── 🎯 কাস্টম ফিল্ড ম্যাপিং (BetterAuth স্ট্রাকচার) ───
  user: {
    fields: {
      phone: { type: "string", required: false },
      bloodGroup: { type: "string", required: false },
      district: { type: "string", required: false },
      upazila: { type: "string", required: false },
      role: { type: "string", required: false },
      status: { type: "string", required: false },
    },
    // 🔥 ফ্রন্টএন্ড থেকে সরাসরি ইনপুট নেওয়ার জন্য এটি ১০০% আবশ্যিক
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
