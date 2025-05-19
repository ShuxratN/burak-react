import React, { ChangeEvent, useEffect, useState } from "react";
import {Box, Button, Container,  Stack,Badge,  Pagination,PaginationItem, } from "@mui/material";
import TextField from '@mui/material/TextField';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOn from '@mui/icons-material/LocationOn';

import {  useDispatch, useSelector, } from "react-redux";
import { createSelector, Dispatch } from"@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import Productservice from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { Collections } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

/** REDUX SLICE $ SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),// kirib kelayotgan data payload bolyapti
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({ products,
 }));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
      page: 1,
      limit: 8,
      order: "createdAt",
      productCollection: ProductCollection.DISH,
      search: "",
    })
    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();

  useEffect(( ) => {
    const product = new Productservice();
    product
    .getProducts(productSearch)
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch})
    }
  }, [searchText]);

  //** handlers */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order,
    setProductSearch({ ...productSearch });
  }
   
  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch});
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/product/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
      <h1 className="burak-rest"> Burak Restaurant</h1>
        <Stack alignItems={"center"}>
          <Stack className={"avatar-big-box"}> 
          
          <TextField className={"type"}
              variant="outlined"
              placeholder="Type here"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchProductHandler();
              }}
              
              
              InputProps={{
                startAdornment: (
                  <Button 
                  className="search" 
                  variant="contained" 
                  color="primary" 
                  startIcon={<LocationOn />}>
                      Search
                  </Button>
                )
              }}
              sx={{ width: 300 }}
            />
          </Stack>
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button 
              variant={"contained"} 
              className={"order"}
              color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler( "createdAt")} 
              >
                New
              </Button>
              <Button 
              variant={"contained"} 
              className={"order"}
              color={
                  productSearch.order === "productPrice" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler( "productPrice")} 
              >
                Price
              </Button>
              <Button 
              variant={"contained"} 
              className={"order"}
              color={
                  productSearch.order === "productViews" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler( "productViews")} 
              >
                Views
              </Button>
            </Stack>
          </Stack> 

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Stack className={"category-main"}>
                <Button 
                variant={"contained"} 
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                  ? "primary"
                  : "secondary"}
                onClick={() => 
                  searchCollectionHandler(ProductCollection.OTHER)}
                >
                  Other
                </Button>
                <Button 
                variant={"contained"} 
                color={
                  productSearch.productCollection === ProductCollection.DESSERT
                  ? "primary"
                  : "secondary"}
                onClick={() => 
                  searchCollectionHandler(ProductCollection.DESSERT)}
                >
                  Dessert
                </Button>
                <Button 
                variant={"contained"} 
                color={
                  productSearch.productCollection === ProductCollection.DRINK
                  ? "primary"
                  : "secondary"}
                onClick={() => 
                  searchCollectionHandler(ProductCollection.DRINK)}
                >
                  Drink
                </Button>
                <Button 
                variant={"contained"} 
               color={
                  productSearch.productCollection === ProductCollection.SALAD
                  ? "primary"
                  : "secondary"}
                onClick={() => 
                  searchCollectionHandler(ProductCollection.SALAD)}
                >
                  Salad
                </Button>
                <Button
                variant={"contained"} 
              color={
                  productSearch.productCollection === ProductCollection.DISH
                  ? "primary"
                  : "secondary"}
                onClick={() => 
                  searchCollectionHandler(ProductCollection.DISH)}
                >
                  Dish
                </Button>
              </Stack>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume = 
                  product.productCollection === ProductCollection.DRINK
                  ? product.productVolume + " litre"
                  : product.productSize + " size";
                  return (
                    <Stack  key={product._id} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                        }}
                      >
                        <div className={"product-sale"}>{sizeVolume} </div>
                        <Button className={"shop-btn"}>
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: "flex" }}
                          />
                        </Button>

                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color: 
                                product.productViews === 0 ? "gray" : "white",
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
                          {product.productPrice}
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
              count={
                products.length !== 0
                ? productSearch.page + 1 
                : productSearch.page
              }
              page={productSearch.page}
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
              onChange={paginationHandler}
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
