import React, { useEffect, useState } from 'react';
import api from '../services/api';
import HabitCard from '../components/HabitCard';

export default function BrowsePublic(){
  const [habits, setHabits] = useState([]);
  const [q, setQ] = useState('');
  const [cats, setCats] = useState([]);

  useEffect(()=> { fetch(); }, []);

  const fetch = async () => {
    const params = {};
    if (q) params.search = q;
    if (cats.length) params.categories = cats.join(',');
    const res = await api.get('/habits/public', { params });
    setHabits(res.data.habits || res.data || []);
  };

  useEffect(()=> { fetch(); }, [q, cats]);

  const toggle = (cat) => setCats(prev => prev.includes(cat) ? prev.filter(c=>c!==cat) : [...prev,cat]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Browse Public Habits</h2>
      <input className="input mb-3" placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="flex gap-2 mb-4">
        {['Morning','Work','Fitness','Evening','Study'].map(c=> (
          <button key={c} onClick={()=>toggle(c)} className="btn">{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {habits.map(h => <HabitCard key={h._id} habit={h} />)}
      </div>
    </div>
  );
}
