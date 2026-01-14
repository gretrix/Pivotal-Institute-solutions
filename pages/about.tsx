import React from 'react';
import Layout from '@/components/Layout';
import { SCHOOL_INFO, STATEMENTS } from '@/utils/constants';

export default function About() {
  return (
    <Layout 
      title="About Pivotal Institute Solutions - Vocational Training in Kennesaw, GA"
      description="Learn about Pivotal Institute Solutions, a leading provider of vocational training in Kennesaw, GA. We offer industry-relevant programs with experienced instructors and career support for all graduates."
    >
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">About Us</h1>
        </div>
      </section>

      {/* School Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="section-title">Who We Are</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {SCHOOL_INFO.description}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our state-of-the-art facilities and experienced instructors create an optimal learning 
              environment where students can develop practical skills and theoretical knowledge. We pride 
              ourselves on our commitment to excellence in education and our dedication to student success.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              With a focus on hands-on training and real-world applications, our programs prepare students 
              to enter the workforce with confidence and competence. We maintain strong relationships with 
              local employers and industry partners to ensure our curriculum remains current and relevant.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="section-title">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-12">
            {SCHOOL_INFO.mission}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-primary mb-3">Excellence</h3>
              <p className="text-gray-600">
                Delivering high-quality education and training that exceeds industry standards
              </p>
            </div>

            <div className="card">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-primary mb-3">Integrity</h3>
              <p className="text-gray-600">
                Operating with honesty, transparency, and ethical practices in all we do
              </p>
            </div>

            <div className="card">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-primary mb-3">Student Success</h3>
              <p className="text-gray-600">
                Committed to helping every student achieve their educational and career goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Statements */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="section-title">Important Information</h2>

          {/* Open to Public */}
          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h3 className="text-xl font-bold text-primary mb-3">Open to the Public</h3>
            <p className="text-gray-700">{STATEMENTS.openToPublic}</p>
          </div>

          {/* Non-Discrimination */}
          <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-500 rounded">
            <h3 className="text-xl font-bold text-primary mb-3">
              Non-Discrimination & Equal Opportunity Statement
            </h3>
            <p className="text-gray-700">{STATEMENTS.nonDiscrimination}</p>
          </div>

          {/* ADA Accessibility */}
          <div className="mb-8 p-6 bg-purple-50 border-l-4 border-purple-500 rounded">
            <h3 className="text-xl font-bold text-primary mb-3">
              ADA Accessibility Statement
            </h3>
            <p className="text-gray-700">{STATEMENTS.ada}</p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">Visit Us</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg">
              <strong>Address:</strong> {SCHOOL_INFO.address}
            </p>
            <p className="text-lg">
              <strong>Phone:</strong>{' '}
              <a href={`tel:${SCHOOL_INFO.phone}`} className="text-secondary hover:underline">
                {SCHOOL_INFO.phone}
              </a>
            </p>
            <p className="text-lg">
              <strong>Email:</strong>{' '}
              <a href={`mailto:${SCHOOL_INFO.email}`} className="text-secondary hover:underline">
                {SCHOOL_INFO.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

