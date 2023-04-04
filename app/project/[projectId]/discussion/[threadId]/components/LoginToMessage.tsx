'use client';
import { login } from '../../../../../../components/Navbar';
import { useRouter } from 'next/navigation';
import styles from './LoginToMessage.module.scss';

export default function LoginToMessage() {
  const router = useRouter();
  const message =
    "Oops! It looks like you're trying to join the discussion. However, in order to participate, you'll need to log in to your account first. ";
  const message2 =
    "If you don't have an account, you can easily create one by clicking on the 'Sign up' button on the login page. Once you've logged in, you'll be able to share your thoughts and ideas with the rest of the community. Thank you!";
  return (
    <div className={styles.LoginMessageBody}>
      <div className={styles.LoginMessageContainer}>
        <h1 className={styles.loginMessageTop}>{message}</h1>
        <p className={styles.LoginMessageMid}>{message2}</p>
        <div className={styles.LoginMessageButtons}>
          <button
            className={'actionButton'}
            onClick={async () => {
              await login();
              router.refresh();
            }}
          >
            Login
          </button>
          <button
            className="actionButton"
            onClick={async () => {
              await login();
              router.refresh();
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
