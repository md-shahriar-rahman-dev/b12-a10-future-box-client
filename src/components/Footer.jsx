import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-12 border-t border-gray-800 dark:border-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-extrabold mb-4 text-white dark:text-gray-100">HabitHub</h3>
            <p className="text-sm leading-relaxed">
              Build better habits, one step at a time. Track progress, maintain streaks, and grow consistently. Our platform helps you stay focused and motivated every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white dark:text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors">
                  Browse Habits
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white dark:text-gray-100 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{' '}
                <a href="mailto:support@habithub.com" className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors">
                  support@habithub.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href="tel:+15551234567" className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li>Address: 123 Habit Street, Growth City</li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-bold text-white dark:text-gray-100 mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-800 pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-white dark:text-gray-100">HabitHub</span> — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
