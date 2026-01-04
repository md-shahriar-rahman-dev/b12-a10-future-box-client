import React, { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  Plus, 
  List, 
  User, 
  LogOut, 
  Menu, 
  X,
  Sun,
  Moon,
  Shield
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const defaultAvatar = 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png';
  const userIsAdmin = user && isAdmin(user.email);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/add-habit', label: 'Add Habit', icon: Plus },
    { path: '/dashboard/my-habits', label: 'My Habits', icon: List },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    ...(userIsAdmin ? [{ path: '/dashboard/admin', label: 'Admin Panel', icon: Shield }] : []),
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2">
                HabitHub
                {userIsAdmin && <span className="text-sm text-secondary-600 dark:text-secondary-400">(Admin)</span>}
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative group">
                <div className="flex items-center gap-3 cursor-pointer">
                  <img
                    src={user?.photoURL || defaultAvatar}
                    alt={user?.displayName || 'User'}
                    className="w-10 h-10 rounded-full border-2 border-primary-500"
                  />
                  <span className="hidden md:block text-gray-700 dark:text-gray-300 font-medium">
                    {user?.displayName || 'User'}
                  </span>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {userIsAdmin && (
                      <Link
                        to="/dashboard/admin"
                        className="block px-4 py-2 text-sm text-secondary-600 dark:text-secondary-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Home
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } transition-transform duration-300 ease-in-out lg:transition-none`}
        >
          <div className="h-full pt-16 lg:pt-0 flex flex-col">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
