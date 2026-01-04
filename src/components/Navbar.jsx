import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const defaultAvatar = 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png';

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4 lg:gap-8">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link
              to="/"
              className="text-2xl lg:text-3xl font-extrabold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              HabitHub
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link 
                to="/browse" 
                className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Browse Habits
              </Link>
              <Link 
                to="/about" 
                className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Contact
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/blog" 
                    className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Blog
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Not Logged In */}
            {!user && (
              <>
             <button
  onClick={() => navigate('/login')}
  className="
    btn btn-outline btn-sm font-semibold 
    border-primary-600 text-white 
    hover:bg-primary-600 hover:text-white 
    dark:border-primary-400 dark:text-white dark:hover:bg-primary-500 transition-all
  "
>
  Login
</button>




                <button 
                  onClick={() => navigate('/register')} 
                  className="btn btn-primary btn-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white transition-all hidden sm:inline-flex"
                >
                  Signup
                </button>
              </>
            )}

            {/* Logged In */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setOpen(o => !o)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={user.photoURL || defaultAvatar}
                    alt={user.displayName || "User Avatar"}
                    className="w-10 h-10 rounded-full border-2 border-primary-500 dark:border-primary-400 shadow-md"
                  />
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-60 z-20"
                    >
                      <p className="font-bold text-gray-800 dark:text-gray-200">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{user.email}</p>
                      <Link
                        to="/dashboard"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mb-2"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mb-2"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={async () => {
                          await logout();
                          setOpen(false);
                          navigate('/');
                        }}
                        className="btn btn-sm w-full bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-semibold"
                      >
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col gap-3">
                <Link 
                  to="/browse" 
                  className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Habits
                </Link>
                <Link 
                  to="/about" 
                  className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                {user && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/blog" 
                      className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </>
                )}
                {!user && (
                  <>
                    <button 
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="btn btn-outline btn-sm font-semibold border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 hover:bg-primary-600 hover:text-white text-left"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                      }}
                      className="btn btn-primary btn-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white"
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
