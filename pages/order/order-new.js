import Router from "next/router";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import cx from "classnames";
import {
  HeadView,
  Wrapper,
  Text,
  ItemWrapper,
  AddOnsWrapper,
  ProductSelectedWrapper,
  ModalDialog,
} from "../../components";
import fire from "../../config/firebase-config";
import logoutImg from "../../public/logout.png";
import styles from "./index.module.css";
import style from "../auth/index.module.css";
import flexStyle from "../../commonStyles.module.css";
import Colors from "../../theme";
export async function getServerSideProps() {
  return {
    props: {
      ssr: true,
    },
  };
}

export default function OrderNew() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAddOnsItems, setSelectedAddOnsItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderRefNumber, setOrderRefNumber] = useState("");
  const [disablePurchase, setDisablePurchase] = useState(false);
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [softdrinkSize, setSoftDrinkSize] = useState("");
  const [chocolateSize, setChocolateSize] = useState("");
  const [milkshakeSize, setMilkshakeSize] = useState("");
  const [fries, setFries] = useState(false);
  const [open, setOpen] = useState(false);
  const [cheese, setCheese] = useState(false);
  const [bacon, setBacon] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      Router.push("/auth/signin");
    }
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    const items = [];
    const db = fire.firestore();
    db.collection("order-items").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => items.push(doc.data()));
      setItems(items);
    });
  }, []);

  const addItem = (selectedItem) => {
    setOpen(true);
    const selectedItemsClone = [...selectedItems];
    const filteredItems = selectedItemsClone.filter(
      (item) => item.name === selectedItem.name
    );
    if (filteredItems.length > 0) {
      filteredItems[0].quantity += 1;
    } else {
      selectedItemsClone.push({
        name: selectedItem.name,
        quantity: 1,
        price: selectedItem.price,
      });
    }
    setSelectedItems(selectedItemsClone);
  };

  const removeItem = (index, addOnsItem, name) => {
    if (addOnsItem) {
      const selectedItemsAddOnsClone = [...selectedAddOnsItems];
      const findIndex = selectedItemsAddOnsClone.findIndex(
        (item) => item.name === name
      );
      selectedItemsAddOnsClone.splice(findIndex, 1);
      setSelectedAddOnsItems(selectedItemsAddOnsClone);
    } else {
      const selectedItemsClone = [...selectedItems];
      selectedItemsClone.splice(index, 1);
      setSelectedItems(selectedItemsClone);
    }
  };

  const removeAdOnsItem = (name) => {
    const removeSelecetedItem = [...selectedAddOnsItems];

    const getIndex = selectedAddOnsItems.findIndex(
      (item) => item.name === name
    );
    if (name === "Fries") {
      setFries(false);
    }
    if (name === "Softdrink") {
      setSoftDrinkSize("");
    }
    if (name === "Chocolate") {
      setChocolateSize("");
    }
    if (name === "Strawberry milkshake") {
      setMilkshakeSize("");
    }
    removeSelecetedItem.splice(getIndex, 1);
    setSelectedAddOnsItems(removeSelecetedItem);
  };

  const gerOrderTitle = () => {
    const orderTitle = selectedItems.reduce((accumulator, item) => {
      accumulator += `${item.quantity} ${item.name}, `;
      return accumulator;
    }, "");
    return orderTitle.substring(0, orderTitle.length - 2);
  };

  const quantityChange = (event, index) => {
    const { value } = event.target;
    if (value < 0) {
      event.preventDefault();
      const selectedItemsClone = [...selectedItems];
      setSelectedItems(selectedItemsClone);
    }
    const selectedItemsClone = [...selectedItems];
    selectedItemsClone[index].quantity = value;
    setSelectedItems(selectedItemsClone);
  };

  const addOnsQtyChange = (event, name, price) => {
    const { value } = event.target;
    let val = parseInt(value);
    const selectedAddOnsItemsClones = [...selectedAddOnsItems];
    const filteredItems = selectedAddOnsItemsClones.filter(
      (item) => item.name === name
    );
    if (val < 0) {
      event.preventDefault();
      const selectedAddOnsItemsClone = [...selectedAddOnsItems];
      setSelectedAddOnsItems(selectedAddOnsItemsClone);
    }

    if (filteredItems.length > 0) {
      filteredItems[0].quantity = val;
    } else {
      selectedAddOnsItemsClones.push({
        name: name,
        quantity: val,
        price: price,
      });
    }
    setSelectedAddOnsItems(selectedAddOnsItemsClones);
  };

  const getOrderId = () => {
    var minm = 1000;
    var maxm = 99999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  };

  const getCheeseBaconPrice = (item, type) => {
    const getPrice =
      item && items.filter((chickenItem) => chickenItem.type === type);
    return getPrice.length > 0 ? getPrice[0].price : false;
  };

  const handlePurchase = async () => {
    setDisablePurchase(true);
    const orderRefNumber = getOrderId();
    setShowConfirmation(false);
    const db = fire.firestore();
    const colRef = db.collection("orders");

    colRef
      .add({
        orderRefNumber,
        chicken: getCheeseBaconPrice(cheese, "Cheese"),
        bacon: getCheeseBaconPrice(bacon, "Bacon"),
        addOns: selectedAddOnsItems,
        title: gerOrderTitle(),
        user: JSON.parse(localStorage.getItem("user")).email,
        orderStatus: "Order received",
        orderDateTime: new Date(),
        orderItems: [...selectedItems],
        totalPrice: getOrderTotalPrice(),
      })
      .then(() => {
        setShowConfirmation(true);
        setDisablePurchase(false);
        setOrderRefNumber(orderRefNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrderTotalPrice = () => {
    const orderItemsPrice = selectedItems.reduce((totalPrice, item) => {
      return (totalPrice += item.price * item.quantity);
    }, 0);
    const addOnsPrice = selectedAddOnsItems.reduce((totalPrice, addOn) => {
      let total = isNaN(addOn.quantity) ? 0 : addOn.quantity;
      return (totalPrice += addOn.price * total);
    }, 0);

    const cheesePrice =
      cheese && items.filter((item) => item.type === "Cheese");
    const baconPrice = bacon && items.filter((item) => item.type === "Bacon");
    const totalCheesePrice = cheesePrice.length > 0 ? cheesePrice[0].price : 0;
    const totalBaconPrice = baconPrice.length > 0 ? baconPrice[0].price : 0;
    return parseFloat(
      orderItemsPrice + addOnsPrice + totalCheesePrice + totalBaconPrice
    ).toFixed(2);
  };

  const logoutUser = () => {
    fire.auth().signOut();
    Router.push("/auth/signin");
    localStorage.removeItem("user");
  };

  const onChangeDrinkSize = (size) => {
    setSoftDrinkSize(size);
    const drinkObj = items.filter((item) => item.type === "Softdrink");
    if (softdrinkSize === "") {
      const menuObj = {
        name: "Softdrink",
        quantity: 1,
        price: drinkObj[0]["size"][size],
        type: "Softdrink",
        size: size,
      };
      setSelectedAddOnsItems([...selectedAddOnsItems, menuObj]);
    } else {
      const updatedArray = selectedAddOnsItems.map((item) => {
        if (item.name === "Softdrink") {
          item.price = drinkObj[0]["size"][size];
          return item;
        }
        return item;
      });
      setSelectedAddOnsItems([...updatedArray]);
    }
  };

  const onChangeFries = () => {
    setFries(!fries);
    const friesObj = items.filter((item) => item.type === "Fries");
    if (fries === false) {
      const menuObj = {
        name: "Fries",
        quantity: 1,
        price: friesObj[0].price,
        type: "Fries",
      };
      setSelectedAddOnsItems([...selectedAddOnsItems, menuObj]);
    } else {
      const updatedArray = selectedAddOnsItems.map((item) => {
        if (item.name === "Fries") {
          item.price = friesObj[0].price;
          return item;
        }
        return item;
      });
      setSelectedAddOnsItems([...updatedArray]);
    }
  };

  const onChangeChocolateSize = (size) => {
    setChocolateSize(size);
    const chocolateObj = items.filter((item) => item.type === "Chocolate");
    if (chocolateSize === "") {
      const menuObj = {
        name: "Chocolate",
        quantity: 1,
        price: chocolateObj[0]["size"][size],
        type: "Chocolate",
        size: size,
      };
      setSelectedAddOnsItems([...selectedAddOnsItems, menuObj]);
    } else {
      const updatedArray = selectedAddOnsItems.map((item) => {
        if (item.name === "Chocolate") {
          item.price = chocolateObj[0]["size"][size];
          return item;
        }
        return item;
      });
      setSelectedAddOnsItems([...updatedArray]);
    }
  };

  const onChangeMilkShakeSize = (size) => {
    setMilkshakeSize(size);
    const milkshakeObj = items.filter(
      (item) => item.type === "Strawberry milkshake"
    );
    if (milkshakeSize === "") {
      const menuObj = {
        name: "Strawberry milkshake",
        quantity: 1,
        price: milkshakeObj[0]["size"][size],
        type: "Strawberry milkshake",
        size: size,
      };
      setSelectedAddOnsItems([...selectedAddOnsItems, menuObj]);
    } else {
      const updatedArray = selectedAddOnsItems.map((item) => {
        if (item.name === "Strawberry milkshake") {
          item.price = milkshakeObj[0]["size"][size];
          return item;
        }
        return item;
      });
      setSelectedAddOnsItems([...updatedArray]);
    }
  };

  const getCurrentItemQuantity = (name) => {
    const currentItem = selectedAddOnsItems.filter(
      (item) => item.name === name
    );
    return currentItem[0]?.quantity;
  };

  const getAddOnsItem = (name) => {
    const currentItem = selectedAddOnsItems.filter(
      (item) => item.name === name
    );
    return currentItem?.length > 0;
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChangeCheese = () => {
    setCheese(!cheese);
  };

  const onChangeBacon = () => {
    setBacon(!bacon);
  };

  return (
    <html lang={"en"}>
      <Wrapper className={styles.container}>
        <HeadView title={"Børres burgers"} />
        <main className={style.innerContainer}>
          <div className={cx(styles.orderContainer, flexStyle.flexCol)}>
            <div className={cx(styles.orderInnerContainer)}>
              <div className={cx(styles.orderMsgCenterView, flexStyle.flexCol)}>
                {showConfirmation && (
                  <div>
                    <Text className={styles.cookedMsg}>
                      <div>
                        Food is being cooked<b> {orderRefNumber}</b>
                      </div>
                      <div
                        style={{ marginLeft: "20px" }}
                        onClick={() => setShowConfirmation(!showConfirmation)}
                      >
                        x
                      </div>
                    </Text>
                  </div>
                )}
              </div>
              <div className={cx(styles.logoutContainer, flexStyle.flexCol)}>
                <div
                  style={{
                    alignItems: "center",
                  }}
                  className={flexStyle.flexRow}
                >
                  <Text style={{ fontWeight: 500, color: Colors.black }}>
                    {`Hei ${currentUser?.displayName}`}
                  </Text>
                  <img
                    src={logoutImg}
                    onClick={logoutUser}
                    alt="Logout Image"
                    width={20}
                    tabIndex={"0"}
                    onKeyPress={logoutUser}
                    height={20}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
            <ItemWrapper items={items} onClickAddItem={addItem} />
            <AddOnsWrapper
              items={items}
              onChangeDrinkSize={onChangeDrinkSize}
              onChangeFries={onChangeFries}
              onChangeChocolateSize={onChangeChocolateSize}
              onChangeMilkShakeSize={onChangeMilkShakeSize}
              fries={fries}
              softdrinkSize={softdrinkSize}
              chocolateSize={chocolateSize}
              milkshakeSize={milkshakeSize}
            />
            <ProductSelectedWrapper
              selectedItems={selectedItems}
              quantityChange={quantityChange}
              removeItem={removeItem}
              fries={fries}
              items={items}
              softdrinkSize={softdrinkSize}
              chocolateSize={chocolateSize}
              milkshakeSize={milkshakeSize}
              getOrderTotalPrice={getOrderTotalPrice}
              disablePurchase={disablePurchase}
              handlePurchase={handlePurchase}
              addOnsQtyChange={addOnsQtyChange}
              getCurrentItemQuantity={getCurrentItemQuantity}
              removeAdOnsItem={removeAdOnsItem}
              selectedAddOnsItems={selectedAddOnsItems}
              getAddOnsItem={getAddOnsItem}
              cheese={cheese}
              bacon={bacon}
            />
            <ModalDialog
              fullScreen={fullScreen}
              open={open}
              onClose={onClose}
              cheese={cheese}
              bacon={bacon}
              onChangeCheese={onChangeCheese}
              onChangeBacon={onChangeBacon}
            />
          </div>
        </main>
      </Wrapper>
    </html>
  );
}
