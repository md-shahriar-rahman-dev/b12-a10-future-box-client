import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Thank you for contacting us. We\'ll get back to you soon!',
      showConfirmButton: false,
      timer: 3000,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="text-primary-600 dark:text-primary-400" size={24} />,
      label: 'Email',
      value: 'support@habithub.com',
      link: 'mailto:support@habithub.com',
    },
    {
      icon: <Phone className="text-primary-600 dark:text-primary-400" size={24} />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="text-primary-600 dark:text-primary-400" size={24} />,
      label: 'Address',
      value: '123 Habit Street, Growth City, GC 12345',
      link: null,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Have a question, suggestion, or feedback? We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{info.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {info.label}
                    </p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 dark:text-gray-100">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Hours */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Support Hours
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="text-primary-600 dark:text-primary-400" size={28} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Send us a Message
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input min-h-[200px]"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary px-8 py-3 flex items-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

