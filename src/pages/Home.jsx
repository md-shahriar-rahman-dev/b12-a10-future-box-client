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


export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    
    <div className="space-y-12">

      {/* Hero Slider */}
      <motion.section initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
        <Slider {...sliderSettings}>
          <div className="relative">
            <img src="https://picsum.photos/1200/400?random=1" alt="Slide 1" className="w-full h-96 object-cover"/>
            <div className="absolute top-1/3 left-1/4 text-white">
              <h1 className="text-4xl font-bold mb-2">Build better habits daily</h1>
              <p className="mb-4">Track progress, maintain streaks, and grow consistently with HabitHub.</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/1200/400?random=2" alt="Slide 2" className="w-full h-96 object-cover"/>
            <div className="absolute top-1/3 left-1/4 text-white">
              <h1 className="text-4xl font-bold mb-2">Stay Consistent</h1>
              <p className="mb-4">Small daily habits lead to long-term growth.</p>
              <button className="btn btn-primary">Explore Habits</button>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/1200/400?random=3" alt="Slide 3" className="w-full h-96 object-cover"/>
            <div className="absolute top-1/3 left-1/4 text-white">
              <h1 className="text-4xl font-bold mb-2">Track Progress</h1>
              <p className="mb-4">Monitor your streaks and achievements easily.</p>
              <button className="btn btn-primary">Start Now</button>
            </div>
          </div>
        </Slider>
      </motion.section>


      <FeaturedCarousel slides={[
  { title: "Morning Routine", text: "Start your day with productive habits." },
  { title: "Fitness Goals", text: "Track workouts and build consistency." },
  { title: "Study Plan", text: "Maintain streaks on your learning journey." },
]} />

      {/* Featured Habits */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Habits</h2>
        {loading ? <Spinner size={8} /> : (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {featured.map(h => <HabitCard key={h._id || h.id} habit={h} />)}
  </div>
)}
      </section>

      {/* Why Build Habits */}
      <section>
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
      <section>
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
      // You can replace this with actual API call later
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
