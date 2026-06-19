"use client";

import { useState } from "react";
import {
  Handset,
  Envelope,
  LocationArrow,
  PaperPlane,
} from "@gravity-ui/icons";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission logic here
    console.log("Contact Form Data:", formData);
    alert("Thank you! Your message has been received.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-24 bg-brand-light/30 border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-primary mb-3">
            Get In Touch
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Have Questions? Contact Us Directly
          </p>
          <div className="w-12 h-1 bg-brand-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Form and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Information (4 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40">
            <div>
              <h3 className="text-xl font-black text-brand-dark mb-3">
                Emergency Helpline
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-normal">
                Our team and voluntary supervisors are operational around the
                clock to support immediate medical escalations.
              </p>
            </div>

            <hr className="border-gray-100" />

            <div className="flex flex-col gap-6">
              {/* Phone Channel */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                  <Handset className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Call Support
                  </h4>
                  <p className="text-base font-bold text-brand-dark mt-0.5">
                    +880 1986862697
                  </p>
                </div>
              </div>

              {/* Email Channel */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                  <Envelope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Email Us
                  </h4>
                  <p className="text-base font-bold text-brand-dark mt-0.5 break-all">
                    badshanisan14@gmail.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                  <LocationArrow className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Headquarters
                  </h4>
                  <p className="text-base font-bold text-brand-dark mt-0.5">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full bg-brand-light px-4 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark placeholder-gray-400 focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="johndoe@example.com"
                    className="w-full bg-brand-light px-4 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark placeholder-gray-400 focus:outline-none focus:bg-white focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Type your message or inquiry details here..."
                  className="w-full bg-brand-light px-4 py-3.5 rounded-xl border border-transparent text-sm font-medium text-brand-dark placeholder-gray-400 focus:outline-none focus:bg-white focus:border-brand-primary resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group flex items-center justify-center gap-2.5 bg-brand-primary text-white font-bold text-sm px-6 py-4 rounded-xl hover:bg-brand-primary/90 active:scale-98 transition-all shadow-lg shadow-brand-primary/10 self-start w-full sm:w-auto"
              >
                Send Message
                <PaperPlane className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
