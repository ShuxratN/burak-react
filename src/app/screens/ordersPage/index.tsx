import { useState, SyntheticEvent, useEffect, } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { TextField, } from "@mui/material";
import FinishedOrders from "./FinishedOrders";
import ProcessOrders from "./ProcessOrders";
import PausedOrders from "./PausedOrders";
import { DefaultRootState, useDispatch, } from "react-redux";
import { Dispatch } from"@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import "../../../css/order.css";

/** REDUX SLICE $ SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),// kirib kelayotgan data payload bolyapti
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data))
});


export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = 
  actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
    .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
    .then((data: Order[]) => setPausedOrders(data))
    .catch((err: any) => console.log(err));

     order
    .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
    .then((data: Order[]) => setProcessOrders(data))
    .catch((err: any) => console.log(err));

     order
    .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
    .then((data: Order[]) => setFinishedOrders(data))
    .catch((err: any) => console.log(err));    
  
  }, [orderInquiry]);
  /** HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="order tabs"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>

            <Stack className="order-main-content">
              <TabPanel value="1">
                <PausedOrders />
              </TabPanel>
              <TabPanel value="2">
                <ProcessOrders />
              </TabPanel>
              <TabPanel value="3">
                <FinishedOrders />
              </TabPanel>
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
                <img
                  src="/img/justin.webp"
                  alt="user-image"
                  className="order-user-avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src="/icons/user-badge.svg"
                    alt="badge"
                    className="order-user-prof-img"
                  />
                </div>
              </div>
              <span className="order-user-name">Justin</span>
              <span className="order-user-prof">User</span>
            
            <Box className="liner">
            <span> Busan South Korea </span>
            </Box>
            </Box>

            <Box className="payment-box">
      <Stack spacing={2}>
        <TextField
          variant="outlined"
          size="small"
          defaultValue="Card number : 5243 4090 2002 7495"
          InputProps={{ readOnly: true }}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            variant="outlined"
            size="small"
            defaultValue="07 / 24"
            InputProps={{ readOnly: true }}
          />
          <TextField
            variant="outlined"
            size="small"
            defaultValue="CVV : 010"
            InputProps={{ readOnly: true }}
          />
        </Stack>
        <TextField
          variant="outlined"
          size="small"
          defaultValue="Justin Robertson"
          InputProps={{ readOnly: true }}
        />
        <Box className="payment-icons" sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <img src="/icons/western-card.svg" alt="Western Union" width={40} />
          <img src="/icons/master-card.svg" alt="MasterCard" width={40} />
          <img src="/icons/paypal-card.svg" alt="PayPal" width={40} />
          <img src="/icons/visa-card.svg" alt="Visa" width={40} />
        </Box>
      </Stack>
    </Box>
           
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
