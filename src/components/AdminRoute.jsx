import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) return <Spinner size={80} />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin(user.email)) return <Navigate to="/dashboard" replace />;
  
  return children;
}

