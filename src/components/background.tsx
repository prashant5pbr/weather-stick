import styles from '@/css/page.module.css';

// Component to create background style
const Background = function () {
  return (
    <div className={styles.canvas} aria-hidden="true">
      <div className={styles.sky} />
      <div className={styles.sun} />
      <div className={styles.beams} />
      <div className={styles.haze} />
    </div>
  );
};

export { Background };
