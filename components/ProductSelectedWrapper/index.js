import cx from "classnames";
import { useEffect, useState } from "react";
import { burger } from "../../public/Images";
import Button from "../Button";
import styles from "./index.module.css";
import flexStyles from "../../commonStyles.module.css";
import Text from "../Text";
const ProductSelectedWrapper = (props) => {
  const {
    selectedItems,
    quantityChange,
    removeItem,
    fries,
    items,
    softdrinkSize,
    chocolateSize,
    milkshakeSize,
    getOrderTotalPrice,
    disablePurchase,
    handlePurchase,
    addOnsQtyChange,
    getCurrentItemQuantity,
    removeAdOnsItem,
    selectedAddOnsItems,
    cheese,
    bacon,
  } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const resizeFunction = () => {
    if (window.innerWidth <= 570) {
      setMobileOpen(true);
    } else {
      setMobileOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);
  return (
    <div className={cx(styles.productsSelectedContainer, flexStyles.flexCol)}>
      {selectedItems.length > 0 && (
        <div className={styles.selectedProductsContainer}>
          <div name="selectedItems" className={styles.itemsHeader}>
            <div className={styles.divWidth}>
              <Text className={styles.text}>Mat</Text>
            </div>
            <div className={styles.divWidth}>
              <Text className={styles.text}>Pris</Text>
            </div>
            <div className={styles.divWidth}>
              <Text className={styles.text}>Antall</Text>
            </div>
          </div>
          <div>
            {selectedItems.map((item, index) => {
              return (
                <SelectedView
                  key={index}
                  selectedItems={selectedItems}
                  removeItem={removeItem}
                  name={item.name}
                  price={item.price}
                  onChange={(event) => quantityChange(event, index)}
                  quantity={item.quantity}
                  onClickRemove={() => removeItem(index)}
                />
              );
            })}
          </div>
          {cheese && (
            <SelectedView name={"Cheese"} price={20} type={"Cheese"} />
          )}
          {bacon && <SelectedView name={"Bacon"} price={20} type={"Bacon"} />}
          {fries &&
            selectedAddOnsItems?.filter(
              // eslint-disable-next-line use-isnan
              (item) => item.name === "Fries"
            ).length > 0 && (
              <SelectedView
                name={"Fries"}
                type={"Fries"}
                items={items}
                quantity={getCurrentItemQuantity("Fries")}
                price={items.filter((item) => item.type === "Fries")[0].price}
                onChange={(event) =>
                  addOnsQtyChange(
                    event,
                    "Fries",
                    items.filter((item) => item.type === "Fries")[0].price
                  )
                }
                onClickRemove={() => removeAdOnsItem("Fries")}
              />
            )}
          {softdrinkSize &&
            selectedAddOnsItems?.filter(
              // eslint-disable-next-line use-isnan
              (item) => item.name === "Softdrink"
            ).length > 0 && (
              <SelectedView
                // key={index}
                name={`Soda - ${softdrinkSize}`}
                type={"Softdrink"}
                items={items}
                quantity={getCurrentItemQuantity("Softdrink")}
                price={
                  items.filter((item) => item.type === "Softdrink")[0]["size"][
                    softdrinkSize
                  ]
                }
                onChange={(event) =>
                  addOnsQtyChange(
                    event,
                    "Softdrink",
                    items.filter((item) => item.type === "Softdrink")[0][
                      "size"
                    ][softdrinkSize]
                  )
                }
                onClickRemove={() => removeAdOnsItem("Softdrink")}
              />
            )}
          {chocolateSize &&
            selectedAddOnsItems?.filter(
              // eslint-disable-next-line use-isnan
              (item) => item.name === "Chocolate"
            ).length > 0 && (
              <SelectedView
                name={`Chocolate - ${chocolateSize}`}
                type={"Chocolate"}
                items={items}
                quantity={getCurrentItemQuantity("Chocolate")}
                price={
                  items.filter((item) => item.type === "Chocolate")[0]["size"][
                    chocolateSize
                  ]
                }
                onChange={(event) =>
                  addOnsQtyChange(
                    event,
                    "Chocolate",
                    items.filter((item) => item.type === "Chocolate")[0][
                      "size"
                    ][chocolateSize]
                  )
                }
                onClickRemove={() => removeAdOnsItem("Chocolate")}
              />
            )}
          {milkshakeSize &&
            selectedAddOnsItems?.filter(
              (item) => item.name === "Strawberry milkshake"
            ).length > 0 && (
              <SelectedView
                name={`MilkShake - ${milkshakeSize}`}
                type={"Strawberry milkshake"}
                items={items}
                price={
                  items.filter(
                    (item) => item.type === "Strawberry milkshake"
                  )[0]["size"][milkshakeSize]
                }
                quantity={getCurrentItemQuantity("Strawberry milkshake")}
                onChange={(event) =>
                  addOnsQtyChange(
                    event,
                    "Chocolate",
                    items.filter(
                      (item) => item.type === "Strawberry milkshake"
                    )[0]["size"][milkshakeSize]
                  )
                }
                onClickRemove={() => removeAdOnsItem("Strawberry milkshake")}
              />
            )}
          <div
            style={{
              borderTop: "1px solid",
              margin: mobileOpen ? 0 : "0 15px",
            }}
          >
            <div style={{ marginLeft: "75%", marginTop: "10px" }}>
              <label style={{ fontWeight: "bold" }}>Total</label> kr
              {getOrderTotalPrice()}
            </div>
          </div>
          <div className={cx(styles.btnWrapper)}>
            <Button
              style={
                disablePurchase
                  ? {
                      backgroundColor: "#26779973",
                    }
                  : {
                      backgroundColor: "#267799f2",
                    }
              }
              btnStyle={{ margin: "20px 15px" }}
              className={styles.button}
              title={"Pay"}
              onClick={handlePurchase}
              disabled={disablePurchase}
              aria-label={"Pay button"}
              aria-required="true"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductSelectedWrapper;
const SelectedView = (props) => {
  const { name, type, price, onChange, quantity, onClickRemove } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const resizeFunction = () => {
    if (window.innerWidth <= 800) {
      setMobileOpen(true);
    } else {
      setMobileOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);
  return (
    <div className={styles.itemsHeader}>
      <div className={styles.imageWrapper}>
        {name === "Cheese" || name === "Bacon" ? (
          <></>
        ) : (
          <img src={burger} alt="Burger Image" width={80} height={80} />
        )}
        <div style={{ marginLeft: "5px" }}>
          <Text className={cx(styles.text, styles.nameText)}>{name}</Text>
        </div>
      </div>
      <div className={cx(styles.imageWrapper, styles.priceWrapper)}>
        <Text className={styles.text} style={{ color: "black" }}>
          {type && price}
        </Text>
        <Text className={styles.text} style={{ color: "black" }}>
          {!type && price}
        </Text>
      </div>
      <div className={cx(styles.imageWrapper, styles.qtyWrapper)}>
        {name === "Cheese" || name === "Bacon" ? (
          <div />
        ) : (
          <input
            className={styles.input}
            type="number"
            value={quantity}
            onChange={onChange}
          />
        )}
        {name === "Cheese" || name === "Bacon" ? (
          <div />
        ) : (
          <Button
            style={{
              height: mobileOpen ? "25px" : "35px",
              backgroundColor: "#EC7063",
              border: "none",
              width: mobileOpen ? "50px" : "80px",
            }}
            className={styles.button}
            btnStyle={{ marginTop: mobileOpen ? "5px" : 0 }}
            onClick={onClickRemove}
            title={"Fjern"}
            aria-label={"Delete button"}
            aria-required="true"
          />
        )}
      </div>
    </div>
  );
};
