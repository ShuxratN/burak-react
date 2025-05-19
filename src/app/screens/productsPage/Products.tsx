import React from "react";
import {Box, Button, Container,  Stack,Badge,  Pagination,PaginationItem, } from "@mui/material";
import TextField from '@mui/material/TextField';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOn from '@mui/icons-material/LocationOn';

import {  useDispatch, } from "react-redux";
import { createSelector, Dispatch } from"@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import { retrievePopularDishes } from "../homePage/selector";
import { retrieveProducts } from "./selector";

/** REDUX SLICE $ SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),// kirib kelayotgan data payload bolyapti
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({ products }));

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
];

export default function Products() {
  return (
    <div className={"products"}>
      <Container>
      <h1 className="burak-rest"> Burak Restaurant</h1>
        <Stack alignItems={"center"}>
          <Stack className={"avatar-big-box"}> 
          
          <TextField className={"type"}
              placeholder="Type here"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Button className="search" variant="contained" color="primary" startIcon={<LocationOn />}>
                      Search
                  </Button>
                )
              }}
              sx={{ width: 300 }}
            />
          </Stack>
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button variant={"contained"} color={"primary"} className={"order"}>
                New
              </Button>
              <Button variant={"contained"} color={"secondary"} className={"order"}>
                Price
              </Button>
              <Button variant={"contained"} color={"secondary"} className={"order"}>
                Views
              </Button>
            </Stack>
          </Stack> 

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Stack className={"category-main"}>
                <Button variant={"contained"} color={"secondary"}>
                  Other
                </Button>
                <Button variant={"contained"} color={"secondary"}>
                  Dessert
                </Button>
                <Button variant={"contained"} color={"secondary"}>
                  Drink
                </Button>
                <Button variant={"contained"} color={"secondary"}>
                  Salad
                </Button>
                <Button variant={"contained"} color={"primary"}>
                  Dish
                </Button>
              </Stack>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => {
                  return (
                    <Stack  key={index} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${product.imagePath})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          height: "361px",
                          width: "273px",
                          borderRadius: "10px",
                          position: "relative",
                          mb: 1.5,
                        }}
                      >
                        <div className={"product-sale"}>Normal size</div>
                        <Button className={"shop-btn"}>
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: "flex" }}
                          />
                        </Button>

                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge badgeContent={20} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color:  "gray",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {12}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          {/* Pagination */}
          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Box className={"burak-rasm"}>
        <div className={"gurme-img"}>
          <img  className={"burak-img"} src="/img/gurme.webp"  />
        </div>
        <div className={"gurme-img"}>
          <img  className={"burak-img"} src="/img/doner.webp"  />
        </div>
        <div className={"gurme-img"}>
          <img  className={"burak-img"} src="/img/sweets.webp"  />
        </div>
        <div className={"gurme-img"}>
          <img  className={"burak-img"} src="/img/seafood.webp"  />
        </div>
        </Box>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}> 
            <Box className={"title"}>Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.
              086297427276!2d-122.42067968468106!3d37.77492927975925!2m3!1f0!
              2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c2f65aaf3%3A0
              x3b1dbd5d44cc7f4c!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1se
              n!2s!4v1615158890612!5m2!1sen!2s"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );  
}
