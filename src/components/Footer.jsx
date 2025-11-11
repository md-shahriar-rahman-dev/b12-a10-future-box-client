import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
<footer className="relative bg-black/20 backdrop-blur-md text-gray-100 py-12">      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-2xl font-extrabold mb-2 text-white">HabitHub</h3>
          <p className="text-gray-100 text-sm">
            Build better habits, one step at a time 🌅. Track progress, maintain streaks, and grow consistently. Our platform helps you stay focused and motivated every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-white mb-2">Quick Links</h4>
          <ul className="text-gray-200 space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/add-habit" className="hover:underline">Add Habit</a></li>
            <li><a href="/my-habits" className="hover:underline">My Habits</a></li>
            <li><a href="/browse" className="hover:underline">Browse Public Habits</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold text-white mb-2">Contact</h4>
          <p className="text-gray-200 text-sm mb-1">Email: <a href="mailto:sahriarrrahman701@gmail.com" className="hover:underline">sahriarrahman701@gmail.com</a></p>
          <p className="text-gray-200 text-sm mb-1">Phone: <a href="tel:+8801518944542" className="hover:underline">+8801518944542</a></p>
          <p className="text-gray-200 text-sm">Address: 87 Ashkona Street, Dhaka City</p>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-bold text-white mb-2">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/SRTdarkhunter007/" className="hover:text-white transition transform hover:-translate-y-1 duration-300" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://x.com/" className="hover:text-white transition transform hover:-translate-y-1 duration-300" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="https://www.instagram.com/sr_tonmoy0769/" className="hover:text-white transition transform hover:-translate-y-1 duration-300" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/md-shahriar-rahman-369237296/" className="hover:text-white transition transform hover:-translate-y-1 duration-300" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 mt-5 border-t border-white/30 pt-4 text-center text-gray-100 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">HabitHub</span> — All Rights Reserved.
      </div>
    </footer>
  );
}
