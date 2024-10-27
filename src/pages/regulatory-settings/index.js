import React, { useEffect, useState } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import { regulatorySettingsStyle } from "./style";
import { useNavigate } from "react-router-dom";
import OtherRegulatory from "./other-regulatory-popup";
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
  FETCH_SUB_OPTIONS,
  FETCH_SUB_OPTIONS_SUCCESS,
  FETCH_SUB_OPTIONS_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import SuccessPopup from "@components/success-popup";

function RegulatorySettings() {
  const classes = regulatorySettingsStyle();
  const [open, setOpen] = useState(false);
  const [, setScroll] = useState("paper");
  const [state, dispatch] = useStore();
  const [openSuccess, setOpenSucces] = useState(false);
  const [regulatory, setRegulatory] = useState(
    state?.regulatorySetting?.localRegulatory
  );
  const [otherRegulatory, setOtherRegulatory] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const getDeafultRegulatory = () => {
    dispatch({ type: FETCH_REGULATORY });
    API.get("/order")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_REGULATORY_SUCCESS,
            payload: response.data.data,
          });
          getDefaultSelected(response?.data?.data);
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

  const getDeafultSubOptions = () => {
    dispatch({ type: FETCH_SUB_OPTIONS });
    API.get("/subOptions")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_SUB_OPTIONS_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: FETCH_SUB_OPTIONS_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_SUB_OPTIONS_FAILURE, payload: error });
      });
  };

  const getDefaultSelected = (array) => {
    let val = [];
    array.filter((data) => {
      if (data.is_selected === true) {
        val.push({
          id: data.id,
          option_id: data.sub_options,
          item: data,
        });
      }
      return {};
    });
    setRegulatory(val);
  };

  useEffect(() => {
    getDeafultRegulatory();
    getDeafultSubOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    setError("");
  };
  const handleClose = () => {
    setOpen(false);
    setOtherRegulatory("");
    setError("");
  };

  const handleChangeOtherRegulatory = (e) => {
    setOtherRegulatory(e.target.value);
  };

  const handleAddOtherRegulatory = (e) => {
    if (otherRegulatory) {
      API.post("/order/create-option", { option: otherRegulatory })
        .then((response) => {
          if (response.data.statusCode === 200) {
            setOpenSucces(true);
            getDeafultRegulatory();
          } else {
            toast.error(response.data.errorMessage);
          }
        })
        .catch((error) => {
          toast.error("sorry something went wrong!!!");
        });
      setOpen(false);
      setOtherRegulatory("");
    } else {
      setError("Please add a proper option");
    }
  };

  const handleRegulatory = (item) => {
    let values = { id: item.id, option_id: [], item: item };
    let newArray = [...regulatory, values];
    if (regulatory?.filter((data) => data.id === item.id).length > 0) {
      newArray = newArray.filter((r) => r.id !== item.id);
    }

    setRegulatory(newArray);
  };

  const handleSubmit = () => {
    if (regulatory.length) {
      dispatch({
        type: SAVE_LOCAL_REGULATORY,
        payload: regulatory,
      });
      navigate("/requirements");
    } else {
      toast.error("please select at least ONE regulatory");
    }
  };

  return (
    <div className={classes.regulatorySettingsWrapper}>
      <Header />
      <Loader
        loading={
          state?.regulatorySetting?.loadingRegulatory ||
          state?.regulatorySetting?.loadingSubOptions
        }
      />
      <div className="regulatory-page-wrapper">
        <div className="container">
          <Typography variant="h1">Regulatory settings</Typography>
          <div className="regulatory-list">
            <List>
              {state?.regulatorySetting?.defaultRegulatory?.map((item) => (
                <ListItem key={item?.id}>
                  <FormGroup aria-label="setting" className="card-checkbox">
                    <FormControlLabel
                      value={item?.id}
                      control={
                        <Checkbox
                          defaultChecked={item?.is_selected}
                          icon={<span></span>}
                          checkedIcon={
                            <span className="active">
                              <img src={checkIcon} alt="tick" />
                            </span>
                          }
                        />
                      }
                      label={item?.option}
                      labelPlacement="end"
                      onChange={(e) => handleRegulatory(item)}
                    />
                  </FormGroup>
                </ListItem>
              ))}
              <ListItem>
                <FormGroup aria-label="setting" className="card-checkbox">
                  <FormControlLabel
                    checked={false}
                    value="Other"
                    control={
                      <Checkbox
                        onClick={handleClickOpen("body")}
                        icon={<span></span>}
                        checkedIcon={
                          <span className="active">
                            <img src={checkIcon} alt="tick" />
                          </span>
                        }
                      />
                    }
                    label="Other"
                    labelPlacement="end"
                  />
                </FormGroup>
              </ListItem>
            </List>
            <OtherRegulatory
              open={open}
              handleClose={() => handleClose(false)}
              otherRegulatory={otherRegulatory}
              error={error}
              handleChange={handleChangeOtherRegulatory}
              handleSubmit={handleAddOtherRegulatory}
            />
            <SuccessPopup
              open={openSuccess}
              text={`${otherRegulatory} Regulatory is successfully added.`}
              handleClose={() => setOpenSucces(false)}
            />
            <div className="btn-wrap">
              <Button
                color="primary"
                className="primary-btn"
                onClick={handleSubmit}
              >
                CONFIRM
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegulatorySettings;
