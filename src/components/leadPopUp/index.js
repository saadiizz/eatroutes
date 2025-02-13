import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { TextField, MenuItem, Avatar, ListItem, Checkbox } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const drawerBleeding = 43;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function LeadPopUp(props) {
  const { window } = props;
  const { leadToCustomerData, selectedStaff } = props;
  const [open, setOpen] = React.useState(false);
  const [staffDetail, setStaffDetail] = React.useState(
    selectedStaff ? selectedStaff : -1
  );

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleItmVal = (acces) => {
    // setItemVal(acces);
    setStaffDetail({ id: acces?.id, first_name: acces?.first_name });
  };
  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={props.openDrawer === true ? true : false}
        onClose={(e) => {
          e.stopPropagation();
          props.handleCloseDrawer();
          props.handlestaffAccess(staffDetail);
        }}
        // onOpen={()=>props.handleCloseDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Button
            variant="contained"
            style={{ float: "right" }}
            onClick={(e) => {
              e.stopPropagation();
              props.handleCloseDrawer();
              props.handlestaffAccess(staffDetail);
            }}
          >
            Done
          </Button>
          {/* <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography> */}
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {/* <Skeleton variant="rectangular" height="100%" /> */}
          {leadToCustomerData?.map((item, index) => {
            return (
              <MenuItem
                key={index}
                value={item}
                onClick={() => handleItmVal(item)}
              >
                <ListItem
                  primary={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ margin: "5px 5px" }}>
                      <Avatar src={item?.avatar}></Avatar>
                      {/* <img src="img_avatar2.png" alt="Avatar" className="avatar"/> */}
                    </div>
                    <div className="avatarContainer">
                      <h5 className="h5">{item?.first_name}</h5>
                      <h6 className="h6">{item?.email}</h6>
                    </div>
                  </div>
                  <div>
                    <Checkbox
                      checked={staffDetail?.id === item?.id ? true : false}
                    />
                  </div>
                </ListItem>
              </MenuItem>
            );
          })}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

LeadPopUp.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default LeadPopUp;
