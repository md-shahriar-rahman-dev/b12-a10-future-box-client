import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import HabitCard from '../components/HabitCard';
import Spinner from '../components/Spinner';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

export default function BrowsePublic() {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study'];

  useEffect(() => {
    setLoading(true);
    api.get('/habits/public')
      .then(res => {
        const data = res.data.habits || res.data || [];
        setHabits(data);
        setFilteredHabits(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...habits];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(h =>
        h.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(h => selectedCategories.includes(h.category));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case 'streak-high':
          return (b.currentStreak || 0) - (a.currentStreak || 0);
        case 'streak-low':
          return (a.currentStreak || 0) - (b.currentStreak || 0);
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        default:
          return 0;
      }
    });

    setFilteredHabits(filtered);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [habits, searchQuery, selectedCategories, sortBy]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('newest');
  };

  // Pagination
  const totalPages = Math.ceil(filteredHabits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHabits = filteredHabits.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size={80} />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          Browse Public Habits
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover and explore habits shared by our community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search habits by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-12 w-full"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="text-gray-600 dark:text-gray-400" size={20} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategories.includes(cat)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="text-gray-600 dark:text-gray-400" size={20} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="streak-high">Highest Streak</option>
              <option value="streak-low">Lowest Streak</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategories.length > 0 || sortBy !== 'newest') && (
            <button
              onClick={clearFilters}
              className="btn btn-outline flex items-center gap-2 text-sm"
            >
              <X size={16} />
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {paginatedHabits.length} of {filteredHabits.length} habits
          {filteredHabits.length !== habits.length && ` (filtered from ${habits.length} total)`}
        </div>
      </div>

      {/* Habits Grid */}
      {paginatedHabits.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedHabits.map(h => (
              <HabitCard key={h._id} habit={h} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${
                          currentPage === page
                            ? 'btn-primary'
                            : 'btn-outline'
                        } min-w-[40px]`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            No habits found matching your criteria.
          </p>
          <button
            onClick={clearFilters}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
