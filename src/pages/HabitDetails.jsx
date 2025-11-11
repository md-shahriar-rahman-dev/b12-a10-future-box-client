import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

export default function HabitDetails() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    api.get(`/habits/${id}`)
      .then(res => setHabit(res.data.habit || res.data))
      .catch(() => Swal.fire('Error', 'Could not load habit details', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const markComplete = async () => {
    if (!user) return Swal.fire('Login required', 'Please login to mark complete', 'info');
    try {
      const res = await api.post(`/habits/${id}/complete`);
      const updated = res.data.habit || res.data;
      setHabit(updated);
      Swal.fire('Done', res.data.message || 'Marked complete', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  if (loading) return <div className="p-6"><Spinner size={6} /></div>;
  if (!habit) return <div className="p-6">Loading...</div>;

  const progressPercent = (() => {
    const last30 = (habit.completionHistory || []).filter(d => {
      const dt = new Date(d);
      return (Date.now() - dt.getTime()) <= 1000 * 60 * 60 * 24 * 30;
    }).length;
    return Math.round((last30 / 30) * 100);
  })();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border border-yellow-200">
        <img
          src={habit.imageUrl || 'https://via.placeholder.com/800x350'}
          alt={habit.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold">{habit.title}</h1>
          <p className="text-sm text-gray-500">By {habit.userName || habit.userEmail}</p>
          <p className="text-gray-700">{habit.description}</p>

          <div className="mt-4 space-y-2">
            <p className="font-semibold text-gray-700">
              🔥 Current Streak: <span className="text-green-600">{habit.currentStreak || 0}</span>
            </p>
            <p className="font-semibold text-gray-700">Progress (last 30 days):</p>
            <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
              <div className="bg-green-500 h-4 rounded" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            {user && (
              <button
                onClick={markComplete}
                className="btn bg-green-500 text-white hover:bg-green-600"
              >
                Mark Complete
              </button>
            )}
            {habit.userId === (user?.uid || user?.email) && (
              <Link to={`/update/${id}`} className="btn btn-secondary">
                Update Habit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
