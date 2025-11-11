import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function HabitCard({ habit: initialHabit }) {
  const [habit, setHabit] = useState(initialHabit);
  const { user } = useAuth();
  const navigate = useNavigate();

  const markComplete = async () => {
    if (!user) return Swal.fire('Login required', 'Please login to mark complete', 'info');
    try {
      const res = await api.post(`/habits/${habit._id}/complete`);
      const updated = res.data.habit || res.data;
      setHabit(updated);
      Swal.fire('Nice!', res.data.message || 'Marked complete for today', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  const handleViewDetails = () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login to view full habit details.',
        confirmButtonText: 'Login'
      }).then(() => navigate('/login'));
      return;
    }
    navigate(`/habits/${habit._id}`);
  };

  return (
    <div
      className="group relative overflow-hidden bg-white/80 backdrop-blur-md border border-gray-200 
                 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 
                 hover:-translate-y-1 hover:bg-gradient-to-br from-yellow-50 to-white"
    >
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={habit.imageUrl || 'https://picsum.photos/600/300'}
          alt={habit.title}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
          {habit.title}
        </h3>
        <p className="text-sm text-gray-600">
          {(habit.description || '').slice(0, 80)}
          {(habit.description || '').length > 80 ? '...' : ''}
        </p>
        <p className="text-xs text-gray-500">
          By {habit.userName || habit.userEmail || 'Unknown'}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-green-600 font-semibold text-sm">
            🔥 Streak: {habit.currentStreak || 0}
          </span>
          <span className="text-xs text-gray-400 italic">
            {habit.category || 'General'}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleViewDetails}
            className="btn btn-primary flex-1 text-center transition-transform hover:scale-[1.03]"
          >
            View Details
          </button>
          {user && (
            <button
              onClick={markComplete}
              className="btn flex-1 text-center transition-transform hover:scale-[1.03]"
            >
              Complete
            </button>
          )}
        </div>
      </div>

      {/* Glow overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
    </div>
  );
}
