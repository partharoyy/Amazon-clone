import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Link, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Login from "./pages/login/login";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./pages/payment/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./pages/orders/orders";
import Address from "./pages/address/address";

const promise = loadStripe(
  "pk_test_51JZADlSBinj94ng1WecMoLlTpLIKBw4zGhkihhh1wEOmdjzc0XsqQCm4dqxZsXtWXtcCTrOsDYtEaaQxXTBnm0uH00o9okvIsb"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/orders">
          <Header />
          <Orders />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route exact path="/address">
          <Header />
          <Address />
        </Route>
        <Route exact path="/payment">
          {user ? (
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          ) : (
            <div className="nonuser__login">
              <h2>Please login to checkout</h2>
              <Link to="/login" className="payment__link">
                <p className="login__btn">Login</p>
              </Link>
            </div>
          )}
        </Route>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
