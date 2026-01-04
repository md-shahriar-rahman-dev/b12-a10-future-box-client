import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import HabitCard from '../components/HabitCard';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Award, CheckCircle, ArrowRight, Star, HelpCircle, BarChart3, Zap } from 'lucide-react';
import Spinner from '../components/Spinner';
import SkeletonLoader from '../components/SkeletonLoader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from 'sweetalert2';

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const benefits = [
    { icon: <Target size={48} />, title: "Goal Achievement", desc: "Set clear goals and track your progress daily." },
    { icon: <TrendingUp size={48} />, title: "Progress Tracking", desc: "Visualize your growth with detailed analytics." },
    { icon: <Users size={48} />, title: "Community Support", desc: "Share and discover habits with others." },
    { icon: <Award size={48} />, title: "Achievement System", desc: "Celebrate milestones and maintain streaks." },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Fitness Enthusiast", text: "HabitHub helped me build a consistent workout routine. The streak tracking keeps me motivated!", rating: 5 },
    { name: "Mike Chen", role: "Productivity Expert", text: "Best habit tracker I've used. The analytics give me insights into my progress.", rating: 5 },
    { name: "Emma Davis", role: "Student", text: "Tracking my study habits has improved my grades significantly. Highly recommend!", rating: 5 },
  ];

  const features = [
    { icon: <BarChart3 size={32} />, title: "Analytics Dashboard", desc: "Track your progress with comprehensive charts and statistics." },
    { icon: <Zap size={32} />, title: "Quick Actions", desc: "Mark habits complete with a single click." },
    { icon: <CheckCircle size={32} />, title: "Streak Tracking", desc: "Build and maintain impressive streaks." },
    { icon: <Users size={32} />, title: "Public Habits", desc: "Browse and share habits with the community." },
  ];

  const faqs = [
    { q: "How do I start tracking habits?", a: "Simply create an account, click 'Add Habit', and start tracking your daily progress." },
    { q: "Can I share my habits with others?", a: "Yes! You can make habits public and browse habits shared by the community." },
    { q: "What happens if I miss a day?", a: "Your streak resets, but don't worry! Start fresh the next day and build a new streak." },
    { q: "Is HabitHub free to use?", a: "Yes, HabitHub is completely free to use with all core features available." },
  ];

  return (
   <div className="space-y-16 py-8 text-gray-900 dark:text-gray-100
                [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900
                dark:[&_h1]:text-white dark:[&_h2]:text-white dark:[&_h3]:text-white">



     {/* Section 1: Hero Carousel */}
<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <Slider {...sliderSettings}>
    {[
      {
        title: "Build Better Habits Daily",
        desc: "Track progress, maintain streaks, and grow consistently with HabitHub.",
        cta: "Get Started",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Stay Consistent",
        desc: "Small daily habits lead to long-term growth and success.",
        cta: "Explore Habits",
        image:
          "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80",
      },
      {
        title: "Track Your Progress",
        desc: "Monitor your streaks and achievements with detailed analytics.",
        cta: "Start Now",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      },
    ].map((slide, i) => (
      <div key={i} className="relative rounded-2xl overflow-hidden shadow-xl">
        <div
          className="relative h-[400px] md:h-[500px] flex items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative container mx-auto px-8 md:px-16 text-black dark:text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              {slide.desc}
            </p>
            <Link
              to="/register"
              className="btn bg-black text-primary hover:bg-gray-100 px-8 py-3 text-lg"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</motion.section>



      {/* Section 2: Statistics */}
      <section className="card p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white tracking-tight mb-12">
 
          Trusted by Thousands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10K+', label: 'Active Users' },
            { number: '50K+', label: 'Habits Tracked' },
            { number: '1M+', label: 'Completions' },
            { number: '4.8', label: 'User Rating' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Featured Habits */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Featured Habits
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover popular habits from our community
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkeletonLoader type="card" count={4} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.slice(0, 4).map(h => (
              <HabitCard key={h._id || h.id} habit={h} />
            ))}
          </div>
        )}
        {!loading && featured.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No habits available yet. Be the first to add one!
          </div>
        )}
      </section>

      {/* Section 4: Benefits/Why Build Habits */}
      <section className="card p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-black tracking-tight mb-12">
          Why Build Habits?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="text-primary-600 dark:text-primary-600 mb-4 flex justify-center">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold text-black dark:text-black tracking-tight mb-2">{b.title}</h3>
              <p className="text-black dark:text-gray-400">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6 bg-base-100 dark:bg-base-200 transition-colors duration-300">
  <div className="text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-base-content tracking-tight mb-4">
      Powerful Features
    </h2>
    <p className="text-base-content/70 text-lg">
      Everything you need to build and maintain great habits
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {features.map((feature, i) => (
      <div key={i} className="card p-6 hover:shadow-xl transition-shadow">
        <div className="text-primary mb-4">{feature.icon}</div>
        <h3 className="text-xl font-bold text-base-content tracking-tight mb-2">
          {feature.title}
        </h3>
        <p className="text-base-content/70">{feature.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* Section 6: How It Works */}
      <section className="card p-8 md:p-12 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white tracking-tight mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Create Account', desc: 'Sign up for free and create your profile' },
            { step: '2', title: 'Add Habits', desc: 'Define the habits you want to track' },
            { step: '3', title: 'Track Progress', desc: 'Mark habits complete and watch your streaks grow' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            What Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Real feedback from our community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="card p-6">
              <div className="flex gap-1 mb-4 text-secondary-500">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <div className="font-bold text-gray-900 dark:text-white tracking-tight">{testimonial.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: Categories */}
      <section className="card p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white tracking-tight mb-12">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Morning', 'Work', 'Fitness', 'Evening', 'Study'].map((cat, i) => (
            <Link
              key={i}
              to={`/browse?category=${cat}`}
              className="card p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-3xl mb-2">🏷️</div>
              <div className="font-bold text-gray-900 dark:text-white tracking-tight">{cat}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-4">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-2">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 10: Call to Action */}
      <section className="card p-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Life?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of users who are building better habits and achieving their goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Get Started Free
          </Link>
          <Link to="/browse" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
            Browse Habits
          </Link>
        </div>
      </section>

      {/* Section 11: Newsletter */}
      <section className="card p-8 md:p-12 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white tracking-tight mb-4">
          Stay Updated
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Subscribe to our newsletter for tips, updates, and inspiration.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            if (!email) {
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
              text: `We'll keep you updated at ${email}`,
              showConfirmButton: false,
              timer: 2000,
            });
            e.target.reset();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input flex-1"
            required
          />
          <button type="submit" className="btn btn-primary px-8 py-3">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
