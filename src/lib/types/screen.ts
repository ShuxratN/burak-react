import { Product } from "./product";


/** REACT APP STATE */

export interface AppRootState {
    homePage: HomePageState;
}

export interface HomePageState {
    popularDishes: Product[];
    newDishes:  [];
    topUsers: [];
}