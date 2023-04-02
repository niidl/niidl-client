import styles from '../../loading.module.scss';

export default function Loading() {
  let ranNum = Math.floor(Math.random() * 100);
  let loadedImage = '';

  return <div className={styles.loadingImage}>niidl</div>;
}
