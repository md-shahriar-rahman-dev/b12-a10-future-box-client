import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import { ToastContainer } from 'react-toastify';

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container">
        
      </main>
    
      <ToastContainer position="top-right" />
    </div>
  );
}
