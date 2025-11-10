import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Register from './pages/Register';
import MyHabits from './pages/MyHabits';
import HabitDetails from './pages/HabitDetails';


export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container">
         <Routes>
          
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/my-habits" element={<MyHabits/>} />
          <Route path="/habits/:id" element={<HabitDetails/>} />
        </Routes>
      </main>
    
      <Footer></Footer>
    </div>
  );
}
