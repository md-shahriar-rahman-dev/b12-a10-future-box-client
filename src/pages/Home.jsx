import React, { useEffect, useState } from 'react';
import api from '../services/api';
import HabitCard from '../components/HabitCard';
import { motion } from 'framer-motion';
import { FaBrain, FaClock, FaRunning, FaSmile } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import FeaturedCarousel from '../components/FeaturedCarousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Swal from 'sweetalert2';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/habits/latest')
      .then(res => setFeatured(res.data.habits || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Hero Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  const benefits = [
    { icon: <FaBrain className="text-5xl text-primary mx-auto mb-2"/>, title: "Better Focus", desc: "Train your mind to stay on task daily." },
    { icon: <FaClock className="text-5xl text-primary mx-auto mb-2"/>, title: "Time Management", desc: "Use time wisely and create routines." },
    { icon: <FaRunning className="text-5xl text-primary mx-auto mb-2"/>, title: "Fitness & Health", desc: "Small habits build a healthier life." },
    { icon: <FaSmile className="text-5xl text-primary mx-auto mb-2"/>, title: "Reduced Stress", desc: "Structured habits reduce anxiety." },
  ];

  // Prepare Recharts data (habit completion %)
  const chartData = featured.map(h => {
    const last30 = (h.completionHistory || []).filter(d => {
      const dt = new Date(d);
      return (Date.now() - dt.getTime()) <= 1000 * 60 * 60 * 24 * 30;
    }).length;
    const progress = Math.round((last30 / 30) * 100);
    return { name: h.title, progress };
  });

  return (
    <div className="space-y-12">

      {/* Hero Slider */}
<motion.section initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
  <Slider {...sliderSettings}>
    {[1,2,3].map(i => (
      <div key={i} className="relative rounded-2xl overflow-hidden shadow-xl">
        <img
          src={`https://picsum.photos/1200/400?random=${i}`}
          alt={`Slide ${i}`}
          className="w-full h-96 object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
            {i === 1 ? 'Build better habits daily' : i === 2 ? 'Stay Consistent' : 'Track Progress'}
          </h1>
          <p className="mb-4 text-lg md:text-xl drop-shadow-md">
            {i === 1 
              ? 'Track progress, maintain streaks, and grow consistently with HabitHub.' 
              : i === 2 
              ? 'Small daily habits lead to long-term growth.' 
              : 'Monitor your streaks and achievements easily.'}
          </p>
          <button className="btn btn-primary rounded-full px-6 py-3 drop-shadow-md">
            {i === 1 ? 'Get Started' : i === 2 ? 'Explore Habits' : 'Start Now'}
          </button>
        </div>
      </div>
    ))}
  </Slider>
</motion.section>


      {/* Featured Habits */}
      <section className="bg-white/40 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Featured Habits</h2>
        {loading ? <Spinner size={12} /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map(h => <HabitCard key={h._id || h.id} habit={h} />)}
          </div>
        )}
      </section>

      {/* Habits Progress Chart */}
{featured.length > 0 && (
  <section className="max-w-5xl mx-auto p-6 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl">
  <h2 className="text-3xl font-bold mb-6 text-center">Your Habits Progress</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>
      <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#fff" />
      <YAxis stroke="#fff" unit="%" />
      <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '8px' }} />
      <Bar dataKey="progress" fill="#f59e0b" />
    </BarChart>
  </ResponsiveContainer>
</section>



)}


      {/* Why Build Habits */}
      <section className="bg-white/40 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Why Build Habits?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {benefits.map((b,i) => (
            <motion.div key={i} className="card p-4 shadow rounded-lg text-center"
              initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:i*0.2}}>
              {b.icon}
              <h3 className="text-xl font-bold">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tips / Extra Sections */}
      <section className="bg-white/40 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div className="card p-4 shadow rounded-lg" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
            <h3 className="font-bold mb-2">Use reminders</h3>
            <p>Set notifications to stay on track daily.</p>
          </motion.div>
          <motion.div className="card p-4 shadow rounded-lg" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
            <h3 className="font-bold mb-2">Start small</h3>
            <p>Begin with manageable habits and scale gradually.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-white/70 backdrop-blur-md rounded-lg p-8 max-w-3xl mx-auto text-center mt-16 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4 text-gray-700">Subscribe for updates or send us your email to get in touch!</p>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            if(!email) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter your email!',
              });
              return;
            }
            Swal.fire({
              icon: 'success',
              title: 'Thank you!',
              text: `We received: ${email}`,
              showConfirmButton: false,
              timer: 2000
            });
            e.target.reset();
          }}
          className="flex flex-col md:flex-row justify-center gap-3"
        >
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email" 
            className="input flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button type="submit" className="btn btn-primary px-6 py-3 mt-3 md:mt-0">Submit</button>
        </form>
      </section>

    </div>
  );
}
