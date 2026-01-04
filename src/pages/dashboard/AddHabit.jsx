import React, { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddHabit() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Morning');
  const [reminderTime, setReminderTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      navigate('/dashboard/my-habits');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Add New Habit
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new habit to track and build consistency.
        </p>
      </div>

      <div className="card p-8">
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              className="input"
              placeholder="e.g., Morning Meditation"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              className="input min-h-[120px]"
              placeholder="Describe your habit and its benefits..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              className="input"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option>Morning</option>
              <option>Work</option>
              <option>Fitness</option>
              <option>Evening</option>
              <option>Study</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reminder Time (Optional)
            </label>
            <input
              className="input"
              type="time"
              value={reminderTime}
              onChange={e => setReminderTime(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Set a daily reminder time for this habit
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL (Optional)
            </label>
            <input
              className="input"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Add an image to make your habit more visual
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/my-habits')}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? 'Adding...' : 'Add Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

