import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import BasketItem from "../../components/BasketItem/BasketItem";
import { getBaksetTotal } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import classes from "./payment.module.css";
import { db } from "../../firebase/firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const [addressFirebase, setAddressFirebase] = useState([]);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBaksetTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .collection("address")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const address = {};
        querySnapshot.forEach(async (item) => {
          address[item.id] = item.data();
        });
        setAddressFirebase(address);
      });
  }, [user, setAddressFirebase]);

  const finalAddress = Object.values(addressFirebase);

  return (
    <div className={classes.payment}>
      <div className={classes.payment__container}>
        <h1 className={classes.checkout__heading}>
          {user ? "Checkout" : "Checkout as guest"} (
          <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <div className={classes.payment__address}>
              <Link to="/address" className={classes.address__link}>
                <p>Enter delivery address</p>
              </Link>

              <h4 style={{ margin: "1rem 5rem" }}>or</h4>

              <h3 className={classes.address_title}>
                Continue with below address
              </h3>
              <div className={classes.address_details}>
                <p>{finalAddress[0]?.fullName}</p>
                <p>{finalAddress[0]?.streetName}</p>
                <p>{finalAddress[0]?.city}</p>
                <p>{finalAddress[0]?.state}</p>
                <p>{finalAddress[0]?.pincode}</p>
                <p>{finalAddress[0]?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Review items</h3>
          </div>
          <div className={classes.payment__items}>
            {basket?.map((item) => (
              <BasketItem
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton
              />
            ))}
          </div>
        </div>
        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Payment Method</h3>
          </div>
          <div className={classes.payment__details}>
            <form onSubmit={handleSubmit}>
              <CardElement
                onChange={handleChange}
                className={classes.payment__cardElement}
              />
              <div className={classes.payment__cardElement__borderBtm} />
              <div className={classes.payment__priceContainer}>
                <CurrencyFormat
                  renderText={(value) => (
                    <h3 className={classes.order__total}>
                      Order Total: {value}
                    </h3>
                  )}
                  decimalScale={2}
                  value={getBaksetTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
