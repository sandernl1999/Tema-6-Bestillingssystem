import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import cx from "classnames";
import CheckBox from "../CheckBox";
import Button from "../Button";
import Text from "../Text";
import styles from "./index.module.css";
import style from "../../commonStyles.module.css";

const ModalDialog = (props) => {
  const { onClose, cheese, bacon, onChangeCheese, onChangeBacon, ...rest } =
    props;
  return (
    <Dialog
      {...rest}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"if you would like to include cheese or bacon?"}
      </DialogTitle>
      <DialogContent>
        <div className={style.flexRow}>
          <div className={cx(style.flexRow, styles.checkBoxInner)}>
            <Text className={styles.checkboxText}>cheese</Text>
            <CheckBox
              value={cheese}
              onChange={onChangeCheese}
              checked={cheese}
            />
          </div>
          <div className={cx(style.flexRow, styles.checkBoxInner)}>
            <Text className={styles.checkboxText}>bacon</Text>
            <CheckBox value={bacon} onChange={onChangeBacon} checked={bacon} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          title={"Ok"}
          className={styles.btnStyle}
          size={"small"}
          autoFocus
        />
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
