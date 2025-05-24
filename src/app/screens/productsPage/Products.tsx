import React, { ChangeEvent, useEffect, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import {Box, Button, Container, Stack, Badge, Pagination, PaginationItem,} from "@mui/material";
import TextField from "@mui/material/TextField";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOn from "@mui/icons-material/LocationOn";

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import Productservice from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { createSelector } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

//** Redux Slice & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data))
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const {products} = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory()

  useEffect(() => {
    const product = new Productservice();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  // Clear search when searchText cleared
  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch((prev) => ({ ...prev, search: "" }));
    }
  }, [searchText]);

  //* HANDLERS *//

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch});
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch});
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch});
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
     productSearch.page = value;
     setProductSearch({ ...productSearch});
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <h1 className="burak-rest">Burak Restaurant</h1>
        <Stack alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <TextField
              className={"type"}
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
                    startIcon={<LocationOn />}
                    onClick={searchProductHandler} // added click handler
                  >
                    Search
                  </Button>
                ),
              }}
              sx={{ width: 300 }}
            />
          </Stack>

          {/* Order Buttons */}
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              {["createdAt", "productPrice", "productViews"].map((ord) => (
                <Button
                  key={ord}
                  variant={"contained"}
                  className={"order"}
                  color={productSearch.order === ord ? "primary" : "secondary"}
                  onClick={() => searchOrderHandler(ord)}
                >
                  {ord === "createdAt"
                    ? "New"
                    : ord === "productPrice"
                    ? "Price"
                    : "Views"}
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* Product Collection Buttons */}
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Stack className={"category-main"}>
                {[
                  ProductCollection.OTHER,
                  ProductCollection.DESSERT,
                  ProductCollection.DRINK,
                  ProductCollection.SALAD,
                  ProductCollection.DISH,
                ].map((collection) => (
                  <Button
                    key={collection}
                    variant={"contained"}
                    color={
                      productSearch.productCollection === collection
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => searchCollectionHandler(collection)}
                  >
                    {collection}
                  </Button>
                ))}
              </Stack>
            </Stack>

            {/* Products List */}
            <Stack className={"product-wrapper"}>
              {Array.isArray(products) && products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " litre"
                      : product.productSize + " size";

                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                        }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button 
                        className={"shop-btn"}
                        onClick={(e) => {
                          onAdd ({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });
                          e.stopPropagation();
                        }}
                        >
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: "flex" }}
                            alt="Add to cart"
                          />
                        </Button>

                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
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
              count=
              {products.length !== 0 
              ? productSearch.page + 1
              : productSearch.page
            } // TODO: Replace with actual total pages from API response
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

      {/* Brands Logos & Address omitted for brevity */}
    </div>
  );
}
