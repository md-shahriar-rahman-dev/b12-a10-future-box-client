import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container">
         <Routes>
          
          <Route path="/login" element={<Login/>} />
          
        </Routes>
      </main>
    
      <Footer></Footer>
    </div>
  );
}
