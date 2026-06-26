// app/donation-requests/[id]/page.jsx
import { getRequestById } from "@/lib/api/getRequestById";
import DonationRequestDetailsClient from "./DonationRequestDetailsClient";
import { notFound } from "next/navigation";

export default async function DonationRequestDetailsPage({ params }) {
  const { id } = await params;

  let rawData = null;
  try {
    rawData = await getRequestById(id);
  } catch (error) {
    console.error("Error fetching request details:", error);
  }

  if (!rawData) {
    notFound();
  }

  // ১. ডেটা যদি অ্যারে হিসেবে আসে, তবে তার ১ম উপাদান (অবজেক্ট) বের করে আনা
  const requestData = Array.isArray(rawData) ? rawData[0] : rawData;

  // ২. আইডি-টি অ্যারে বা অবজেক্ট হলে সেটিকে পিওর স্ট্রিং এ রূপান্তর করা
  let cleanId = id;
  if (requestData && requestData._id) {
    cleanId = Array.isArray(requestData._id)
      ? requestData._id[0]
      : requestData._id.$oid || requestData._id.toString();
  }

  // ৩. ফাইনাল অবজেক্ট তৈরি যা ক্লায়েন্ট কম্পোনেন্ট সহজে পড়তে পারবে
  const serializedRequest = {
    ...requestData,
    _id: cleanId,
  };

  return (
    <DonationRequestDetailsClient
      initialRequest={serializedRequest}
      id={cleanId}
    />
  );
}
