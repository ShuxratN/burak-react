import React from "react";
import {Box,Button,Container,  Stack,Badge,  Pagination,PaginationItem, } from "@mui/material";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
        <Stack  alignItems={"center"}>
         {/* <Stack className={"avatar-big-box"}></Stack>*/}
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
                <Button variant={"contained"} color={"secondary"}>
                  Dish
                </Button>
              </Stack>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => {
                  return (
                    <Stack key={index} className={"product-card"}>
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
          <img  className={"burak-img"} src="/img/gurme.webp"  />
        </div>
        <div className={"gurme-img"}>
          <img  className={"burak-img"} src="/img/gurme.webp"  />
        </div>
        <div className={"gurme-img"}>
          <img  className={"burak-img"} src="/img/gurme.webp"  />
        </div>
        </Box>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}> 
            <Box className={"title"}>Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/place/Asaka,+Uzbekistan"
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
