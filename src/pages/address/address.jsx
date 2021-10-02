import React, { useState } from "react";
import { db, timestamp } from "../../firebase/firebase";
import { useStateValue } from "../../StateProvider";
import classes from "./address.module.css";

const Account = () => {
  const [{ user }] = useStateValue();
  const [fullName, setFullName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await db
      .collection("users")
      .doc(user?.uid)
      .collection("address")
      .add({
        fullName,
        streetName,
        city,
        state,
        pincode,
        phone,
        timestamp,
      })
      .then(() => {
        setFullName("");
        setStreetName("");
        setCity("");
        setState("");
        setPincode("");
        setPhone("");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className={classes.payment__address}>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          type="text"
          id="name"
          placeholder="Full Name"
        />
        <label htmlFor="address">Address</label>
        <input
          onChange={(e) => setStreetName(e.target.value)}
          value={streetName}
          type="text"
          id="streetName"
          placeholder="Street Name"
        />

        <input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          type="text"
          id="city"
          placeholder="City"
        />

        <input
          onChange={(e) => setState(e.target.value)}
          value={state}
          type="text"
          id="state"
          placeholder="State"
        />

        <input
          onChange={(e) => setPincode(e.target.value)}
          value={pincode}
          type="text"
          id="pincode"
          placeholder="Pincode"
        />

        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          type="text"
          id="phone"
          placeholder="Phone"
        />

        <button>Add Address</button>
      </form>
    </div>
  );
};

export default Account;
