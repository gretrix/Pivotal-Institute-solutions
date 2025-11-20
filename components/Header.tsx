import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SCHOOL_INFO } from '@/utils/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar with Contact Info */}
        <div className="border-b border-gray-200 py-2">
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-primary">
                📞 {SCHOOL_INFO.phone}
              </a>
              <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-primary">
                ✉️ {SCHOOL_INFO.email}
              </a>
            </div>
            <div className="hidden md:block">
              📍 {SCHOOL_INFO.address}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Pivotal Institute Solutions" width={50} height={50} />
              <span className="text-xl font-bold text-primary hidden md:block">
                Pivotal Institute Solutions
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-primary font-medium transition">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary font-medium transition">
                About
              </Link>
              <Link href="/programs" className="text-gray-700 hover:text-primary font-medium transition">
                Programs
              </Link>
              <Link href="/policies" className="text-gray-700 hover:text-primary font-medium transition">
                Policies
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary font-medium transition">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium">
                Home
              </Link>
              <Link href="/about" className="block py-2 text-gray-700 hover:text-primary font-medium">
                About
              </Link>
              <Link href="/programs" className="block py-2 text-gray-700 hover:text-primary font-medium">
                Programs
              </Link>
              <Link href="/policies" className="block py-2 text-gray-700 hover:text-primary font-medium">
                Policies
              </Link>
              <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary font-medium">
                Contact
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

