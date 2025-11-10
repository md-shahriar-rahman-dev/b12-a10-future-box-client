import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function Login(){
  const { login, googleLogin } = useAuth();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      navigate('/');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handle} className="space-y-3">
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary w-full">Login</button>
      </form>
      <button onClick={handleGoogle} className="btn w-full mt-3">Sign in with Google</button>
      <p className="mt-3">Don't have account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  );
}
