import React from "react";
import { useStateValue } from "../../StateProvider";
import classes from "./Basket.module.css";

const BasketItem = ({ id, image, title, price, rating, hideButton }) => {
  const [, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className={classes.basketItem}>
      <img src={image} alt={title} className={classes.basketItem__img} />
      <div className={classes.basketItem__details}>
        <p className={classes.basketItem_title}>{title}</p>
        <p className={classes.basketItem__price}>
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className={classes.basketItem__rating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
};

export default BasketItem;
