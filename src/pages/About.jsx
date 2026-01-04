import React from 'react';
import { Target, Users, TrendingUp, Heart } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Target className="text-primary-600 dark:text-primary-400" size={48} />,
      title: 'Goal Setting',
      description: 'Set clear, achievable goals for your habits and track your progress daily.',
    },
    {
      icon: <TrendingUp className="text-secondary-600 dark:text-secondary-400" size={48} />,
      title: 'Progress Tracking',
      description: 'Visualize your progress with charts, streaks, and detailed statistics.',
    },
    {
      icon: <Users className="text-green-600 dark:text-green-400" size={48} />,
      title: 'Community Support',
      description: 'Browse and share public habits with a supportive community of users.',
    },
    {
      icon: <Heart className="text-red-600 dark:text-red-400" size={48} />,
      title: 'Personal Growth',
      description: 'Build consistency and transform your life one habit at a time.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          About HabitHub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Your personal habit tracking companion designed to help you build consistency,
          achieve goals, and transform your life one habit at a time.
        </p>
      </div>

      {/* Mission Section */}
      <div className="card p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          At HabitHub, we believe that small, consistent actions lead to significant life changes.
          Our mission is to provide you with the tools and motivation needed to build lasting habits
          that align with your personal goals and values. Whether you want to improve your health,
          enhance productivity, or develop new skills, HabitHub is here to support your journey.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="card p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div>{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Values Section */}
      <div className="card p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Focus
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Stay focused on what matters most to you.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="text-4xl mb-2">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Celebrate small wins and continuous improvement.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="text-4xl mb-2">🤝</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Community
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Grow together with a supportive community.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="card p-8 md:p-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of users who are building better habits every day.
        </p>
        <a
          href="/register"
          className="btn bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center gap-2"
        >
          Get Started Today
        </a>
      </div>
    </div>
  );
}

