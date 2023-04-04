'use client';
import Link from 'next/link';
import Image from 'next/image';
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
  provider.addScope('read:user');
  await signInWithPopup(auth, provider).then(async (result) => {
    let user = result.user;
    const currentUser = new User(
      user.uid,
      user.displayName,
      user.email,
      user.providerData[0].uid
    );

    try {
      const userJson = await fetch(`${isProduction}/userAuth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });

      const user = await userJson.json();

      Cookies.set('userName', user.user_name);
      Cookies.set('githubProfilePicture', user.github_profile_picture);
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
    ? 'https://niidl.co'
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
  const githubProfilePicture = Cookies.get('githubProfilePicture')!;

  return (
    <div className={'navbar'}>
      <Link href="/">
        <div className={'logo'}>niidl</div>
      </Link>

      <div className={'navbarRightBtns'}>
        {githubUser ? (
          <>
            <Link href={`${isProductionServer}/user/${userName}`}>
              <div className={'navbarRightBtnUserDetails'}>
                <div className={'navbarUsername'}>{githubUser}</div>
                <Image 
                  src={githubProfilePicture}
                  width={36}
                  height={36}
                  alt={`Profile picture for ${githubUser}`}
                  className={'navbarProfilePicture'}
                />
              </div>
            </Link>
            <button
              className='actionButton'
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
              className='actionButton'
              onClick={async () => {
                await cookieLogin();
                setGithubUser(Cookies.get('userName'));
                router.refresh();
              }}
            >
              Login
            </button>
            <button
              className='actionButton'
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
