import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

const newDishes = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp", price: 12 },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp", price: 12 },
  { productName: "Kebab", imagePath: "/img/kebab.webp", price: 12 },
  { productName: "Lavash", imagePath: "/img/lavash.webp", price: 12 },
];

export default function NewDishes() {
  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Fresh Menu</Box>
          <Stack className="cards-frame" direction="row" flexWrap="wrap" spacing={2}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((ele, index) => (
                  <Card key={`${ele.productName}-${index}`} variant="outlined" className="card">
                    <CardOverflow>
                      <div className="product-sale">Normal size</div>
                      <AspectRatio ratio="1">
                        <img src={ele.imagePath} alt={ele.productName} />
                      </AspectRatio>
                    </CardOverflow>

                    <CardOverflow variant="soft" className="product-detail">
                      <Stack className="info">
                        <Stack flexDirection="row" alignItems="center" spacing={1}>
                          <Typography className="title">{ele.productName}</Typography>
                          <Divider width="2" height="24" bg="#d9d9d9" />
                          <Typography className="price">${ele.price}</Typography>
                        </Stack>
                        <Typography className="views">
                          20
                          <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                        </Typography>
                      </Stack>
                    </CardOverflow>
                  </Card>
                ))
              ) : (
                <Box className="no-data">No new dishes available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
