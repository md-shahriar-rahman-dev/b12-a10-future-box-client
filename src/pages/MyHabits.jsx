// src/pages/MyHabits.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function MyHabits() {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api.get('/habits/my')
      .then(res => setHabits(res.data.habits || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const remove = async (id) => {
    const ok = await Swal.fire({ title:'Confirm', text:'Delete this habit?', showCancelButton:true }).then(r=>r.isConfirmed);
    if (!ok) return;
    await api.delete(`/habits/${id}`);
    setHabits(habits.filter(h=>h._id !== id));
    Swal.fire('Deleted','Habit removed','success');
  };

  const mark = async (id) => {
    try {
      const res = await api.post(`/habits/${id}/complete`);
      const updated = res.data.habit || res.data;
      setHabits(habits.map(h => h._id === id ? updated : h));
      Swal.fire('Nice', 'Marked complete', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  if (loading) return <div className="p-6"><Spinner size={6} /></div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white/30 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">My Habits</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border-b border-gray-300">Title</th>
              <th className="p-2 border-b border-gray-300">Category</th>
              <th className="p-2 border-b border-gray-300">Streak</th>
              <th className="p-2 border-b border-gray-300">Created</th>
              <th className="p-2 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {habits.map(h => (
              <tr key={h._id} className="border-t border-gray-300">
                <td className="p-2">{h.title}</td>
                <td className="p-2">{h.category}</td>
                <td className="p-2">{h.currentStreak || 0}</td>
                <td className="p-2">{new Date(h.createdAt).toLocaleDateString()}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  <Link to={`/update/${h._id}`} className="btn btn-sm">Update</Link>
                  <button onClick={() => remove(h._id)} className="btn btn-sm">Delete</button>
                  <button onClick={() => mark(h._id)} className="btn btn-sm btn-primary">Mark Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
