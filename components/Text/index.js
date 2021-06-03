import styles from "./index.module.css";

const Text = (props) => {
  const { children, style, className, ...rest } = props;
  return (
    <p className={`${styles.text} ${className}`} style={style} {...rest}>
      {children}
    </p>
  );
};
export default Text;
