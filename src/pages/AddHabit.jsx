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
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Habit added successfully',
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/my-habits');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message
      });
    }
  };

  return (
    <div className="flex justify-center items-start min-h-[80vh] py-12">
      <div className="bg-white/70 backdrop-blur-md rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Habit</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="input w-full"
            placeholder="Title"
            value={title}
            onChange={e=>setTitle(e.target.value)}
            required
          />
          <textarea
            className="input w-full"
            placeholder="Description"
            value={description}
            onChange={e=>setDescription(e.target.value)}
            required
          />
          <select
            className="input w-full"
            value={category}
            onChange={e=>setCategory(e.target.value)}
          >
            <option>Morning</option>
            <option>Work</option>
            <option>Fitness</option>
            <option>Evening</option>
            <option>Study</option>
          </select>
          <input
            className="input w-full"
            type="time"
            value={reminderTime}
            onChange={e=>setReminderTime(e.target.value)}
          />
          <input
            className="input w-full"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={e=>setImageUrl(e.target.value)}
          />
          <div className="text-sm text-gray-600">Logged in as: {user?.email}</div>
          <button className="btn btn-primary w-full py-3">Add</button>
        </form>
      </div>
    </div>
  );
}
