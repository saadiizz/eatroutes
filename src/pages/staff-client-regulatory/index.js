import React, { useState, useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import { requirementsStyle } from "./style";
import { useParams } from "react-router-dom";
import {
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
  FETCH_SUB_OPTIONS,
  FETCH_SUB_OPTIONS_SUCCESS,
  FETCH_SUB_OPTIONS_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import { toast } from "react-toastify";

function StaffClientRegulatory() {
  const classes = requirementsStyle();
  const [state, dispatch] = useStore();

  const [regulatory, setRegulatory] = useState([]);
  const [subOptions, setSubOptions] = useState();

  const { id } = useParams();

  const getDeafultRegulatory = () => {
    dispatch({ type: FETCH_REGULATORY });
    API.get(`order/get-user-regulatory-selected-options/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_REGULATORY_SUCCESS,
            payload: response.data.data,
          });
          setRegulatory(
            response.data.data.filter((item) => item.is_selected === true)
          );
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
          setSubOptions(response.data.data);
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
  useEffect(() => {
    getDeafultRegulatory();
    getDeafultSubOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.requirementsWrapper}>
      <Header />
      <Loader
        loading={
          state?.regulatorySetting?.loadingRegulatory ||
          state?.regulatorySetting?.loadingSubOptions
        }
      />
      <div className="requirements-page-wrapper">
        <div className="container">
          <Typography variant="h1">Requirements</Typography>
          <div className="white-box requirements-box">
            {
              regulatory.length < 1 && <Typography variant="h6">No Regulatory settings found</Typography>
            }
            {regulatory &&
              regulatory.map((item) => (
                <div className="requirements-list-wrapper" key={item.id}>
                  <div className="left-column">
                    <Typography variant="h3">{item.option}</Typography>
                  </div>
                  <div className="right-column">
                    <List className="requirements-list">
                      {subOptions?.map((subOpt) => (
                        <ListItem key={subOpt.id}>
                          <FormGroup
                            aria-label="setting"
                            className="card-checkbox"
                          >
                            <FormControlLabel
                              value={subOpt.id}
                              control={
                                <Checkbox
                                  checked={item.sub_options.includes(subOpt.id)}
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
                            />
                          </FormGroup>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StaffClientRegulatory;
