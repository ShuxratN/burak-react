import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from " .. / .. /components/divider";

const newDishes = [
{ productName: "Cutlet", imagePath: "/img/cutlet.webp" },
{ productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
{ productName: "Kebab", imagePath: "/img/kebab.webp" },
{ productName: "Lavash", imagePath: "/img/lavash.webp" },

export default function NewDishes() {
 return (
<div className={"new-products-frame"}>
<Container>
<Stack className={"main"}>
<Box className={"category-title"}>Fresh Menu</Box>
<Stack className={"cards-frame"}>
<CssVarsProvider>
{newDishes.map((ele, index) => {
return (
<Card key={index} variant="outlined" className={"card"}>
<CardOverflow>
<div className="product-sale">Normal size</div>
<AspectRatio ratio="1">