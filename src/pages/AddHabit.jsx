import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddHabit(){
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Morning');
  const [reminderTime, setReminderTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title, description, category, reminderTime, imageUrl,
        userEmail: user.email,
        userName: user.displayName || ''
      };
      await api.post('/habits', body);
      Swal.fire('Success', 'Habit added', 'success');
      navigate('/my-habits');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Add Habit</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea className="input" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required />
        <select className="input" value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Morning</option>
          <option>Work</option>
          <option>Fitness</option>
          <option>Evening</option>
          <option>Study</option>
        </select>
        <input className="input" type="time" value={reminderTime} onChange={e=>setReminderTime(e.target.value)} />
        <input className="input" placeholder="Image URL (optional)" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
        <div className="text-sm text-gray-600">Logged in as: {user?.email}</div>
        <button className="btn btn-primary w-full">Add</button>
      </form>
    </div>
  );
}
