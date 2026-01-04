import React from 'react';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const CardSkeleton = () => (
    <div className="card p-6 animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );

  const TableSkeleton = () => (
    <div className="card p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  const DetailsSkeleton = () => (
    <div className="card p-8 animate-pulse space-y-6">
      <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );

  if (type === 'table') {
    return <TableSkeleton />;
  }

  if (type === 'details') {
    return <DetailsSkeleton />;
  }

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </>
  );
}

