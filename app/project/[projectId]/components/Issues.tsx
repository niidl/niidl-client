import Link from 'next/link';
import styles from './Issues.module.scss';

export default function Issues() {
  return (
    <div className={styles.issuesContainer}>
      <Link href={`#`}>
        <div className={styles.issueInstance}>
          Here is an instance of an issue.
        </div>
        <div className={styles.issueInstance}>
          Here is another instance of an issue.
        </div>
        <div className={styles.issueInstance}>
          And another one.
        </div>
      </Link>
    </div>
  )
}