import React from "react";
import classes from "./Product.module.css";
import { useStateValue } from "../../StateProvider";

const Product = ({ id, title, image, price, rating }) => {
  const [, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className={classes.product}>
      <div className={classes.product__info}>
        <p>{title}</p>
        <p className={classes.product__price}>
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className={classes.product__rating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="product_img" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
