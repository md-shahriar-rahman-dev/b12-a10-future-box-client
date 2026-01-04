import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getIdToken,
} from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

// Admin credentials
const ADMIN_EMAIL = 'admin@habit.io';
const ADMIN_PASSWORD = 'admin@1122';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); 

  // Check if user is admin
  const isAdmin = (userEmail) => {
    return userEmail === ADMIN_EMAIL;
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        await u.reload();
        const idToken = await getIdToken(u, true); 
        setUser({ ...u, isAdmin: isAdmin(u.email) });
        setToken(idToken);
        localStorage.setItem('accessToken', idToken); 
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('accessToken');
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const register = async (name, email, password, photoURL) => {
    if (!/(?=.*[A-Z])/.test(password) || !/(?=.*[a-z])/.test(password) || password.length < 6) {
      throw new Error('Password must include uppercase, lowercase and be at least 6 characters');
    }
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name, photoURL: photoURL || null });
    await res.user.reload();
    const idToken = await getIdToken(res.user, true);
    setToken(idToken);
    const userWithRole = { ...res.user, isAdmin: isAdmin(res.user.email) };
    setUser(userWithRole);
    localStorage.setItem('accessToken', idToken);
    toast.success('Registered successfully');
    return res;
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await getIdToken(res.user, true);
    setToken(idToken);
    const userWithRole = { ...res.user, isAdmin: isAdmin(res.user.email) };
    setUser(userWithRole);
    localStorage.setItem('accessToken', idToken);
    toast.success(userWithRole.isAdmin ? 'Admin logged in successfully' : 'Logged in successfully');
    return res;
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    await res.user.reload();
    const idToken = await getIdToken(res.user, true);
    setToken(idToken);
    const userWithRole = { ...res.user, isAdmin: isAdmin(res.user.email) };
    setUser(userWithRole);
    localStorage.setItem('accessToken', idToken);
    toast.success('Logged in with Google');
    return res;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
    localStorage.removeItem('accessToken');
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, googleLogin, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
