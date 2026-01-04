import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { Edit, Trash2, CheckCircle2, Plus } from 'lucide-react';

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
    const result = await Swal.fire({
      title: 'Confirm',
      text: 'Delete this habit?',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it'
    });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/habits/${id}`);
      setHabits(habits.filter(h => h._id !== id));
      Swal.fire('Deleted', 'Habit removed successfully', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  const mark = async (id) => {
    try {
      const res = await api.post(`/habits/${id}/complete`);
      const updated = res.data.habit || res.data;
      setHabits(habits.map(h => h._id === id ? updated : h));
      Swal.fire('Nice!', 'Marked complete for today', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={80} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            My Habits
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your habits.
          </p>
        </div>
        <Link
          to="/dashboard/add-habit"
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Habit
        </Link>
      </div>

      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Streak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {habits.map(h => (
                <tr key={h._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {h.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
                      {h.category || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">
                      🔥 {h.currentStreak || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(h.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/update/${h._id}`}
                        className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => mark(h._id)}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors"
                        title="Mark Complete"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                      <button
                        onClick={() => remove(h._id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {habits.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-lg font-medium mb-2">No habits yet</p>
                      <p className="text-sm mb-4">Start by adding your first habit!</p>
                      <Link
                        to="/dashboard/add-habit"
                        className="btn btn-primary inline-flex items-center gap-2"
                      >
                        <Plus size={20} />
                        Add Your First Habit
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

