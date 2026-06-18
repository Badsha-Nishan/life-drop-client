"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Thunderbolt, ShieldCheck } from "@gravity-ui/icons";

export default function FeaturedSection() {
  const features = [
    {
      icon: <Clock className="w-6 h-6 text-brand-primary" />,
      title: "Real-time Matching",
      description:
        "Connect instantly with verified blood donors within your specific district or upazila right when emergencies strike.",
      bgColor: "bg-red-50",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Secure Verification",
      description:
        "All requester and donor profiles are strictly monitored, maintaining full transparency and privacy protection.",
      bgColor: "bg-emerald-50",
    },
    {
      icon: <Thunderbolt className="w-6 h-6 text-amber-500" />,
      title: "Role-Based Platform",
      description:
        "Dedicated dashboard structures for Donors, Volunteers, and Admins to ensure a highly organized workflow.",
      bgColor: "bg-amber-50",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Zero Delay Logistics",
      description:
        "Track ongoing donation requests dynamically, changing statuses from pending to in-progress seamlessly.",
      bgColor: "bg-blue-50",
    },
  ];

  // Framer Motion staggered grid variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-brand-primary mb-3">
            Platform Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Optimized Features for Urgent Medical Response
          </p>
          <div className="w-12 h-1 bg-brand-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-brand-light/40 border border-gray-100 p-8 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-100 flex flex-col justify-between h-full"
            >
              <div>
                {/* Icon Wrapper */}
                <div
                  className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              {/* Minimal structural detail for design consistency */}
              <div className="w-0 h-0.5 bg-brand-primary mt-6 group-hover:w-full transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
