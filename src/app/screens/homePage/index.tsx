import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { DefaultRootState, useDispatch, } from "react-redux";
import { Dispatch } from"@reduxjs/toolkit";
import { setNewDishes, setPolpularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import Productservice from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css"

/** REDUX SLICE $ SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPolpularDishes: (data: Product[]) => dispatch(setPolpularDishes(data)),// kirib kelayotgan data payload bolyapti
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data))
});


export default function HomePage() {
  const { setPolpularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());

  useEffect(() => {
    const product = new Productservice(); // Beckend server data fetch => Data 
    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    })
    .then((data) => {
      setPolpularDishes(data); // popular dishes yuklanmoqda
    })
    .catch((err) => console.log(err));

    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      //productCollection: ProductCollection.DISH,
    })
    .then((data) => setNewDishes(data))
    .catch((err) => console.log(err));

    const member = new MemberService();
    member
    .getTopUsers()
    .then((data) => setTopUsers(data))
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
