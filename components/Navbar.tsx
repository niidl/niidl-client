'use client'
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../auth/firebaseClient';

export default function Navbar() {
  const provider = new GithubAuthProvider();
  return (
    <div className={'navbar'}>
      <div className={'logo'}>niidl</div>
      <div>
        <button
        onClick={async () => {
          await signInWithPopup(auth, provider);
          window.location.href = '/';
        }}
        >
          Login
        </button>
        <button
        onClick={async () => {
          await signInWithPopup(auth, provider);
          window.location.href = '/';
        }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
