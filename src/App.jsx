import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Register from './pages/Register';
import MyHabits from './pages/MyHabits';
import HabitDetails from './pages/HabitDetails';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AddHabit from './pages/AddHabit';
import BrowsePublic from './pages/BrowsePublic';


export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <main className="flex-1 container">
         <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/add-habit" element={<ProtectedRoute><AddHabit/></ProtectedRoute>} />
          <Route path="/my-habits" element={<ProtectedRoute><MyHabits/></ProtectedRoute>} />
          <Route path="/browse" element={<BrowsePublic/>} />
          <Route path="/habits/:id" element={<HabitDetails/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
    
     <Footer></Footer>
      <ToastContainer position="top-right" />
    </div>
  );
}
