import { Box, CardContent, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CardCover, CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";

const activeUsers = [
  { memberNick: "Martin", memberImage: "/img/martin.webp" },
  { memberNick: "Justin", memberImage: "/img/justin.webp" },
  { memberNick: "Rose", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function Statistics() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            {activeUsers.length !== 0 ? (
              activeUsers.map((ele) => (
                <CssVarsProvider key={ele.memberNick}>
                  <Card className="card">
                    <CardCover>
                      <img src={ele.memberImage} alt={ele.memberNick} />
                    </CardCover>
                    <CardCover className="card-cover" />
                    <CardContent sx={{ justifyContent: "flex-end" }}>
                      <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          level="h2"
                          fontSize="lg"
                          textColor="#fff"
                          mb={1}
                          className="member-nickname"
                        >
                          {ele.memberNick}
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: "md",
                            color: "neutral.300",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                        </Typography>
                      </Stack>
                    </CardContent>

                    {/* 👇 Added username under the image */}
                    <CardOverflow
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingY: 1,
                      }}
                    >
                      <Typography
                        marginTop={15}
                        fontWeight="md"
                        textAlign="center"
                        className="member-nickname"
                      >
                        {ele.memberNick}
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              ))
            ) : (
              <Box className="no-data">No active users available</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
