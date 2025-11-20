import React from 'react';
import Layout from '@/components/Layout';
import { SCHOOL_INFO, POLICIES } from '@/utils/constants';

export default function Policies() {
  return (
    <Layout title={`Policies - ${SCHOOL_INFO.name}`}>
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">School Policies</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Transparent policies ensuring fairness and clarity for all students
          </p>
        </div>
      </section>

      {/* Policies Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Refund Policy */}
          <div id="refund" className="mb-16">
            <div className="card">
              <h2 className="text-3xl font-bold text-primary mb-6">{POLICIES.refund.title}</h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: POLICIES.refund.content }}
              />
            </div>
          </div>

          {/* Grievance Policy */}
          <div id="grievance" className="mb-16">
            <div className="card">
              <h2 className="text-3xl font-bold text-primary mb-6">{POLICIES.grievance.title}</h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: POLICIES.grievance.content }}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-xl font-bold text-primary mb-3">Questions About Our Policies?</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about our policies or need clarification on any matter, 
              please don't hesitate to contact our administration office.
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong>{' '}
              <a href={`tel:${SCHOOL_INFO.phone}`} className="text-secondary hover:underline">
                {SCHOOL_INFO.phone}
              </a>
            </p>
            <p className="text-gray-700">
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

