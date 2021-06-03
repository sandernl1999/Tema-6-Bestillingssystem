import React, { useEffect, useState } from "react";
import cx from "classnames";
import fire from "../../config/firebase-config";
import { HeadView, Wrapper, Button, Text } from "../../components";
import styles from "./index.module.css";
import style from "../auth/index.module.css";

export async function getServerSideProps() {
  return {
    props: {
      ssr: true,
    },
  };
}

export default function kitchen() {
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    const db = fire.firestore();
    db.collection("orders").onSnapshot((querySnapshot) => {
      let orders = [];
      querySnapshot.forEach((doc) =>
        orders.push({ ...doc.data(), id: doc.id })
      );
      // Sorter ordre - orderDateTime
      orders = orders.sort((a, b) => b.orderDateTime - a.orderDateTime);
      orders = orders.filter(
        (order) => order.orderStatus !== "Picked-up/finished"
      );
      setOrders(orders);
    });
  }, []);

  const updateOrderStatus = (status, docId) => {
    const db = fire.firestore();
    db.collection("orders")
      .doc(docId)
      .update({ orderStatus: status })
      .then(() => {})
      .catch((e) => console.log(e));
  };

  return (
    <html lang={"en"}>
      <Wrapper>
        <HeadView title={"Burger Take Away order"} />
        <main className={style.innerContainer}>
          <div className={styles.kitchenFormContainer}>
            <div className={styles.Header}>Børres </div>
            <div className={styles.tableHeader}>
              <div className={styles.newOrderStatus}>
                <Text className={styles.blackText}>New order</Text>
              </div>
              <div className={styles.newOrderStatus}>
                <Text className={styles.blackText}>Status?</Text>
              </div>
            </div>
            <div className={styles.productsSelectedContainer}>
              {orders?.length > 0 && (
                <div>
                  {orders.map((order, index) => {
                    return (
                      <div key={index} className={styles.kitchenInnerContainer}>
                        <div className={styles.leftRightBlock}>
                          <Text
                            style={{
                              fontSize: "22px",
                              fontWeight: 500,
                              wordBreak: "break-word",
                              color: "black",
                              paddingRight: "5px",
                            }}
                          >
                            {order.title}
                            <p
                              style={{ fontSize: "16px", fontWeight: "normal" }}
                            >
                              {order?.addOns?.map((addon) =>
                                addon.type === "Fries"
                                  ? `+${addon.quantity} Fries`
                                  : ` +${addon.quantity} ${addon.size} ${addon.type}`
                              )}
                              {order.chicken && "+1 Chicken"}
                              {order.bacon && "+1 Bacon"}
                            </p>
                          </Text>
                        </div>
                        <div
                          className={cx(
                            styles.leftRightBlock,
                            styles.rightBlock
                          )}
                        >
                          {order?.orderStatus === "Order received" ? (
                            <StatusButton
                              onClick={() =>
                                updateOrderStatus("Ready", order.id)
                              }
                              title={"Ready?"}
                              titleStyle={{ color: "black" }}
                            />
                          ) : (
                            <StatusButton
                              onClick={() =>
                                updateOrderStatus("Ready", order.id)
                              }
                              title={"Ready?"}
                              className={styles.readyGreenBtn}
                              titleStyle={{ color: "black" }}
                            />
                          )}
                          {order.orderStatus === "Ready" ? (
                            <StatusButton
                              onClick={() =>
                                updateOrderStatus(
                                  "Picked-up/finished",
                                  order.id
                                )
                              }
                              title={"Picked up?"}
                              titleStyle={{ color: "black" }}
                            />
                          ) : order?.orderStatus === "Picked-up/finished" ? (
                            <StatusButton
                              className={styles.readyGreenBtn}
                              title={"Picked up?"}
                              titleStyle={{ color: "black" }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </html>
  );
}

const StatusButton = (props) => {
  const { title, onClick, className, titleStyle } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const resizeFunction = () => {
    if (window.innerWidth <= 350) {
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
    <div className={styles.btnMarginStyle}>
      <Button
        onClick={onClick}
        tabIndex={"0"}
        aria-label={title}
        className={cx(styles.button, styles.btnWidth, className)}
        title={title}
        btnStyle={{
          marginTop: 0,
          margin: mobileOpen ? 0 : "0 10px",
        }}
        fullWidth={false}
        titleStyle={titleStyle}
      />
    </div>
  );
};
