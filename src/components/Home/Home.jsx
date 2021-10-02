import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import classes from "./Home.module.css";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://fakestoreapi.com/products",
};

const getProductData = async () => {
  return await axios.request(options);
};

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductData().then((data) => setProducts(data?.data));
  }, []);

  const product1 = products[0];
  const product2 = products[2];
  const product3 = products[6];
  const product4 = products[19];
  const product5 = products[12];
  const product6 = products[13];

  return (
    <div className={classes.home}>
      <div className={classes.home__container}>
        <img
          className={classes.home__image}
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/placement/launch/All_Or_Nothing_Tottenham_Hotspur_S1/AONT_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB406302419_.jpg"
          alt=""
        />
        <div className={classes.home__row}>
          <Product
            id={product1?.id}
            title={product1?.title}
            price={400}
            image={product1?.image}
            rating={4}
          />

          <Product
            id={product2?.id}
            title={product2?.title}
            price={2499}
            image={product2?.image}
            rating={5}
          />
        </div>
        <div className={classes.home__row}>
          <Product
            id={product3?.id}
            title={product3?.title}
            price={999}
            image={product3?.image}
            rating={4}
          />
          <Product
            id={product4?.id}
            title={product4?.title}
            price={1199}
            image={product4?.image}
            rating={5}
          />
          <Product
            id={product5?.id}
            title={product5?.title}
            price={12999}
            image={product5?.image}
            rating={4}
          />
        </div>
        <div className={classes.home__row}>
          <Product
            id={product6?.id}
            title={product6?.title}
            price={33999}
            image={product6?.image}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
