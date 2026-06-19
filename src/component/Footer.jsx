"use client";

import Link from "next/link";
import { Heart, Envelope, Handset, LocationArrow } from "@gravity-ui/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-800">
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                <Heart className="w-5 h-5 fill-brand-primary group-hover:fill-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Life<span className="text-brand-primary">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              An optimized platform connecting visionaries, volunteers, and
              heroes together to facilitate immediate medical blood donation
              workflows seamlessly.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li>
                <Link
                  href="/donation-requests"
                  className="hover:text-brand-primary transition-colors"
                >
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-brand-primary transition-colors"
                >
                  Search Donors
                </Link>
              </li>
              <li>
                <Link
                  href="/funding"
                  className="hover:text-brand-primary transition-colors"
                >
                  Funding & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Emergency Contact
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-normal text-gray-400">
              <li className="flex items-center gap-2.5">
                <Handset className="w-4 h-4 text-brand-primary" />
                <span>+880 1986862697</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Envelope className="w-4 h-4 text-brand-primary" />
                <span className="break-all">badshanisan14@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <LocationArrow className="w-4 h-4 text-brand-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Latest Social Rebrand (Strictly containing X logo) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Follow Our Journey
            </h4>
            <p className="text-xs text-gray-400 font-normal leading-relaxed">
              Stay tuned to our updates and community impact milestones via
              social channels.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {/* ⚠️ Mandatory X Logo Rebrand */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-white hover:text-black text-white transition-all duration-300"
                aria-label="Follow us on X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* General Placeholder for structural balance */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-brand-primary hover:text-white text-white transition-all duration-300"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-500 font-medium">
          <p>
            &copy; {currentYear} LifeFlow Organization. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
