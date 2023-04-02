import styles from '../../loading.module.scss';

export default function Loading() {
  let ranNum = Math.floor(Math.random() * 100);
  let loadedImage = '';
  if (ranNum > 50) {
    loadedImage = 'https://i.ibb.co/cQmvv4D/Bulbasaur.png';
  } else {
    loadedImage = 'https://i.ibb.co/FmQLV7N/Squirtle.png';
  }

  return (
    <div className={styles.loadingImage}>
      <img src={loadedImage} width="200px" />
    </div>
  );
}
