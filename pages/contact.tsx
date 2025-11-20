import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { SCHOOL_INFO } from '@/utils/constants';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to submit form. Please try again later.');
    }
  };

  return (
    <Layout title={`Contact Us - ${SCHOOL_INFO.name}`}>
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Get in touch with us today. We're here to answer your questions and help you get started.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                Have questions about our programs, admissions, or financial aid? 
                We're here to help! Contact us using any of the methods below or fill out the contact form.
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start">
                  <div className="text-3xl text-secondary mr-4">📞</div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-1">Phone</h3>
                    <a href={`tel:${SCHOOL_INFO.phone}`} className="text-gray-700 hover:text-secondary">
                      {SCHOOL_INFO.phone}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="text-3xl text-secondary mr-4">✉️</div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-1">Email</h3>
                    <a href={`mailto:${SCHOOL_INFO.email}`} className="text-gray-700 hover:text-secondary">
                      {SCHOOL_INFO.email}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">We'll respond within 24-48 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <div className="text-3xl text-secondary mr-4">📍</div>
                  <div>
                    <h3 className="font-bold text-lg text-primary mb-1">Address</h3>
                    <p className="text-gray-700">{SCHOOL_INFO.address}</p>
                    <p className="text-sm text-gray-600 mt-1">Visitor parking available</p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-lg text-primary mb-3">Office Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Monday - Thursday:</strong> 8:00 AM - 6:00 PM</p>
                  <p><strong>Friday:</strong> 8:00 AM - 5:00 PM</p>
                  <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM (By Appointment)</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="card">
                <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>

                {status === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-green-700 font-semibold">
                      ✓ Thank you! Your message has been sent successfully. 
                      You should receive a confirmation email shortly.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="text-red-700 font-semibold">✗ {errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={status === 'loading'}
                    >
                      <option value="">Select a subject...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Program Information">Program Information</option>
                      <option value="Admissions">Admissions</option>
                      <option value="Financial Aid">Financial Aid</option>
                      <option value="Schedule a Visit">Schedule a Visit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={status === 'loading'}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

