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
      className="card group relative overflow-hidden hover:-translate-y-1 transition-all duration-300"
    >
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={habit.imageUrl || 'https://picsum.photos/600/300'}
          alt={habit.title}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://picsum.photos/600/300';
          }}
        />
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {habit.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {(habit.description || '').slice(0, 80)}
          {(habit.description || '').length > 80 ? '...' : ''}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          By {habit.userName || habit.userEmail || 'Unknown'}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-secondary-600 dark:text-secondary-400 font-semibold text-sm flex items-center gap-1">
            🔥 {habit.currentStreak || 0}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
            {habit.category || 'General'}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleViewDetails}
            className="btn btn-primary flex-1 text-center text-sm"
          >
            View Details
          </button>
          {user && (
            <button
              onClick={markComplete}
              className="btn btn-outline flex-1 text-center text-sm"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
