import styles from "./index.module.css";

const AnimatedBackground = ({ children }) => (
  <div className={styles.body}>{children}</div>
);

export default AnimatedBackground;
