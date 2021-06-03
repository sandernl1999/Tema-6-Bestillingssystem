import { Button as Btn } from "@material-ui/core";
import styles from "./index.module.css";
import cx from "classnames";
import Text from "../Text";
const Button = (props) => {
  const { title, btnStyle, className, fullWidth, titleStyle, ...rest } = props;
  return (
    <div style={{ marginTop: "10px", ...btnStyle }}>
      <Btn
        variant="contained"
        className={cx(styles.button, className)}
        disableElevation
        fullWidth={fullWidth ? fullWidth : true}
        {...rest}
      >
        <Text style={titleStyle}>{title}</Text>
      </Btn>
    </div>
  );
};
export default Button;
