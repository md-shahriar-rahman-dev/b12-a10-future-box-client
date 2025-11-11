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
    <div>
      <h2 className="text-2xl mb-4">My Habits</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Streak</th>
            <th className="p-2">Created</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map(h => (
            <tr key={h._id} className="border-t">
              <td className="p-2">{h.title}</td>
              <td className="p-2">{h.category}</td>
              <td className="p-2">{h.currentStreak || 0}</td>
              <td className="p-2">{new Date(h.createdAt).toLocaleDateString()}</td>
              <td className="p-2">
                <Link to={`/update/${h._id}`} className="btn btn-sm mr-2">Update</Link>
                <button onClick={() => remove(h._id)} className="btn btn-sm mr-2">Delete</button>
                <button onClick={() => mark(h._id)} className="btn btn-sm btn-primary">Mark Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
