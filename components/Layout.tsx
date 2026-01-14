import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = 'Pivotal Institute Solutions - Vocational Training Programs in Kennesaw, GA',
  description = 'Pivotal Institute Solutions offers comprehensive vocational training programs in Healthcare, IT Support, Business Administration, and Welding Technology. Prepare for a successful career with hands-on training in Kennesaw, GA.'
}: LayoutProps) {
  const router = useRouter();
  // Remove trailing slash and query params for canonical URL
  const path = router.asPath.split('?')[0].replace(/\/$/, '');
  const canonicalUrl = `https://pivotalinstitute.solutions${path}`;
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pivotal Institute Solutions" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}

