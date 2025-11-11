import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const defaultAvatar = 'https://i.ibb.co/1rH0P4J/default-avatar.png';

  return (
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left section */}
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="text-3xl font-extrabold text-yellow-400 hover:text-yellow-300 transition-all duration-200"
          >
            HabitHub
          </Link>
          <Link 
            to="/browse" 
            className="text-base font-semibold text-white hover:text-yellow-300 transition-all duration-200"
          >
            Browse Public Habits
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          <Link 
            to="/add-habit" 
            className="text-sm font-semibold text-white hover:text-yellow-300 transition-all duration-200"
          >
            Add Habit
          </Link>
          <Link 
            to="/my-habits" 
            className="text-sm font-semibold text-white hover:text-yellow-300 transition-all duration-200"
          >
            My Habits
          </Link>

          {/* Not Logged In */}
          {!user && (
            <>
              <button 
                onClick={() => navigate('/login')} 
                className="btn btn-outline btn-sm font-bold border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')} 
                className="btn btn-primary btn-sm font-bold bg-yellow-400 hover:bg-yellow-300 transition-all duration-200"
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
                  className="w-11 h-11 rounded-full border-2 border-yellow-400 shadow-md"
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 p-4 bg-white border rounded-lg shadow-xl w-60 z-20"
                  >
                    <p className="font-bold text-gray-800">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500 mb-3">{user.email}</p>
                    <button
                      onClick={async () => {
                        await logout();
                        setOpen(false);
                        navigate('/');
                      }}
                      className="btn btn-sm w-full bg-red-100 hover:bg-red-200 text-red-600 font-bold"
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
    </nav>
  );
}
