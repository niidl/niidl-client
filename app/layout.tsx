// 'use client';
import './globals.scss';
import React from 'react';
import { Navbar } from '@/components/Navbar';
//import { useAuth } from '@/auth/auth';

export const metadata = {
  title: 'niidl',
  description: 'Connecting developers and open-source project organizations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
