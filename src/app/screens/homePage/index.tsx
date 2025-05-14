import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css"

import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { Dispatch } from"@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPolpularDishes } from "./slice";
import { retrieveNewDishes, retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE $ SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPolpularDishes: (data: Product[]) => dispatch(setPolpularDishes(data)),
});
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function HomePage() {
  const { setPolpularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);


  useEffect(() => {
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
