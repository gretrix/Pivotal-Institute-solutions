import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { SCHOOL_INFO, PROGRAMS } from '@/utils/constants';

interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  hours: number;
  weeks: number;
  credential: string;
  tuition: number;
  fees: number;
  materials: number;
  totalCost: number;
  admissionRequirements: string[];
}

interface ProgramPageProps {
  program: Program;
}

export default function ProgramPage({ program }: ProgramPageProps) {
  return (
    <Layout title={`${program.name} - ${SCHOOL_INFO.name}`}>
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/programs" className="text-white hover:underline mb-4 inline-block">
            ← Back to Programs
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.name}</h1>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Program Description</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{program.description}</p>
          </div>

          {/* Program Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Duration */}
            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-3">⏱️ Program Duration</h3>
              <p className="text-gray-700">
                <strong>Total Hours:</strong> {program.hours} hours
              </p>
              <p className="text-gray-700">
                <strong>Duration:</strong> {program.weeks} weeks
              </p>
            </div>

            {/* Credential */}
            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-3">🎓 Credential Awarded</h3>
              <p className="text-gray-700">{program.credential}</p>
            </div>
          </div>

          {/* Tuition & Fees */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">💰 Tuition & Fees</h2>
            <div className="card">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Tuition</span>
                  <span className="text-gray-900 font-bold">${program.tuition.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Registration & Administrative Fees</span>
                  <span className="text-gray-900 font-bold">${program.fees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Books, Materials & Equipment</span>
                  <span className="text-gray-900 font-bold">${program.materials.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-primary text-white p-4 rounded-lg">
                  <span className="font-bold text-lg">TOTAL PROGRAM COST</span>
                  <span className="font-bold text-2xl">${program.totalCost.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Financial aid may be available for those who qualify. 
                  Contact our admissions office for more information about payment plans and funding options.
                </p>
              </div>
            </div>
          </div>

          {/* Admission Requirements */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">📋 Admission Requirements</h2>
            <div className="card">
              <ul className="space-y-3">
                {program.admissionRequirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-secondary mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-primary text-center flex-1">
              Request More Information
            </Link>
            <Link href="/programs" className="btn-secondary text-center flex-1">
              View Other Programs
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PROGRAMS.map((program) => ({
    params: { slug: program.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const program = PROGRAMS.find((p) => p.slug === params?.slug);

  if (!program) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      program,
    },
  };
};

