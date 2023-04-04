'use client';
import styles from './CookieModal.module.scss';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
import { BiCookie } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface Props {
  SetAcceptedCookies: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CookieModal({SetAcceptedCookies}: any){
  const router = useRouter();

  const declineCookie = (event: any): void => {
    event.preventDefault();
    SetAcceptedCookies(true)
    router.push('/')
  }

  const acceptCookie = (event: any): void => {
    event.preventDefault();
    SetAcceptedCookies(true)
    Cookies.set('AcceptedCookies', 'Accepted')
    router.push('/')
  }

  return (
    <div className={styles.cookieModalBackground}>
      <div className={styles.cookieModalContent}>
        <AiOutlineCloseCircle
          className={styles.cookieModalCloseBtn}
          onClick={declineCookie}
        />
        <h3>Nom nom nom.</h3>
        <BiCookie className={styles.cookieIcon} />
        <p>
          We need your consent to set cookies on your device.
          Cookies help us deliver the best experience on niidl.
          By using our website, you agree to the use of cookies.
        </p>
        <button 
          className={styles.cookieModalAcceptBtn}
          onClick={acceptCookie}
        >
          Accept
        </button>
      </div>
    </div>
  )
}