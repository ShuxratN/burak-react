import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

export default function FinishedOrders() {
  return (
    <TabPanel value={"3"}>
      <Stack>
        {[1].map((ele, index) => {
          return (
            <Box key={index} className="order-main-box">
              <Box className="order-box-scroll">
                {[1, 2, 3].map((ele2, index2) => (
                  <Box key={index2} className="orders-name-price">
                    <img
                      src="/img/kebab-fresh.webp"
                      className="order-dish-img"
                      alt="Kebab"
                    />
                    <p className="title-dish">Kebab</p>
                    <Box className="price-box">
                      <p>$12</p>
                      <img src="/icons/close.svg" alt="Close icon" />
                      <p>2</p>
                      <img src="/icons/pause.svg" alt="Pause icon" />
                      <p style={{ marginLeft: "15px" }}>$24</p>
                    </Box>
                  </Box>
                ))}

                <Box className="total-price-box">
                  <Box className="box-total">
                    <p>Product price</p>
                    <p>$24</p>
                    <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} alt="Plus icon" />
                    <p>Delivery cost</p>
                    <p>$2</p>
                    <img src="/icons/pause.svg" style={{ marginLeft: "20px" }} alt="Pause icon" />
                    <p>Total</p>
                    <p>$26</p>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}

        {/* Placeholder for no orders (conditionally hidden now) */}
        {false && (
          <Box display="flex" flexDirection="row" justifyContent="center">
            <img
              src="/icons/noimage-list.svg"
              style={{ width: 300, height: 300 }}
              alt="No orders"
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
