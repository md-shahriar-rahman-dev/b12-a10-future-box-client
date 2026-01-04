import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import SkeletonLoader from '../components/SkeletonLoader';
import defaultHabitImg from '../assets/defHabit.jpg';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
} from 'recharts';
import { CheckCircle2, Calendar, TrendingUp, Award, Clock, User, Edit, ArrowLeft } from 'lucide-react';

export default function HabitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    api.get(`/habits/${id}`)
      .then(res => setHabit(res.data.habit || res.data))
      .catch(() => {
        Swal.fire('Error', 'Could not load habit details', 'error');
        navigate('/browse');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const markComplete = async () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login to mark this habit as complete.',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
      }).then((result) => {
        if (result.isConfirmed) navigate('/login');
      });
      return;
    }
    try {
      const res = await api.post(`/habits/${id}/complete`);
      const updated = res.data.habit || res.data;
      setHabit(updated);
      Swal.fire('Success!', res.data.message || 'Habit marked as complete for today', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-8">
        <SkeletonLoader type="details" />
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="max-w-5xl mx-auto py-8 text-center">
        <div className="card p-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Habit Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The habit you're looking for doesn't exist.</p>
          <Link to="/browse" className="btn btn-primary">
            Browse Habits
          </Link>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const progressPercent = (() => {
    const last30 = (habit.completionHistory || []).filter(d => {
      const dt = new Date(d);
      return (Date.now() - dt.getTime()) <= 1000 * 60 * 60 * 24 * 30;
    }).length;
    return Math.round((last30 / 30) * 100);
  })();

  const totalCompletions = habit.completionHistory?.length || 0;
  const longestStreak = habit.longestStreak || habit.currentStreak || 0;

  // Prepare chart data (last 7 days)
  const lineChartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const formatted = d.toISOString().split('T')[0];
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: habit.completionHistory?.includes(formatted) ? 1 : 0,
    };
  });

  // Bar chart data (last 30 days completion)
  const barChartData = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const formatted = d.toISOString().split('T')[0];
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: habit.completionHistory?.includes(formatted) ? 1 : 0,
    };
  });

  const isOwner = habit.userId === (user?.uid || user?.email);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Main Habit Card */}
      <div className="card overflow-hidden">
        {/* Image Section */}
        <div className="relative h-64 md:h-96 bg-gradient-to-r from-primary-600 to-secondary-600">
          <img
            src={habit.imageUrl || defaultHabitImg}
            alt={habit.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = defaultHabitImg;
            }}
          />
          {isOwner && (
            <div className="absolute top-4 right-4">
              <Link
                to={`/dashboard/update/${id}`}
                className="btn bg-white/90 hover:bg-white text-gray-900 flex items-center gap-2"
              >
                <Edit size={16} />
                Edit
              </Link>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {habit.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{habit.userName || habit.userEmail || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Created {new Date(habit.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{habit.description}</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4 bg-primary-50 dark:bg-primary-900/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-primary-600 dark:text-primary-400" size={24} />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {habit.currentStreak || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
                </div>
              </div>
            </div>

            <div className="card p-4 bg-secondary-50 dark:bg-secondary-900/20">
              <div className="flex items-center gap-3">
                <Award className="text-secondary-600 dark:text-secondary-400" size={24} />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {longestStreak}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</div>
                </div>
              </div>
            </div>

            <div className="card p-4 bg-green-50 dark:bg-green-900/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {totalCompletions}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Completions</div>
                </div>
              </div>
            </div>

            <div className="card p-4 bg-blue-50 dark:bg-blue-900/20">
              <div className="flex items-center gap-3">
                <Clock className="text-blue-600 dark:text-blue-400" size={24} />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {progressPercent}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">30-Day Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Progress (Last 30 Days)
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary-600 to-secondary-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart - Last 7 Days */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Last 7 Days Completion
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                  <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" />
                  <YAxis domain={[0, 1]} ticks={[0, 1]} className="text-gray-600 dark:text-gray-400" />
                  <RechartTooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => value === 1 ? 'Completed' : 'Missed'}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Last 30 Days */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                Last 30 Days Overview
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                  <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 1]} ticks={[0, 1]} className="text-gray-600 dark:text-gray-400" />
                  <RechartTooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => value === 1 ? 'Completed' : 'Missed'}
                  />
                  <Bar dataKey="completed" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Information */}
          <div className="card p-6 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Key Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Category:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100 font-semibold">
                  {habit.category || 'General'}
                </span>
              </div>
              {habit.reminderTime && (
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Reminder Time:</span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100 font-semibold">
                    {habit.reminderTime}
                  </span>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Created:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100 font-semibold">
                  {new Date(habit.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
                <span className="ml-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            {user && (
              <button
                onClick={markComplete}
                className="btn btn-primary flex items-center gap-2"
              >
                <CheckCircle2 size={20} />
                Mark Complete for Today
              </button>
            )}
            {!user && (
              <Link
                to="/login"
                className="btn btn-primary flex items-center gap-2"
              >
                Login to Track This Habit
              </Link>
            )}
            <Link
              to="/browse"
              className="btn btn-outline flex items-center gap-2"
            >
              Browse More Habits
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
