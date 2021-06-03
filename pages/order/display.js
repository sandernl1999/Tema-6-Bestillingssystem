import React, { useEffect } from "react";
import fire from "../../config/firebase-config";
import { HeadView, Wrapper, Text } from "../../components";
import styles from "./index.module.css";
import style from "../auth/index.module.css";

export async function getServerSideProps() {
  return {
    props: {
      ssr: true,
    },
  };
}

export default function Display() {
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    const db = fire.firestore();
    db.collection("orders").onSnapshot(function (querySnapshot) {
      const orders = [];
      querySnapshot.forEach((doc) =>
        orders.push({ ...doc.data(), id: doc.id })
      );
      // Sortere ordere med orderDateTime
      orders.sort((a, b) => b.orderDateTime - a.orderDateTime);
      setOrders(orders);
    });
  }, []);

  return (
    <html lang={"en"}>
      <Wrapper className={styles.displayContainer}>
        <HeadView title={"Børres burgers take-away Orders"} />
        <main className={style.innerContainer}>
          <div className={styles.formContainer}>
            <Text>
              <div className={styles.displayHeader}>Pick-up food</div>
            </Text>
            <Text className={`${styles.displayHeader} ${styles.blackText}`}>
              Orders
            </Text>
            <div className={styles.tableHeader}>
              <div style={{ paddingLeft: 20, fontSize: 18, fontWeight: 500 }}>
                <Text className={styles.blackText}>In the oven</Text>
              </div>
              <div style={{ paddingRight: 20, fontSize: 18, fontWeight: 500 }}>
                <Text className={styles.blackText}>Ready</Text>
              </div>
            </div>
            <div className={styles.productsSelectedContainer}>
              {orders?.length > 0 && (
                <div className={styles.orderNoContainer}>
                  <div>
                    {orders
                      ?.filter(
                        (order) => order.orderStatus === "Order received"
                      )
                      ?.map((order, index) => {
                        return (
                          <div key={index} className={styles.orderField}>
                            <Text className={styles.blackText}>
                              {order.orderRefNumber}{" "}
                            </Text>
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    {orders
                      ?.filter((order) => order.orderStatus === "Ready")
                      ?.map((order, index) => {
                        return (
                          <div key={index} className={styles.orderField}>
                            <Text className={styles.blackText}>
                              {order.orderRefNumber}{" "}
                            </Text>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </html>
  );
}
