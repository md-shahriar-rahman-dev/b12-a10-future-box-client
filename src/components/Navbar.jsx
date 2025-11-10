import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">HabitHub</Link>
          <Link to="/browse" className="text-sm text-gray-600">Browse Public Habits</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/add-habit" className="text-sm">Add Habit</Link>
          <Link to="/my-habits" className="text-sm">My Habits</Link>

          {!user && (
            <>
              <button onClick={()=>navigate('/login')} className="btn">Login</button>
              <button onClick={()=>navigate('/register')} className="btn btn-primary">Signup</button>
            </>
          )}

          {user && (
            <div className="relative">
              <button onClick={()=>setOpen(o=>!o)} className="flex items-center gap-2">
                <img src={user.photoURL || 'https://via.placeholder.com/40'} alt="avatar" className="w-10 h-10 rounded-full" />
              </button>
              {open && (
                <div className="absolute right-0 mt-2 p-3 bg-white border rounded shadow w-56 z-20">
                  <p className="font-semibold">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <button onClick={async ()=>{ await logout(); navigate('/'); }} className="mt-2 btn w-full text-left text-red-600">Log out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
