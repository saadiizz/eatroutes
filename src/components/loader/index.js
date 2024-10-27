import { Backdrop, CircularProgress } from "@mui/material";
import { loaderStyle } from "./style";

function Loader(props) {
  const classes = loaderStyle();
  return (
    <Backdrop open={props.loading} className={classes.root}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
export default Loader;
