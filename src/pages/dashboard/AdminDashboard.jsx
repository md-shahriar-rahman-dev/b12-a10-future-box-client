import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import Swal from 'sweetalert2';
import {
  Users,
  Target,
  TrendingUp,
  Trash2,
  Shield,
  BarChart3,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const COLORS = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHabits: 0,
    totalCompletions: 0,
    activeStreaks: 0,
  });
  const [allHabits, setAllHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Fetch all habits (you may need to adjust the API endpoint)
      const habitsRes = await api.get('/habits/public');
      const habits = habitsRes.data.habits || habitsRes.data || [];
      setAllHabits(habits);

      // Calculate statistics
      const uniqueUsers = new Set(habits.map(h => h.userEmail || h.userId)).size;
      const totalCompletions = habits.reduce((sum, h) => sum + (h.completionHistory?.length || 0), 0);
      const activeStreaks = habits.reduce((sum, h) => sum + (h.currentStreak || 0), 0);

      setStats({
        totalUsers: uniqueUsers,
        totalHabits: habits.length,
        totalCompletions,
        activeStreaks,
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    const result = await Swal.fire({
      title: 'Delete Habit?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/habits/${habitId}`);
        setAllHabits(allHabits.filter(h => h._id !== habitId));
        Swal.fire('Deleted!', 'Habit has been deleted.', 'success');
        fetchAdminData();
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete habit.', 'error');
      }
    }
  };

  // Category distribution
  const categoryData = allHabits.reduce((acc, habit) => {
    const cat = habit.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // Habits by streak
  const streakData = allHabits
    .sort((a, b) => (b.currentStreak || 0) - (a.currentStreak || 0))
    .slice(0, 5)
    .map(h => ({
      name: h.title?.substring(0, 15) || 'Habit',
      streak: h.currentStreak || 0,
    }));

  // Completion trends (last 7 days)
  const completionTrend = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const completions = allHabits.reduce((sum, h) => {
      return sum + ((h.completionHistory || []).includes(dateStr) ? 1 : 0);
    }, 0);
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completions,
    };
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={80} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-primary-600 dark:text-primary-400" size={32} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor the entire HabitHub platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {stats.totalUsers}
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Users className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Habits</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {stats.totalHabits}
              </p>
            </div>
            <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
              <Target className="text-secondary-600 dark:text-secondary-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Completions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {stats.totalCompletions}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Active Streaks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {stats.activeStreaks}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Habits by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Habits by Streak */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Top Habits by Streak
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={streakData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="streak" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Completion Trend */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Completion Trend (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={completionTrend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
            <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="completions"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* All Habits Management */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          All Habits Management
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
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
              {allHabits.slice(0, 20).map((habit) => (
                <tr key={habit._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {habit.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {habit.userName || habit.userEmail || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
                      {habit.category || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-secondary-600 dark:text-secondary-400">
                      {habit.currentStreak || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteHabit(habit._id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {allHabits.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No habits found.
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

