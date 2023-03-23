'use client';
import Link from 'next/link';
import {
  signInWithPopup,
  GithubAuthProvider,
  getRedirectResult,
  signOut,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../auth/firebaseClient';

interface CurrentUser {
  fbuid: string;
  displayName: string | null;
  email: string | null;
  ghuid: string;
}

class User implements CurrentUser {
  constructor(
    public fbuid: string,
    public displayName: string | null,
    public email: string | null,
    public ghuid: string
  ) {}
}

export default function Navbar() {
  const provider = new GithubAuthProvider();

  const login = async () => {
    provider.addScope('repo');
    await signInWithPopup(auth, provider).then(function (result) {
      let user = result.user;
      const currentUser = new User(
        user.uid,
        user.displayName,
        user.email,
        user.providerData[0].uid
      );
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      fetch('http://localhost:8080/userAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      })
        .then((response) => response.text())
        .then((data) => {
          try {
            localStorage.setItem('githubName', JSON.stringify(data));
          } catch (error) {
            console.error('Invalid response', error);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  };

  return (
    <div className={'navbar'}>
      <Link href="/">
        <div className={'logo'}>niidl</div>
      </Link>

      <div>
        <button onClick={login}>Login</button>
        <button onClick={login}>Signup</button>
        <button
          onClick={async () => {
            console.log('signout');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('githubName');
            await signOut(auth);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
