import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function MyHabits(){
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if (!user) return;
    api.get('/habits/my')
      .then(res => setHabits(res.data.habits || res.data || []))
      .catch(()=>{})
      .finally(()=>setLoading(false));
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
      setHabits(habits.map(h => h._id===id ? res.data.habit : h));
      Swal.fire('Nice', 'Marked complete', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">My Habits</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th><th>Category</th><th>Streak</th><th>Created</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map(h => (
            <tr key={h._id}>
              <td>{h.title}</td>
              <td>{h.category}</td>
              <td>{h.currentStreak || 0}</td>
              <td>{new Date(h.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/update/${h._id}`} className="btn btn-sm mr-2">Update</Link>
                <button onClick={()=>remove(h._id)} className="btn btn-sm mr-2">Delete</button>
                <button onClick={()=>mark(h._1d || h._id)} className="btn btn-sm btn-primary">Mark Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
