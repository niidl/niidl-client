import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingMessage}>
      <div className={styles.loadingContainer}>
        <div className={styles.loadingLoader}></div>
      </div>
      <div className={styles.niidlLoadName}>niidl</div>
    </div>
  );
}
