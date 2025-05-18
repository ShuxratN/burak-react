import { Box, Container, Stack } from "@mui/material";
import { Card, CardCover, CardContent, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes, retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE $ SELECTOR */
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            {topUsers && topUsers.length > 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  <Card key={member._id} variant="outlined" className="card">
                    <CardCover>
                      <img src={imagePath} alt={member.memberNick} />
                    </CardCover>
                    <CardContent>
                      <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                        {member.memberNick}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Box className="no-data">No active users available</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
