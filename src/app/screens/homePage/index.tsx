import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { DefaultRootState, useDispatch, } from "react-redux";
import { Dispatch } from"@reduxjs/toolkit";
import { setNewDishes, setPolpularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import Productservice from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import "../../../css/home.css"

/** REDUX SLICE $ SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPolpularDishes: (data: Product[]) => dispatch(setPolpularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
});


export default function HomePage() {
  const { setPolpularDishes } = actionDispatch(useDispatch());

  useEffect(() => {
    // Beckend server data fetch => Data 
    const product = new Productservice;
    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    })
    .then((data) => {
      setPolpularDishes(data);
    })
    .catch((err) => console.log(err));

    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      //productCollection: ProductCollection.DISH,
    })
    .then((data) => {
      setNewDishes(data);
    })
    .catch((err) => console.log(err));

  }, []);

  

    return ( 
     <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
      </div>
    );
  }

function PopularDishesRetriever(state: DefaultRootState): unknown {
  throw new Error("Function not implemented.");
}
