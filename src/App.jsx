import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Register from './pages/Register';
import HabitDetails from './pages/HabitDetails';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import BrowsePublic from './pages/BrowsePublic';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import AddHabit from './pages/dashboard/AddHabit';
import MyHabits from './pages/dashboard/MyHabits';
import UpdateHabit from './pages/dashboard/UpdateHabit';
import Profile from './pages/dashboard/Profile';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <Home />
            </main>
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <Login />
            </main>
            <Footer />
          </>
        } />
        <Route path="/register" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <Register />
            </main>
            <Footer />
          </>
        } />
        <Route path="/browse" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <BrowsePublic />
            </main>
            <Footer />
          </>
        } />
        <Route path="/habits/:id" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <HabitDetails />
            </main>
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <About />
            </main>
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <Contact />
            </main>
            <Footer />
          </>
        } />
        <Route path="/blog" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <Blog />
            </main>
            <Footer />
          </>
        } />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardOverview />} />
          <Route path="add-habit" element={<AddHabit />} />
          <Route path="my-habits" element={<MyHabits />} />
          <Route path="update/:id" element={<UpdateHabit />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
        </Route>

        <Route path="*" element={
          <>
            <Navbar />
            <main className="flex-1 container">
              <NotFound />
            </main>
            <Footer />
          </>
        } />
      </Routes>
      <ToastContainer position="top-right" />
    </div>
  );
}
