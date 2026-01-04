import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Calendar, CheckCircle, Target } from 'lucide-react';

const COLORS = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

export default function DashboardOverview() {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalHabits: 0,
    activeStreaks: 0,
    totalCompletions: 0,
    completionRate: 0,
  });

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api.get('/habits/my')
      .then(res => {
        const data = res.data.habits || res.data || [];
        setHabits(data);
        calculateStats(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const calculateStats = (habitsData) => {
    const totalHabits = habitsData.length;
    const activeStreaks = habitsData.reduce((sum, h) => sum + (h.currentStreak || 0), 0);
    const totalCompletions = habitsData.reduce((sum, h) => sum + (h.completionHistory?.length || 0), 0);
    
    // Calculate completion rate (last 30 days)
    const last30Days = habitsData.reduce((sum, h) => {
      const completions = (h.completionHistory || []).filter(d => {
        const dt = new Date(d);
        return (Date.now() - dt.getTime()) <= 1000 * 60 * 60 * 24 * 30;
      }).length;
      return sum + (completions / 30) * 100;
    }, 0);
    const completionRate = totalHabits > 0 ? Math.round(last30Days / totalHabits) : 0;

    setStats({
      totalHabits,
      activeStreaks,
      totalCompletions,
      completionRate,
    });
  };

  // Prepare data for charts
  const categoryData = habits.reduce((acc, habit) => {
    const cat = habit.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // Bar chart data - habits by streak
  const barData = habits.slice(0, 5).map(h => ({
    name: h.title?.substring(0, 15) || 'Habit',
    streak: h.currentStreak || 0,
  }));

  // Line chart data - completion trend (last 7 days)
  const lineData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const completions = habits.reduce((sum, h) => {
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.displayName || 'User'}! Here's your habit tracking summary.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Habits</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {stats.totalHabits}
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Target className="text-primary-600 dark:text-primary-400" size={24} />
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
            <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
              <TrendingUp className="text-secondary-600 dark:text-secondary-400" size={24} />
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
              <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {stats.completionRate}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Top Habits by Streak */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Top Habits by Streak
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
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

        {/* Pie Chart - Habits by Category */}
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
      </div>

      {/* Line Chart - Completion Trend */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Completion Trend (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
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

      {/* Data Table */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Recent Habits
        </h2>
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
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {habits.slice(0, 10).map((habit) => (
                <tr key={habit._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {habit.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {habit.category || 'General'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      {habit.currentStreak || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {habits.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No habits yet. Start by adding your first habit!
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

