import styles from '@/css/page.module.css';

// Component to create background style
const Background = function () {
  return (
    <div className={styles.aurora} aria-hidden="true">
      <span className={`${styles.blob} ${styles.blobOne}`} />
      <span className={`${styles.blob} ${styles.blobTwo}`} />
      <span className={`${styles.blob} ${styles.blobThree}`} />
    </div>
  );
};

export { Background };
