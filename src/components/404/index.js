import React from "react";
import { Typography, Card, CardContent, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Header from "@components/header";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    backgroundColor: "#F4F6F8",
    display: "flex",
    height: "100%",
    minHeight: "calc(100vh - 110px)",
    flexDirection: "column",
    paddingBottom: 80,
    paddingTop: 80,
    "@media (max-width: 767px)": {
      minHeight: "calc(100vh - 78px)",
    },
  },
  card: {
    overflow: "visible",
    display: "flex",
    position: "relative",
    maxWidth: 621,
    margin: "auto",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%",
    },
  },
  content: {
    padding: theme.spacing(7, 7, 7, 7),
  },
}));

function PageNotFound() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.root}>
        <Container maxWidth="md">
          <Card className={classes.card}>
            <CardContent classes={{ root: classes.content }}>
              <Typography variant="h2" color="primary">
                404 Page Not Found
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
}
export default PageNotFound;
