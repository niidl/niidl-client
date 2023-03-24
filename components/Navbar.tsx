'use client';
import Link from 'next/link';
import { signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../auth/firebaseClient';
import { useState } from 'react';

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
  const [githubUser, setGithubUser] = useState<string>('');
  const [infoFromFirebase, setInfoFromFirebase] = useState<User>();
  const [resetFirebaseUser, setResetFirebaseUser] = useState<User>();
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
      setInfoFromFirebase(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      fetch('http://localhost:8080/userAuth', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      })
        .then((response) => response.text())
        .then((data) => {
          try {
            console.log(data);
            localStorage.setItem('githubName', JSON.stringify(data));
            setGithubUser(data);
          } catch (error) {
            console.error('Invalid response', error);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  };

  const logout = async () => {
    console.log('at least in logout')
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.text())
      .then((data) => {
        try {
          console.log(data);
          localStorage.setItem('githubName', JSON.stringify(data));
          setGithubUser(data);
        } catch (error) {
          
          console.error('Invalid response', error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={'navbar'}>
      <Link href="/">
        <div className={'logo'}>niidl</div>
      </Link>

      <div>
        {githubUser.length > 1 ? (
          <>
            <div>{githubUser}</div>
            <button
              onClick={async () => {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('githubName');
                setGithubUser('');
                setInfoFromFirebase(resetFirebaseUser);
                await logout();
                await signOut(auth);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={login}>Login</button>
            <button onClick={login}>Signup</button>
          </>
        )}
      </div>
    </div>
  );
}
