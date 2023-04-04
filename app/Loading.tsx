import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingBody}>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>
          <span>n</span>
          <span>i</span>
          <span>i</span>
          <span>d</span>
          <span>l</span>
        </div>
      </div>
    </div>
  );
}
