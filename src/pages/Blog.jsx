import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: '5 Science-Backed Ways to Build Lasting Habits',
      excerpt: 'Discover the psychology behind habit formation and learn proven strategies to make your habits stick for the long term.',
      author: 'HabitHub Team',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Tips & Tricks',
    },
    {
      id: 2,
      title: 'The Power of Consistency: Why Small Daily Actions Matter',
      excerpt: 'Learn how small, consistent actions compound over time to create significant changes in your life and habits.',
      author: 'HabitHub Team',
      date: '2024-01-10',
      readTime: '4 min read',
      category: 'Mindset',
    },
    {
      id: 3,
      title: 'How to Track Your Habits Effectively',
      excerpt: 'Master the art of habit tracking with our comprehensive guide to monitoring progress and staying motivated.',
      author: 'HabitHub Team',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Guides',
    },
    {
      id: 4,
      title: 'Breaking Bad Habits: A Step-by-Step Guide',
      excerpt: 'Understanding how to break unwanted habits is just as important as building new ones. Explore effective strategies here.',
      author: 'HabitHub Team',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'Self-Improvement',
    },
    {
      id: 5,
      title: 'Habit Stacking: Build Multiple Habits at Once',
      excerpt: 'Learn the technique of habit stacking to efficiently build multiple positive habits by linking them together.',
      author: 'HabitHub Team',
      date: '2023-12-20',
      readTime: '5 min read',
      category: 'Strategies',
    },
    {
      id: 6,
      title: 'The Role of Accountability in Habit Formation',
      excerpt: 'Discover how accountability partners and tracking systems can dramatically improve your habit success rate.',
      author: 'HabitHub Team',
      date: '2023-12-15',
      readTime: '4 min read',
      category: 'Community',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          Blog & Resources
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Expert tips, strategies, and insights to help you build better habits and achieve your goals.
        </p>
      </div>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <div className="card p-8 md:p-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {blogPosts[0].category}
            </span>
            <span className="flex items-center gap-2 text-sm opacity-90">
              <Calendar size={16} />
              {new Date(blogPosts[0].date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{blogPosts[0].title}</h2>
          <p className="text-lg mb-6 opacity-90">{blogPosts[0].excerpt}</p>
          <button className="btn bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center gap-2">
            Read More
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(1).map((post) => (
          <article key={post.id} className="card p-6 hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="card p-8 md:p-12 text-center bg-gradient-to-r from-secondary-100 to-primary-100 dark:from-secondary-900/30 dark:to-primary-900/30">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Stay Updated
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest tips, strategies, and insights
          delivered directly to your inbox.
        </p>
        <div className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="input flex-1"
          />
          <button className="btn btn-primary whitespace-nowrap">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

