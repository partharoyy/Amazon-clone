import React from "react";
import classes from "./Order.module.css";
import moment from "moment";
import BasketItem from "../BasketItem/BasketItem";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  return (
    <div className={classes.order}>
      <h2 className={classes.order__h2}>Order</h2>
      <p className={classes.date}>
        {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
      </p>
      <p className={classes.order__id}>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <BasketItem
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className={classes.order__total}>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
};

export default Order;
