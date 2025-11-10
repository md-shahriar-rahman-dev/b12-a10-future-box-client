import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

export default function HabitDetails(){
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const { user } = useAuth();

  useEffect(()=>{
    api.get(`/habits/${id}`)
      .then(res => setHabit(res.data.habit || res.data))
      .catch(err => Swal.fire('Error','Could not load','error'));
  }, [id]);

  if (!habit) return <div className="p-6">Loading...</div>;

  const mark = async () => {
    try {
      const res = await api.post(`/habits/${id}/complete`);
      setHabit(res.data.habit);
      Swal.fire('Done','Marked complete','success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  // progress percent (last 30 days)
  const progressPercent = (() => {
    const last30 = (habit.completionHistory || []).filter(d=>{
      const dt = new Date(d);
      return (Date.now() - dt.getTime()) <= 1000*60*60*24*30;
    }).length;
    return Math.round((last30 / 30) * 100);
  })();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={habit.imageUrl || 'https://via.placeholder.com/800x350'} alt={habit.title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl mt-4">{habit.title}</h1>
      <p className="text-sm text-gray-500">By {habit.userName || habit.userEmail}</p>
      <p className="mt-4">{habit.description}</p>

      <div className="mt-4">
        <div className="mb-2">Progress (last 30 days):</div>
        <div className="w-full bg-gray-200 rounded h-4">
          <div className="bg-green-500 h-4 rounded" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="mt-2">Streak: <span className="font-bold">{habit.currentStreak||0}</span></div>
      </div>

      <div className="mt-4">
        <button onClick={mark} className="btn btn-primary mr-2">Mark Complete</button>
        {habit.userId === (user?.uid || user?.email) && <Link to={`/update/${id}`} className="btn">Update</Link>}
      </div>
    </div>
  );
}
