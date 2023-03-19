// 'use client';
import './globals.scss';
import React from 'react';
import Link from 'next/link';
import { auth } from '../auth/firebaseClient';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';

export const metadata = {
  title: 'niidl',
  description: 'Connecting developers and open-source project organizations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const provider = new GithubAuthProvider();
  return (
    <html lang="en">
      <body>
        <nav className={'navbar'}>
          <div className={'logo'}>niidl</div>
          <div>
            <button
              // onClick={async () => {
              //   await signInWithPopup(auth, provider);
              //   window.location.href = '/';
              // }}
            >
              Login
            </button>
            <button
              // onClick={async () => {
              //   await signInWithPopup(auth, provider);
              //   window.location.href = '/';
              // }}
            >
              Signup
            </button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
