import cx from "classnames";
import Text from "../Text";
import styles from "./index.module.css";
import SelectBox from "../SelectBox";
import CheckBox from "../CheckBox";
import flexStyle from "../../commonStyles.module.css";
const AddOnsWrapper = (props) => {
  const {
    items,
    onChangeDrinkSize,
    onChangeFries,
    onChangeChocolateSize,
    onChangeMilkShakeSize,
    fries,
    softdrinkSize,
    chocolateSize,
    milkshakeSize,
  } = props;
  return (
    <div className={cx(styles.addOnsContainer, flexStyle.flexRow)}>
      {items
        .filter((item) => item.type === "Softdrink" || item.type === "Fries")
        .map((item, index) => {
          if (item.type === "Softdrink") {
            return (
              <div key={index} className={styles.addOnsBox}>
                <div className={styles.selectBoxContainer}>
                  <Text className={styles.addOnsTitle}>{item.type}</Text>
                </div>
                <div className={styles.selectBoxContainer}>
                  <SelectBox
                    onChange={onChangeDrinkSize}
                    name={item.type}
                    size={item.size}
                    defaultSize={softdrinkSize}
                  />
                </div>
              </div>
            );
          } else if (item.type === "Fries") {
            return (
              <div key={index} className={styles.addOnsBox}>
                <div className={styles.selectBoxContainer}>
                  <Text className={styles.addOnsTitle}>Fries</Text>
                </div>
                <div className={styles.selectBoxContainer}>
                  <CheckBox
                    aria-label={"CheckBox"}
                    value={fries ? "Yes" : "No"}
                    onChange={onChangeFries}
                    checked={!!fries}
                  />
                </div>
              </div>
            );
          }
        })}
      {items
        .filter(
          (item) =>
            item.type === "Chocolate" || item.type === "Strawberry milkshake"
        )
        .map((item, index) => {
          if (item.type === "Chocolate") {
            return (
              <div key={index} className={styles.addOnsBox}>
                <div className={styles.selectBoxContainer}>
                  <Text className={styles.addOnsTitle}>{item.type}</Text>
                </div>
                <div className={styles.selectBoxContainer}>
                  <SelectBox
                    onChange={onChangeChocolateSize}
                    name={item.type}
                    size={item.size}
                    defaultSize={chocolateSize}
                  />
                </div>
              </div>
            );
          } else if (item.type === "Strawberry milkshake") {
            return (
              <div key={index} className={styles.addOnsBox}>
                <div className={styles.selectBoxContainer}>
                  <Text className={styles.addOnsTitle}>{item.type}</Text>
                </div>
                <div className={styles.selectBoxContainer}>
                  <SelectBox
                    onChange={onChangeMilkShakeSize}
                    name={item.type}
                    size={item.size}
                    defaultSize={milkshakeSize}
                  />
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default AddOnsWrapper;
