import cx from "classnames";
import styles from "./index.module.css";
import Text from "../Text";
import flexStyles from "../../commonStyles.module.css";
const ErrorMessage = ({ errorMessage, setErrorMessage }) => {
  return (
    <div className={cx(styles.errorContainer, flexStyles.flexRow)}>
      <Text>{errorMessage}</Text>
      <Text className={styles.closeIcon} onClick={() => setErrorMessage("")}>
        x
      </Text>
    </div>
  );
};

export const ErrorMsg = (msg) => {
  return <Text style={{ color: "red" }}>{msg.msg}</Text>;
};

export default ErrorMessage;
