import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";

function App() {
  return ( <Container maxWidth="sm">
    <Stack flexDirection={"column"}>
     <Box sx={{my: 4}}>
      <Typography variant="h4" component={"h4"}>
        Create React App on TypyScript with React
      </Typography>
     </Box>
     <Box>
      <RippleBadge badgeContent={4}>
      <Button variant="contained" >Contained</Button>
      </RippleBadge>
     </Box>
     <Button variant="contained">Contained</Button>
    </Stack>
  </Container>
  
  );
}

export default App;





