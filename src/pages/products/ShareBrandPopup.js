import React, { useState, useEffect } from "react";
import { customerListStyle } from "./style";
import { commonStyle } from "@utils/commonStyle";
import {
  Button,
  Typography,
  Link,
  Dialog,
  Avatar,
  DialogActions,
  Checkbox,
  TextField,
} from "@mui/material";
import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  SELECT_ALL_SHARE_BRANDS,
} from "@utils/actionType";
import { useStore } from "@store/store";
import cx from "classnames";
import crossIcon from "@assets/images/cross-mark-white.svg";
import { handleColorClass } from "@utils/commonFunctions";
import CustomPagination from "@components/pagination";
import API from "@services/axios";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import searchIcon from "@assets/images/magnifying-glass.svg";
import { useDebounce } from "@hooks/useDebounce";
import SuccessPopup from "@components/success-popup";

const ShareBrandPopup = (props) => {
  const classes = customerListStyle();
  const commonstyle = commonStyle();
  const [state, dispatch] = useStore();
  const [scroll] = useState("body");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [count, setCount] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  const [data, setData] = useState(null);
  const [clientIds, setClientIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectAll(state?.quote?.selectAllShareBrands || false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterClient = () => {
    if (search.trimStart() === "") {
      getCustomers();
    } else {
      handleFilterStatus();
    }
  };

  useDebounce(() => filterClient(), 1000, search);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClickCheckBox = (id) => {
    if (clientIds.includes(id)) {
      const arr = clientIds.filter((ele) => ele !== id);
      setClientIds(arr);
    } else {
      setClientIds([...clientIds, id]);
    }
  };

  const handleSelectAllBox = (value) => {
    setSelectAll(value);
    if (value) {
      const arr = data ? data.map((ele) => ele.id) : [];
      setClientIds(arr);
    } else setClientIds([]);
  };

  useEffect(() => {
    const arr = data ? data.map((ele) => ele.id) : [];
    if (data && arr.every((r) => clientIds.includes(r))) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientIds]);

  const getCustomers = () => {
    dispatch({ type: FETCH_CUSTOMERS });
    API.get(`/client?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_CUSTOMERS_SUCCESS,
            payload: response.data.data.data,
          });
          setData(response.data.data);
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({
            type: FETCH_CUSTOMERS_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
      });
  };

  const handleFilterStatus = () => {
    dispatch({ type: FETCH_CUSTOMERS });
    API.post(`client/filter-client?page=${page}`, {
      client_name: search,
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_CUSTOMERS_SUCCESS,
            payload: response.data.data.data,
          });
          setData(response.data.data.data);
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({ type: FETCH_CUSTOMERS_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE });
        toast.error("Some thing went wrong");
      });
  };

  useEffect(() => {
    search === "" ? getCustomers() : handleFilterStatus();
    dispatch({
      type: SELECT_ALL_SHARE_BRANDS,
      payload: selectAll,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleAssignBrand = async () => {
    await API.post(`brand/assign-brand-to-client/${props?.brandId}`, {
      ...(selectAll === false ? { client_ids: clientIds } : { client_ids: [] }),
      selectAll_flag: `${selectAll}`,
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
          setOpenSuccess(true);
          getCustomers();
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        toast.error("Some thing went wrong");
      });
    close();
  };

  const close = () => {
    setPage(1);
    setClientIds([]);
    props.handleClose();
  };

  return (
    <>
      <Loader
        loading={
          state?.customers?.loadingCustomer || state?.customers?.editingCustomer
        }
      />
      <Dialog
        open={props.open}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={cx(commonstyle.customDialogWrapper, classes.smallPopup)}
      >
        <div className={classes.editcustomerWrapper}>
          <div className="popup-header">
            <Typography variant="h4">
              Share brand to customers
              <Link className="cross-btn" onClick={() => close()}>
                <img src={crossIcon} alt="Success Icon" />
              </Link>
            </Typography>
          </div>
          <div className="popup-content">
            <div className={classes.customerSearchWrapper}>
              <div className={classes.formWrapper}>
                <div className="form-group">
                  <TextField
                    id="search"
                    type="search"
                    variant="outlined"
                    placeholder="SEARCH"
                    value={search}
                    onChange={handleSearch}
                    disabled={selectAll}
                  />
                  <img src={searchIcon} alt="search icon" />
                </div>
              </div>
              <div className="select-all">
                <div>
                  <p>Select All </p>
                  <Checkbox
                    checked={selectAll}
                    onChange={() => handleSelectAllBox(!selectAll)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.customerListBox}>
              {data?.length ? (
                data?.map((customer, index) => (
                  <div
                    className={`customer-list-row ${handleColorClass(
                      index + 1
                    )}`}
                    key={customer.id}
                  >
                    <div
                      className="left-column"
                      // onClick={() => handleCustomer(customer)}
                    >
                      {customer?.avatar ? (
                        <Avatar
                          className="short-name"
                          alt={customer?.avatar}
                          src={customer?.avatar}
                        />
                      ) : (
                        <Avatar className="short-name">
                          {customer.first_name[0][0]}
                          {customer.last_name[0][0]}
                        </Avatar>
                      )}
                      <div className="customer-detail">
                        <span className="customer-name">
                          {customer.first_name} {customer.last_name}
                        </span>
                        <Link to="" title="Mail us">
                          {customer.email}
                        </Link>
                        {/* <a
                          href={`mailto:${customer?.email}`}
                          title="Chat us"
                          target="_new"
                        >
                          {customer?.email}
                        </a> */}
                      </div>
                    </div>
                    <div className="right-column">
                      {/* {customer.suppliers
                        .map((o) => o.id)
                        .includes(+props.brandId) ? (
                        <Checkbox checked={true} disabled={true} />
                      ) : ( */}
                        <Checkbox
                          checked={clientIds.includes(customer?.id)}
                          onChange={() => handleClickCheckBox(customer?.id)}
                          inputProps={{ "aria-label": "controlled" }}
                          disabled={selectAll}
                        />
                      {/* )} */}
                    </div>
                  </div>
                ))
              ) : (
                <p>No customer found</p>
              )}

              {!!data?.length && (
                <CustomPagination
                  count={count}
                  page={page}
                  disabled={selectAll}
                  onChange={handleChangePage}
                />
              )}
            </div>
            <DialogActions>
              <Button
                className="primary-btn"
                onClick={() => handleAssignBrand()}
                disabled={!clientIds.length}
              >
                Share
              </Button>
            </DialogActions>
          </div>
        </div>
      </Dialog>
      <SuccessPopup
        open={openSuccess}
        text="Brand has been successfully shared with clients"
        handleClose={() => setOpenSuccess(false)}
      />
    </>
  );
};

export default ShareBrandPopup;
