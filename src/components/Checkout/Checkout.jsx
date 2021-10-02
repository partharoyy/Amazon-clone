import React from "react";
import { useStateValue } from "../../StateProvider";
import BasketItem from "../BasketItem/BasketItem";
import Subtotal from "../Subtotal/Subtotal";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const [{ basket, user }] = useStateValue();

  return (
    <div className={classes.checkout}>
      <div className={classes.checkout__left}>
        <img
          className={classes.checkout__ad}
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Grocery/TeaCoffeeStore/Tea_Coffee_Header_1500x200._CB1198675309_.jpg"
          alt="checkout__ad"
        />
        <div>
          <h3 className={classes.username}>
            Hello,{" "}
            {!user
              ? "Guest"
              : user.email.replace("@gmail.com", "").toLowerCase()}
          </h3>
          <h2 className={classes.checkout__title}>Your shopping basket</h2>
          {basket?.map((item) => (
            <BasketItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className={classes.checkout__right}>
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
