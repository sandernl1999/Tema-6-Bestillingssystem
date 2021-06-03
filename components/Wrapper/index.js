import styles from "./index.module.css";
const Wrapper = (props) => {
  const { children, className } = props;
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
export default Wrapper;
