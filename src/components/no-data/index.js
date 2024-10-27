import React from "react";
import { Typography, Card, CardContent, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    minHeight: "calc(100vh - 300px)",
    flexDirection: "column",
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
    // backgroundColor: "#F4F6F8",
    display: "flex",
    justifyContent: "center",
  },
}));

function NoData(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="md">
          <Card className={classes.card}>
            <CardContent classes={{ root: classes.content }}>
              <Typography variant="h2" color="primary">
                {props.text}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
}
export default NoData;
