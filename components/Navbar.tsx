'use client';
import Link from 'next/link';
import { signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../auth/firebaseClient';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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

const login = async () => {
  const isProduction: string = process.env.PRODUCTION
    ? 'https://niidl.net'
    : 'http://localhost:8080';

  const provider = new GithubAuthProvider();
  provider.addScope('public_repo');
  await signInWithPopup(auth, provider).then(async (result) => {
    let user = result.user;
    const currentUser = new User(
      user.uid,
      user.displayName,
      user.email,
      user.providerData[0].uid
    );

    try {
      await fetch(`${isProduction}/userAuth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });
};

function Navbar() {
  const [githubUser, setGithubUser] = useState<string | undefined>('');
  const router = useRouter();
  const isProduction: string = process.env.PRODUCTION
    ? 'https://niidl.net'
    : 'http://localhost:8080';

  const isProductionServer: string = process.env.PRODUCTION
    ? 'https://niidl.vercel.app'
    : 'http://localhost:3000';

  useEffect(() => {
    const userName = Cookies.get('userName');
    setGithubUser(userName || '');
  }, [Cookies.get('userName')]);

  const logout = async () => {
    Cookies.remove('userName')
    try {
      await fetch(`${isProduction}/logout`, {
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
            setGithubUser(data);
          } catch (error) {
            console.error('Invalid response', error);
          }
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const cookieLogin = async() => {
    if (Cookies.get('AcceptedCookies')){
      console.log('here', Cookies.get('AcceptedCookies'))
      await login();
    } else{
      console.log('else')
      router.push('/')
    }
  }
  const userName = Cookies.get('userName');

  return (
    <div className={'navbar'}>
      <Link href="/">
        <div className={'logo'}>niidl</div>
      </Link>

      <div>
        {githubUser ? (
          <>
            <Link href={`${isProductionServer}/user/${userName}`}>
              <div>{githubUser}</div>
            </Link>
            <button
              onClick={async () => {
                setGithubUser('');
                await logout();
                await signOut(auth);
                router.refresh();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={async () => {
                await cookieLogin();
                setGithubUser(Cookies.get('userName'));
                router.refresh();
              }}
            >
              Login
            </button>
            <button
              onClick={async () => {
                await cookieLogin();
                setGithubUser(Cookies.get('userName'));
                router.refresh();
              }}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export { Navbar, login };
