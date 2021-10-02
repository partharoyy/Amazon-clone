import React, { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import { db } from "../../firebase/firebase";
import { useStateValue } from "../../StateProvider";
import classes from "./orders.module.css";

const Orders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snap) =>
          setOrders(
            snap.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [user]);

  return (
    <div className={classes.orders}>
      <h1>Your Orders</h1>
      <div className={classes.orders__order}>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
