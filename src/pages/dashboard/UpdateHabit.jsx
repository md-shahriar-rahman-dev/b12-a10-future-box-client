import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Swal from 'sweetalert2';
import Spinner from '../../components/Spinner';

export default function UpdateHabit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/habits/${id}`)
      .then(res => setForm(res.data.habit || res.data))
      .catch(() => Swal.fire('Error', 'Cannot load habit', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={80} />
      </div>
    );
  }

  if (!form) return <div className="p-6 text-center">Habit not found.</div>;

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
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
      navigate('/dashboard/my-habits');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Update Habit
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Modify your habit details and settings.
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
              placeholder="Title"
              value={form.title || ''}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              className="input min-h-[120px]"
              placeholder="Description"
              value={form.description || ''}
              onChange={e => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              className="input"
              value={form.category || 'Morning'}
              onChange={e => setForm({ ...form, category: e.target.value })}
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
              value={form.reminderTime || ''}
              onChange={e => setForm({ ...form, reminderTime: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL (Optional)
            </label>
            <input
              className="input"
              placeholder="Image URL"
              value={form.imageUrl || ''}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            />
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
              disabled={saving}
              className="btn btn-primary flex-1"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

