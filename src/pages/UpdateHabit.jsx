import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';

export default function UpdateHabit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    api
      .get(`/habits/${id}`)
      .then(res => setForm(res.data.habit || res.data))
      .catch(() => Swal.fire('Error', 'Cannot load habit', 'error'));
  }, [id]);

  if (!form) return <div className="p-6 text-center">Loading...</div>;

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedData } = form;
      await api.patch(`/habits/${id}`, updatedData);
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Habit updated successfully',
        showConfirmButton: false,
        timer: 2000
      });
      navigate(`/habits/${id}`);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white/40 backdrop-blur-md border border-yellow-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Update Habit</h2>
        <form onSubmit={submit} className="space-y-3">
          <input
            className="input w-full"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <textarea
  className="input w-full h-full resize-y overflow-y-auto"
  placeholder="Description"
  value={form.description}
  onChange={e => setForm({ ...form, description: e.target.value })}
/>
          <select
            className="input w-full"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
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
            value={form.reminderTime || ''}
            onChange={e => setForm({ ...form, reminderTime: e.target.value })}
          />
          <input
            className="input w-full"
            placeholder="Image URL"
            value={form.imageUrl || ''}
            onChange={e => setForm({ ...form, imageUrl: e.target.value })}
          />
          <button className="btn btn-primary w-full mt-3">Save</button>
        </form>
      </div>
    </div>
  );
}
