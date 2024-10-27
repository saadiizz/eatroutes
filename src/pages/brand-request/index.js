import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  Avatar,
  List,
  ListItem,
  FormControl,
  OutlinedInput,
  Select,
  FormControlLabel,
  ListItemText,
  MenuItem,
  FormGroup,
  Checkbox,
} from "@mui/material";
import BrandFilterIcon from "@assets/images/brandFilter.svg";
import accept from "@assets/images/accept.svg";
import redcross from "@assets/images/red-cross.png";
import searchIcon from "@assets/images/magnifying-glass.svg";
import Header from "@components/header";
import Footer from "@components/footer";
import API from "@services/axios";
import { useStore } from "@store/store";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
} from "@utils/actionType";
// import ViewCustomer from "./view-customer-popup";
import { brandRequestStyle } from "./style";
import deleteIcon from "@assets/images/delete.png";
import Loader from "@components/loader";
import { handleColorClass, handleBrandReqColor } from "@utils/commonFunctions";
import CustomPagination from "@components/pagination";
import { toast, useToast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";
import ConfirmationPopup from "@components/confirmationPopup";
import { brandRequest, brandRequestFilter } from "./constant";
import { BrandContext } from "@context/brand";

function BrandRequest() {
  const requestEnum = {
    accept: "accept",
    reject: "reject",
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const classes = brandRequestStyle();
  let navigate = useNavigate();
  const { brandRequestList, setBrandReq } = useContext(BrandContext);
  const [state, dispatch] = useStore();
  const [customer, setCustomer] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [requestDetail, setRequestDeatil] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [filterBrand, setFilterBrand] = useState(brandRequestFilter[3].id);
  const [changeBrandText, setChangeBrandText] = useState("");
  const [limit, setlimit] = useState(200);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const handleChangePage = (event, newPage) => {
    // setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getbrandReqest = () => {
    dispatch({ type: FETCH_CUSTOMERS });

    API.get(`/brand/requests?limit=${limit}&client_brand_status=${filterBrand}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_CUSTOMERS_SUCCESS,
            payload: response.data.data,
          });
          setData(response.data.data);
          //   setCount(response?.data?.totalPageCount);
          if (state?.customers?.customerId) {
            let cust = response.data.data.filter(
              (cu) => cu.id === +state?.customers?.customerId
            );
            handleCustomer(...cust);
          }
        } else {
          dispatch({
            type: FETCH_CUSTOMERS_FAILURE,
            payload: response.data.data,
          });
          setRefresh(true);
          setTimeout(() => {
            setRefresh(false);
          }, 100);
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getbrandReqest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBrand]);

  const handleCustomer = (cust) => {
    setCustomer(cust);
    setOpenView(true);
  };
  const handleClose = () => setConfirmPopup(!openConfirmPopup);

  const hanleAcceptRequest = (brandId, ClientId) => {
    dispatch({ type: FETCH_BRANDS });
    API.post(
      `/brand/requests/approve?brand_id=${brandId}&client_id=${ClientId}`
    )
      .then((response) => {
        if (response.data.statusCode === 200) {
          let cloneAllBrand = [...data];
          let brandIndx = cloneAllBrand.findIndex((ii) => ii.id == brandId);
          handleGlolbalState(brandId);
          if (brandIndx > -1) {
            if (filterBrand == 0) {
              cloneAllBrand[brandIndx].client_brand_status =
                brandRequest.approved;
            } else {
              cloneAllBrand.splice(brandIndx, 1);
            }
            setData(cloneAllBrand);
          }

          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload:
              typeof response.data.data === "string" ? [] : response.data.data,
          });
          toast.success("Request Rejected");
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      })
      .finally(() => handleClose());
  };
  const handleGlolbalState = (brandId) => {
    //for global state mangagement
    let globalBrandReq = [...brandRequestList];
    let globBrandIndx = globalBrandReq.findIndex((ii) => ii.id == brandId);
    if (globBrandIndx > -1) {
      globalBrandReq.splice(globBrandIndx, 1);
      setBrandReq(globalBrandReq);
    }
  };
  const handleRejectRequest = (brandId, ClientId) => {
    dispatch({ type: FETCH_BRANDS });
    API.post(`/brand/requests/reject?brand_id=${brandId}&client_id=${ClientId}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          let cloneAllBrand = [...data];
          let brandIndx = cloneAllBrand.findIndex((ii) => ii.id == brandId);
          handleGlolbalState(brandId);
          if (brandIndx > -1) {
            if (filterBrand == 0) {
              cloneAllBrand[brandIndx].client_brand_status =
                brandRequest.rejected;
            } else {
              cloneAllBrand.splice(brandIndx, 1);
            }
            setData(cloneAllBrand);
          }
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload:
              typeof response.data.data === "string" ? [] : response.data.data,
          });

          toast.success("Request Accepted Successfully");
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      })
      .finally(() => handleClose());
  };
  const handleChangeBrand = (event) => {
    const {
      target: { value },
    } = event;

    setFilterBrand(value);
    let brandItem = brandRequestFilter.find((ii) => ii.id == value);
    setChangeBrandText(brandItem.id == 0 ? "Filter Brands" : brandItem.name);
  };
  const searchByName = () =>
    data?.filter((item) =>
      (item?.name).toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

  return (
    <div className={classes.customerListWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadingBrands ||
          state?.customers?.loadingCustomer ||
          state?.customers?.editingCustomer ||
          state?.customers?.deletingCustomer
        }
      />
      <div className="customer-list-page-wrapper">
        <div className="container heightContainer">
          <div className="customer-list-heading">
            <FormControl
              sx={{
                m: 1,
                width: 219,
                "@media(max-width:500px)": {
                  width: "auto",
                },
              }}
            >
              <Select
                id="demo-multiple-checkbox"
                displayEmpty
                value={filterBrand}
                onChange={handleChangeBrand}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  return (
                    <span className="filter-icon">
                      <img src={BrandFilterIcon} alt="filter icon" />
                      <label htmlFor="Filter Brands">
                        {changeBrandText ? changeBrandText : "Filter Brands"}
                      </label>
                    </span>
                  );
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {brandRequestFilter?.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    className="category-checkbox"
                  >
                    <FormGroup
                      aria-label="position"
                      className="custom-checkbox"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={category.id == filterBrand}
                            icon={<span className="normal-check"></span>}
                            checkedIcon={<span className="active-check"></span>}
                          />
                        }
                        label=""
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="customer-search-wrapper">
              <div className="form-wrapper">
                <div className="form-group">
                  <TextField
                    id="search"
                    type="search"
                    variant="outlined"
                    placeholder="SEARCH"
                    value={search}
                    onChange={handleSearch}
                  />
                  <img src={searchIcon} alt="search icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="white-box customer-list-box">
            {searchByName() && searchByName().length ? (
              searchByName()?.map((brand, index) => (
                <div
                  className={`customer-list-row ${handleColorClass(index + 1)}`}
                  key={`brand-request-${index}`}
                >
                  <div
                    className="left-column"
                    onClick={() => handleCustomer(brand)}
                  >
                    {brand?.image ? (
                      <Avatar
                        className="short-name"
                        alt={brand?.image}
                        src={brand?.image}
                      />
                    ) : (
                      <Avatar
                        className="short-name"
                        alt={brand?.image}
                        src={brand?.image}
                      >
                        {/* {brand.first_name[0][0]}
                        {brand.last_name[0][0]} */}
                      </Avatar>
                    )}
                    <div className="customer-detail">
                      <span className="customer-name">{brand.name || ""}</span>
                      <Link
                        to=""
                        title="Mail us"
                        className={` ${handleBrandReqColor(2)}`}
                      >
                        Requested by: {brand.email}
                      </Link>
                    </div>
                  </div>
                  <div className="right-column">
                    <span
                      className={`brand-status ${handleBrandReqColor(
                        brand?.client_brand_status
                      )}`}
                    >
                      {brand?.client_brand_status == brandRequest.approved
                        ? "Approved"
                        : brand?.client_brand_status == brandRequest.rejected
                        ? "Rejected"
                        : "Pending"}
                    </span>

                    {brand?.client_brand_status == brandRequest.pending ? (
                      <List className="contact-list-wrapper">
                        <ListItem>
                          <Button
                            color="primary"
                            className="primary-btn buttonWidth"
                            onClick={() => {
                              setRequestDeatil(brand);
                              setConfirmPopup(true);
                              setRequestType(requestEnum.accept);
                            }}
                          >
                            Allow
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            color="primary"
                            className="primary-btn buttonWidth"
                            onClick={() => {
                              setRequestDeatil(brand);
                              setConfirmPopup(true);
                              setRequestType(requestEnum.reject);
                            }}
                          >
                            Deny
                          </Button>
                        </ListItem>
                      </List>
                    ) : (
                      <List className="contact-list-wrapper">
                        {brandRequest.approved ===
                        brand?.client_brand_status ? (
                          <ListItem>
                            <Button
                              color="primary"
                              className="primary-btn buttonWidth"
                              onClick={() => {
                                setRequestDeatil(brand);
                                setConfirmPopup(true);
                                setRequestType(requestEnum.reject);
                              }}
                            >
                              Deny
                            </Button>
                          </ListItem>
                        ) : brandRequest.rejected ===
                          brand?.client_brand_status ? (
                          <ListItem>
                            <Button
                              color="primary"
                              className="primary-btn buttonWidth"
                              onClick={() => {
                                setRequestDeatil(brand);
                                setConfirmPopup(true);
                                setRequestType(requestEnum.accept);
                              }}
                            >
                              Allow
                            </Button>
                          </ListItem>
                        ) : (
                          ""
                        )}
                      </List>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No Request found</p>
            )}

            {/* <ViewCustomer
              customer={customer && customer}
              handleInvite={handleInvite}
              handleEditCustomerOpen={handleEditCustomerOpen("body")}
              handleEditCustomerClose={handleEditCustomerClose}
              openEdit={openEdit}
              openView={openView}
              handleViewCustomerClose={() => handleViewCustomerClose()}
              formik={formik}
              brands={state?.brands?.brandsData}
              selectedBrands={selectedBrands}
              openBrandAccess={openBrandAccess}
              handleBrandAccessOpen={handleBrandAccessOpen}
              handleBrandAccessClose={handleBrandAccessClose}
              handleBrandAccessChange={handleBrandAccessChange}
              handleBrandAccessSubmit={handleBrandAccessSubmit}
              categories={state?.brands?.categoriesData}
              categoryName={categoryName}
              handleCategoryChange={handleCategoryChange}
            /> */}
          </div>
        </div>
        {!!data?.length && (
          <CustomPagination
            count={count}
            page={page}
            onChange={handleChangePage}
          />
        )}
        <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={handleClose}
          handleConfirm={() => {
            if (requestEnum.accept == requestType) {
              hanleAcceptRequest(
                requestDetail?.id,
                requestDetail?.client_brand_user_id
              );
            } else if (requestEnum.reject == requestType) {
              handleRejectRequest(
                requestDetail?.id,
                requestDetail?.client_brand_user_id
              );
            }
          }}
          confirmText={`Are you sure to ${
            requestEnum.accept == requestType ? "approve" : "deny"
          } the request?`}
        />
      </div>
      <Footer />
    </div>
  );
}

export default BrandRequest;
