import React, { useState } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import { requirementsStyle } from "./style";
import RequirementPopup from "./requirement-popup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import checkIcon from "@assets/images/checked.svg";
import {
  FETCH_REGULATORY,
  FETCH_REGULATORY_SUCCESS,
  FETCH_REGULATORY_FAILURE,
  SAVE_LOCAL_REGULATORY,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import { toast } from "react-toastify";

function Requirements() {
  const classes = requirementsStyle();
  const [open, setOpen] = React.useState(false);
  const [, setScroll] = React.useState("paper");
  const [state, dispatch] = useStore();
  const [requirement, setRequirement] = useState(
    state?.regulatorySetting?.localRegulatory
  );

  const navigate = useNavigate();

  const getDeafultRegulatory = () => {
    dispatch({ type: FETCH_REGULATORY });
    API.get("/order")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_REGULATORY_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: FETCH_REGULATORY_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_REGULATORY_FAILURE, payload: error });
      });
  };

  const getLocalSelected = (optionId, subOptionId) => {
    const option = state?.regulatorySetting?.localRegulatory?.filter(
      (data) => data.id === optionId
    );
    let value;
    option?.filter((data) => {
      if (data.option_id.includes(subOptionId)) {
        return (value = true);
      }
      return (value = false);
    });
    return value;
  };

  const handleSubmit = (scrollType) => () => {
    const newArray = requirement.map(({ item, ...data }) => data);
    const newData = { option: newArray };
    API.post("/order/save-user-regulatory-options", newData)
      .then((response) => {
        dispatch({
          type: SAVE_LOCAL_REGULATORY,
          payload: requirement,
        });
        getDeafultRegulatory();
        setOpen(true);
        setScroll(scrollType);
      })
      .catch((error) => {
        toast.error("sorry something went wrong!!!");
      });
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/brands");
  };

  const handleSubOptionsChange = (regId, subOptId) => {
    let arr = requirement.filter((r) => r.id === regId && r.option_id);
    arr = Array.from(arr[0].option_id);
    arr.includes(subOptId)
      ? (arr = arr.filter((r) => r !== subOptId))
      : arr.push(subOptId);

    arr.sort();
    const updatedData = requirement.map((r) =>
      r.id === regId ? { ...r, option_id: arr } : r
    );
    setRequirement(updatedData);
  };

  return (
    <div className={classes.requirementsWrapper}>
      <Header />
      <Loader loading={state?.regulatorySetting?.loadingRegulatory} />
      <div className="requirements-page-wrapper">
        <div className="container">
          <Typography variant="h1">Requirements</Typography>
          <div className="white-box requirements-box">
            {requirement &&
              requirement.map((item) => (
                <div className="requirements-list-wrapper" key={item.id}>
                  <div className="left-column">
                    <Typography variant="h3">{item.item.option}</Typography>
                  </div>
                  <div className="right-column">
                    <List className="requirements-list">
                      {state?.regulatorySetting?.defaultSubOptions?.map(
                        (subOpt) => (
                          <ListItem key={subOpt.id}>
                            <FormGroup
                              aria-label="setting"
                              className="card-checkbox"
                            >
                              <FormControlLabel
                                value={subOpt.id}
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      getLocalSelected(item.id, subOpt.id) ||
                                      false
                                    }
                                    icon={<span></span>}
                                    checkedIcon={
                                      <span className="active">
                                        <img src={checkIcon} alt="tick" />
                                      </span>
                                    }
                                  />
                                }
                                label={subOpt.name}
                                labelPlacement="end"
                                onChange={() =>
                                  handleSubOptionsChange(item.id, subOpt.id)
                                }
                              />
                            </FormGroup>
                          </ListItem>
                        )
                      )}
                    </List>
                  </div>
                </div>
              ))}
          </div>
          <div className="btn-wrapper">
            <Button
              color="primary"
              className="primary-btn"
              onClick={handleSubmit("body")}
            >
              Confirm Requirements
            </Button>
            <RequirementPopup open={open} handleClose={handleClose} />
            <Button
              color="primary"
              className="primary-border-btn"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Requirements;
