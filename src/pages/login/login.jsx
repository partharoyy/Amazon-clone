import React, { useState } from "react";
import classes from "./login.module.css";
import LoginLogo from "../../assets/login__logo.png";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={classes.login}>
      <Link to="/">
        <img className={classes.login__logo} src={LoginLogo} alt="login_logo" />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={classes.login__signInButton}
            onClick={signIn}
            type="submit"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to Amazon's fake clone Conditions of Use &
          Sale. Please see our privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          className={classes.login__registerButton}
          type="submit"
          onClick={register}
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
