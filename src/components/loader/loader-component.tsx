import styles from "./loader.module.scss";
const LoaderComponent = () => {
  return (
    <div className={styles.loaderWrapper}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoaderComponent;
