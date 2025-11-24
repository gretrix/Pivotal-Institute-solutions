import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { SCHOOL_INFO, PROGRAMS } from '@/utils/constants';

export default function Home() {
  return (
    <Layout title={`${SCHOOL_INFO.name} - Home`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <Image src="/logo.png" alt="Pivotal Institute Solutions" width={120} height={120} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {SCHOOL_INFO.name}
            </h1>
            <div className="space-y-4 text-lg md:text-xl mb-8">
              <p className="flex items-center justify-center">
                <span className="mr-2">📞</span>
                <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:underline">
                  {SCHOOL_INFO.phone}
                </a>
              </p>
              <p className="flex items-center justify-center">
                <span className="mr-2">✉️</span>
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:underline">
                  {SCHOOL_INFO.email}
                </a>
              </p>
            </div>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              {SCHOOL_INFO.mission}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/programs" className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                View Programs
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Our Training Programs</h2>
          <p className="section-subtitle text-center">
            Comprehensive vocational training programs designed for your success
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {PROGRAMS.map((program) => (
              <div key={program.id} className="card">
                <h3 className="text-xl font-bold text-primary mb-3">{program.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>⏱️ {program.hours} hours / {program.weeks} weeks</p>
                  <p>💰 ${program.totalCost.toLocaleString()}</p>
                </div>
                <Link 
                  href={`/programs/${program.slug}`}
                  className="text-secondary font-semibold hover:text-primary transition"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/programs" className="btn-primary">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Why Choose Pivotal Institute?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-primary mb-3">Industry-Relevant Training</h3>
              <p className="text-gray-600">
                Programs designed with input from industry professionals to ensure job readiness
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold text-primary mb-3">Experienced Instructors</h3>
              <p className="text-gray-600">
                Learn from professionals with real-world experience in their fields
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-primary mb-3">Career Support</h3>
              <p className="text-gray-600">
                Job placement assistance and career counseling for all graduates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our programs and enrollment process
          </p>
          <Link href="/contact" className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition inline-block">
            Get Started Today
          </Link>
        </div>
      </section>
    </Layout>
  );
}

