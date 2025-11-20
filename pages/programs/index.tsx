import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { SCHOOL_INFO, PROGRAMS } from '@/utils/constants';

export default function Programs() {
  return (
    <Layout title={`Programs - ${SCHOOL_INFO.name}`}>
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Programs</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Choose from our comprehensive range of vocational training programs designed to prepare you for a successful career
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {PROGRAMS.map((program) => (
              <div key={program.id} className="card">
                <h2 className="text-2xl font-bold text-primary mb-4">{program.name}</h2>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <span className="text-secondary font-semibold mr-2">⏱️</span>
                    <div>
                      <strong>Duration:</strong> {program.hours} hours / {program.weeks} weeks
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-secondary font-semibold mr-2">🎓</span>
                    <div>
                      <strong>Credential:</strong> {program.credential}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-secondary font-semibold mr-2">💰</span>
                    <div>
                      <strong>Total Cost:</strong> ${program.totalCost.toLocaleString()}
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/programs/${program.slug}`}
                  className="btn-primary w-full text-center block"
                >
                  View Program Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Have Questions About Our Programs?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our admissions team is here to help you find the right program for your career goals
          </p>
          <Link href="/contact" className="btn-secondary">
            Contact Us Today
          </Link>
        </div>
      </section>
    </Layout>
  );
}

