import styles from "./loader.module.scss";
const LoaderComponent = () => {
  return (
    <div className={styles.loaderWrapepr}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoaderComponent;
