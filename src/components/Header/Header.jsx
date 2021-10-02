import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import HeaderLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth, db } from "../../firebase/firebase";
import LocationIcon from "../../assets/location.png";

const Header = () => {
  const [{ basket, user }] = useStateValue();
  const [add, setAdd] = useState([]);

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
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
        setAdd(address);
      });
  }, [user, setAdd]);

  const finalAdd = Object.values(add);

  return (
    <div className={classes.header}>
      <Link to="/">
        <img src={HeaderLogo} alt="logo" className={classes.header__logo} />
      </Link>

      <span className={classes.in}>.in</span>

      <div className={classes.header__address}>
        <Link to="/address" className={classes.header__location}>
          <img
            src={LocationIcon}
            alt="location__icon"
            className={classes.header__locationIcon}
          />
          <div className={classes.header__option}>
            <span
              className={`${classes.header__optionLineOne} ${classes.header__add}`}
            >
              Deliver to{" "}
              {finalAdd[0]?.fullName ? finalAdd[0].fullName : "Guest"}
            </span>
            <span className={classes.header__optionLineTwo}>
              {`${finalAdd[0]?.city ? finalAdd[0].city : "city"} ${
                finalAdd[0]?.pincode ? finalAdd[0].pincode : "pincode"
              }`}
            </span>
          </div>
        </Link>
      </div>

      <div className={classes.header__search}>
        <input type="text" className={classes.header__searchInput} />
        <SearchIcon className={classes.header__searchIcon} />
      </div>
      <div className={classes.header__nav}>
        <Link to={!user && "/login"} className={classes.header__user}>
          <div onClick={handleAuth} className={classes.header__option}>
            <span className={classes.header__optionLineOne}>
              Hello{" "}
              {!user
                ? "Guest"
                : user.email.replace("@gmail.com", "").toLowerCase()}
            </span>
            <span className={classes.header__optionLineTwo}>
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders" className={classes.header__orders}>
          <div className={classes.header__option}>
            <span className={classes.header__optionLineOne}>Returns</span>
            <span className={classes.header__optionLineTwo}>& Orders</span>
          </div>
        </Link>

        <div className={classes.header__option}>
          <span className={classes.header__optionLineOne}>Your</span>
          <span className={classes.header__optionLineTwo}>Prime</span>
        </div>
        <Link to="/checkout" className={classes.header__checkout}>
          <div className={classes.header__optionBasket}>
            <ShoppingBasketIcon />
            <span
              className={`${classes.header__optionLineTwo} ${classes.header__basketCount}`}
            >
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
