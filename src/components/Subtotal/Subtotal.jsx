import React, { useState } from "react";
import classes from "./Subtotal.module.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBaksetTotal } from "../../reducer";
import { useHistory } from "react-router-dom";

const Subtotal = () => {
  const history = useHistory();

  const [{ basket }] = useStateValue();
  const [msg, setMsg] = useState("");

  const onClickHandler = () => {
    if (basket.length >= 1) {
      history.push("/payment");
    } else {
      setMsg("Please add an item in the basket");
    }
  };

  return (
    <div className={classes.subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items) : <strong>{value}</strong>
            </p>
            <small className={classes.subtotal__gift}>
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBaksetTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button style={{ cursor: "pointer" }} onClick={onClickHandler}>
        Proceed to Checkout
      </button>

      {msg && (
        <p
          style={{
            color: "red",
            marginTop: "2px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          {msg}
        </p>
      )}
    </div>
  );
};

export default Subtotal;
