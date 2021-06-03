import cx from "classnames";
import Text from "../Text";
import {
  chicken_burger,
  burger,
  triple_cheese_burger,
  vegan_burger,
} from "../../public/Images/index";
import Button from "../Button";
import styles from "./index.module.css";
import flexStyle from "../../commonStyles.module.css";
const ItemWrapper = (props) => {
  const { items, onClickAddItem } = props;
  const burgerImages = [
    burger,
    vegan_burger,
    chicken_burger,
    triple_cheese_burger,
  ];
  return (
    <div className={cx(styles.itemsContainer, flexStyle.flexRow)}>
      {items
        .filter((item) => item.type === "Burger")
        .map((item, index) => {
          return (
            <div
              className={cx(styles.productContainer, flexStyle.flexCol)}
              key={index}
            >
              <Text
                style={{
                  color: "#000000cc",
                  fontWeight: "600",
                  textAlign: "center",
                  paddingTop: "8px",
                }}
              >
                {item.name}
              </Text>
              <div
                style={{
                  height: "80px",
                  width: "40%",
                }}
              >
                <img
                  src={burgerImages[index]}
                  alt="Burger Image"
                  aria-label={"Burger Image"}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <div className={cx(styles.buyContainer, flexStyle.flexRow)}>
                <div style={{ margin: "0 2px" }}>{item.price}kr</div>
                <Button
                  title={"Buy"}
                  aria-label={"Buy"}
                  className={styles.buyBtn}
                  size={"small"}
                  onClick={() => onClickAddItem(item)}
                  btnStyle={{ margin: "0 5px" }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ItemWrapper;
