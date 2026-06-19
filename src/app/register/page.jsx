"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Person,
  Envelope,
  Lock,
  Key,
  Eye,
  EyeSlash,
  CloudArrowUpIn,
  LocationSign,
} from "@gravity-ui/icons";

// 🇧🇩 বাংলাদেশের জেলা ও উপজেলার রিয়েল ম্যাপ ডেটাবেজ (সহজ ব্যবহারের জন্য স্ট্রাকচার্ড)
const bangladeshGeocode = {
  Dhaka: ["Mirpur", "Uttara", "Dhanmondi", "Gulshan", "Savar", "Dohar"],
  Chittagong: ["Panchlaish", "Halishahar", "Hathazari", "Anwara", "Sitakunda"],
  Sylhet: ["Beanibazar", "Golapganj", "Fenchuganj", "Balaganj", "Zakiganj"],
  Rajshahi: ["Paba", "Bagha", "Godagari", "Tanore", "Mohanpur"],
  Khulna: ["Koyra", "Dacope", "Dumuria", "Rupsha", "Phultala"],
  Barisal: ["Babuganj", "Bakerganj", "Banaripara", "Gournadi", "Mehendiganj"],
  Rangpur: ["Mithapukur", "Pirganj", "Badarganj", "Gangachara", "Kaunia"],
  Mymensingh: ["Gaffargaon", "Ishwarganj", "Muktagachha", "Bhaluka", "Trishal"],
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    avatarUrl: "",
    phone: "",
  });

  const [upazilaList, setUpazilaList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔄 জেলা পরিবর্তন হলে উপজেলা ড্রপডাউন অটো আপডেট করার লজিক
  useEffect(() => {
    if (formData.district) {
      setUpazilaList(bangladeshGeocode[formData.district] || []);
      setFormData((prev) => ({ ...prev, upazila: "" })); // জেলা পাল্টালে উপজেলা রিসেট হবে
    } else {
      setUpazilaList([]);
    }
  }, [formData.district]);

  // 📷 ImgBB API-তে ইমেজ আপলোড করার কোর মেকানিজম
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const imgData = new FormData();
    imgData.append("image", file);

    try {
      // ⚠️ এখানে আপনার ImgBB API Key টি বসিয়ে নিবেন (.env ফাইল থেকে নেওয়া বেস্ট)
      const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY_HERE";

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imgData,
        }
      );

      const result = await response.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, avatarUrl: result.data.url }));
        alert("Avatar uploaded successfully to ImgBB!");
      } else {
        alert("Image upload failed. Please check your ImgBB API key.");
      }
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      alert("An error occurred during avatar upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    // 💡 এখানে ব্যাকএন্ডের রেজিস্ট্রেশন API কল হবে (formData পাঠানো হবে)
    console.log("Final Registration Data:", formData);

    setTimeout(() => {
      setIsLoading(false);
      alert("Registration submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-light/30 via-white to-brand-light/20 px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <Link
            href="/"
            className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4"
          >
            <Heart className="w-6 h-6 fill-brand-primary" />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-medium">
            Join our network of heroes and start saving lives today.
          </p>
        </div>

        {/* Form Grid */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 📸 Avatar Upload Box */}
          <div className="flex flex-col items-center gap-3 pb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Profile Picture
            </label>
            <label className="relative cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-gray-200 hover:border-brand-primary flex flex-col items-center justify-center overflow-hidden transition-colors bg-brand-light/40">
              {formData.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 gap-1">
                  <CloudArrowUpIn className="w-5 h-5 text-gray-400" />
                  <span className="text-[10px] font-bold">
                    {isUploading ? "Uploading..." : "Upload"}
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Person className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Alex Jon"
                  className="w-full bg-brand-light/60 px-11 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Envelope className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="alex@example.com"
                  className="w-full bg-brand-light/60 px-11 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Envelope className="w-4 h-4" />
                </span>
                <input
                  type="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter your phone number"
                  className="w-full bg-brand-light/60 px-11 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Blood Group Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Blood Group
              </label>
              <select
                required
                value={formData.bloodGroup}
                onChange={(e) =>
                  setFormData({ ...formData, bloodGroup: e.target.value })
                }
                className="w-full bg-brand-light/60 px-4 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all appearance-none"
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* District Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                District
              </label>
              <select
                required
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                className="w-full bg-brand-light/60 px-4 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
              >
                <option value="" disabled>
                  Select District
                </option>
                {Object.keys(bangladeshGeocode).map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila Selector (Conditionally rendered/enabled) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Upazila
              </label>
              <select
                required
                disabled={!formData.district}
                value={formData.upazila}
                onChange={(e) =>
                  setFormData({ ...formData, upazila: e.target.value })
                }
                className="w-full bg-brand-light/60 px-4 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  Select Upazila
                </option>
                {upazilaList.map((upz) => (
                  <option key={upz} value={upz}>
                    {upz}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:col-span-2">
              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full bg-brand-light/60 px-11 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeSlash className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400">
                    <Key className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="w-full bg-brand-light/60 px-11 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeSlash className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Registration Button */}
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="w-full flex items-center justify-center bg-brand-primary text-white font-bold text-sm px-6 py-4 rounded-xl hover:bg-brand-primary/90 disabled:opacity-70 active:scale-[0.99] transition-all shadow-lg shadow-brand-primary/10"
          >
            {isLoading ? "Creating Account..." : "Sign Up & Register"}
          </button>
        </form>

        {/* Redirect Bridge Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-primary font-bold hover:underline transition-all"
            >
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
