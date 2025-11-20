import React from 'react';
import Link from 'next/link';
import { SCHOOL_INFO } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>{SCHOOL_INFO.address}</p>
              <p>Phone: <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-secondary">{SCHOOL_INFO.phone}</a></p>
              <p>Email: <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-secondary">{SCHOOL_INFO.email}</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block hover:text-secondary">
                About Us
              </Link>
              <Link href="/programs" className="block hover:text-secondary">
                Programs
              </Link>
              <Link href="/policies" className="block hover:text-secondary">
                Policies
              </Link>
              <Link href="/contact" className="block hover:text-secondary">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/policies#refund" className="block hover:text-secondary">
                Refund Policy
              </Link>
              <Link href="/policies#grievance" className="block hover:text-secondary">
                Grievance Policy
              </Link>
              <p className="text-sm mt-4">
                Equal Opportunity Institution
              </p>
              <p className="text-sm">
                ADA Compliant Facility
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

