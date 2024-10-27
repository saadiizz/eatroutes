import React, { useState, useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import { brandsStyle } from "./style";
import { Link, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  Card,
  CardContent,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  ListItemText,
  Select,
  Checkbox,
  OutlinedInput,
  Button,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import NoImage from "@assets/images/no-image.jpg";
import filterGrayIcon from "@assets/images/filter-gray.svg";
import {
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  FETCH_BRAND_CATEGORIES,
  FETCH_BRAND_CATEGORIES_SUCCESS,
  FETCH_BRAND_CATEGORIES_FAILURE,
  DELETE_BRAND,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAILURE,
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import { useDebounce } from "@hooks/useDebounce";
import Loader from "@components/loader";
import CustomPagination from "@components/pagination";
import { getRole } from "@utils/commonFunctions";
import { userRole } from "@utils/constant";
import { toast } from "react-toastify";
import searchIcon from "@assets/images/magnifying-glass.svg";
import rejectIcon from "@assets/images/disable.png";
import deleteIcon from "@assets/images/delete.png";
import editIcon from "@assets/images/edit.png";
import eyeIcon from "@assets/images/red-eye.png";
import { ReactComponent as LockIcon } from "@assets/images/lock.svg";
import { ReactComponent as BanIcon } from "@assets/images/ban.svg";
import { ReactComponent as PendingIcon } from "@assets/images/pending.svg";
import BrandFilterIcon from "@assets/images/brandFilter.svg";
import ConfirmationPopup from "@components/confirmationPopup";
import { brandFilter, brandEnum } from "./brandConstant";

function Brands() {
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

  const classes = brandsStyle();
  const [categoryName, setCategoryName] = useState([]);
  const [filterBrand, setFilterBrand] = useState(-1);
  const [state, dispatch] = useStore();
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [confirmParams, setConfirmParams] = useState(null);
  const [data, setData] = useState([]);
  const [changeBrandText, setChangeBrandText] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  const [search, setSearch] = useState("");

  let navigate = useNavigate();

  const getBrands = () => {
    dispatch({ type: FETCH_BRANDS });
    API.get(`/brand/all-brands?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });
          setData(response.data.data);
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      });
  };

  const getCategories = () => {
    dispatch({ type: FETCH_BRAND_CATEGORIES });
    API.get("/category")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRAND_CATEGORIES_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: FETCH_BRAND_CATEGORIES_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRAND_CATEGORIES_FAILURE, payload: error });
      });
  };

  const getBrandsByCategory = (data) => {
    dispatch({ type: FETCH_BRANDS });
    API.post(`/brand/search-brands/category?page=${page}`, { categories: data })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload:
              typeof response.data.data === "string" ? [] : response.data.data,
          });
          setData(response.data.data);
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({ type: FETCH_BRANDS_FAILURE, payload: response.data.data });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_BRANDS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getBrands();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    value.length ? getBrandsByCategory(value) : getBrands();
  };
  const handleChangeBrand = (event) => {
    const {
      target: { value },
    } = event;

    setFilterBrand(value);
    let brandItem = brandFilter.find((ii) => ii.id == value);
    setChangeBrandText(brandItem.name);
  };

  const handleDeleteBrand = (id) => {
    dispatch({ type: DELETE_BRAND });
    API.delete(`vrm/delete-supplier-product/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: DELETE_BRAND_SUCCESS,
          });
          toast.success(response.data.successMessage);
          getBrands();
        } else {
          dispatch({ type: DELETE_BRAND_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: DELETE_BRAND_FAILURE });
      });
    closeConfirmPopup();
  };
  const handleStatusChange = (id, status) => {
    dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE });
    API.post(`/supplier/hide-supplier/${id}`, { status })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
          });
          toast.success(response.data.successMessage);
          getBrands();
        } else {
          dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
      });
    closeConfirmPopup();
  };

  const filterData = () => {
    const trimVal = search?.toLowerCase().trimStart();
    const searchData = state?.brands?.brandsData?.filter((data) => {
      if (data?.user_supplier?.name.toLowerCase().includes(trimVal)) {
        return true;
      }
      return false;
    });
    search ? setData(searchData) : setData(state?.brands?.brandsData);
  };

  useDebounce(() => filterData(), 500, search);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenConfirmPopup = (id, status, flag) => {
    setConfirmPopup(true);
    setConfirmParams({
      id,
      status,
      flag,
    });
  };

  const closeConfirmPopup = () => {
    setConfirmPopup(false);
    setConfirmParams(null);
  };

  let brandDataFilter = data?.filter((ii) =>
    filterBrand > -1
      ? filterBrand == 2 && [0, 2].includes(ii.client_brand_status)
        ? ii
        : ii.client_brand_status == filterBrand
        ? ii
        : ""
      : ii
  );
  const renderButtonText = (brand) => {
    switch (brand?.client_brand_status) {
      case brandEnum.availableRequest:
        return "Request Access";
      case brandEnum.availableRequest1:
        return "Request Access";
      case brandEnum.pendingrequest:
        return "Requested";

      default:
        return "Denied";
    }
  };
  const renderClassBool = (brand) => {
    switch (brand?.client_brand_status) {
      case brandEnum.availableRequest:
        return true;
      case brandEnum.pendingrequest:
        return false;

      default:
        return false;
    }
  };

  const requestToInactiveBrand = (brandId, status) => {
    API.post(`vrm/brand-active-inactive/${brandId}`, { status })
      .then((response) => {
        let cloneAllBrands = [...data];
        let findBrandInx = cloneAllBrands.findIndex((ii) => ii.id == brandId);
        if (findBrandInx > -1) {
          cloneAllBrands[findBrandInx].client_brand_status =
            brandEnum.pendingrequest;
          setData(cloneAllBrands);
        }
        toast.success(response?.data?.successMessage);
        closeConfirmPopup();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  const requestForBrand = (brandId) => {
    API.post(`brand/request-brand?brand_id=${brandId}`)
      .then((response) => {
        let cloneAllBrands = [...data];
        let findBrandInx = cloneAllBrands.findIndex((ii) => ii.id == brandId);
        if (findBrandInx > -1) {
          cloneAllBrands[findBrandInx].client_brand_status =
            brandEnum.pendingrequest;
          setData(cloneAllBrands);
        }
        toast.success(response?.data?.successMessage);
        closeConfirmPopup();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  const brandDetail = (brand) => {
    if (brand?.client_brand_status == brandEnum.approved) {
      navigate(`/brands/${brand.id}`);
    } else if (getRole() !== userRole.client) {
      navigate(`/brands/${brand.id}`);
    }
  };

  return (
    <div className={classes.brandsWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadingBrands ||
          state?.brands?.loadingCategories ||
          state?.quotes?.accessRequesting
        }
      />
      <div className="brand-list-wrapper">
        <div className="container">
          <div
            className={`filter-category-wrapper ${
              getRole() !== userRole.client ? "flexEnd" : ""
            } `}
          >
            {(getRole() === userRole.client ||
              getRole() === userRole.staff) && (
              <>
                {getRole() === userRole.client ? (
                  <FormControl
                    sx={{
                      m: 1,
                      // width: 219,
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
                              {changeBrandText
                                ? changeBrandText
                                : "Filter Brands"}
                            </label>
                          </span>
                        );
                      }}
                      MenuProps={MenuProps}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {brandFilter?.map((category) => (
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
                                  checkedIcon={
                                    <span className="active-check"></span>
                                  }
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
                ) : null}

                <FormControl
                  sx={{
                    m: 1,
                    width: 232,
                    "@media(max-width:500px)": { width: "auto" },
                  }}
                >
                  <Select
                    id="demo-multiple-checkbox"
                    multiple
                    displayEmpty
                    value={categoryName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => {
                      return (
                        <span className="filter-icon">
                          <img src={filterGrayIcon} alt="filter icon" />
                          <label htmlFor="Filter by Category">
                            Filter by Category
                          </label>
                        </span>
                      );
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {state?.brands?.categoriesData?.map((category) => (
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
                                checked={categoryName.indexOf(category.id) > -1}
                                icon={<span className="normal-check"></span>}
                                checkedIcon={
                                  <span className="active-check"></span>
                                }
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
              </>
            )}
            {getRole() === userRole.vrm && (
              <div className="btn-wrapper">
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
                <Button
                  color="primary"
                  className="primary-btn"
                  onClick={() => navigate("/add-new-brand")}
                >
                  Add New Brand
                </Button>
                <Button
                  color="primary"
                  className="primary-btn"
                  onClick={() => navigate("/pending-brands")}
                >
                  Pending Brands
                </Button>
              </div>
            )}
          </div>
          {brandDataFilter?.length === 0 && (
            <p className="no-data">No Brands Found</p>
          )}
          <List className="brand-list">
            {brandDataFilter?.length > 0 &&
              brandDataFilter?.map((brand) => (
                <ListItem className="brand-list-item" key={brand.id}>
                  <Card className="logo-wrapper white-box">
                    <CardContent>
                      <div
                        className="cardImgContainer"
                        onClick={() => {
                          brandDetail(brand);
                        }}
                      >
                        {/* <Link to={`/brands/${brand.id}`} title={brand.name}> */}
                        <img
                          src={
                            getRole() === userRole.client ||
                            getRole() === userRole.staff
                              ? brand?.user_supplier
                                ? brand?.user_supplier?.image
                                : brand.image
                                ? brand?.image
                                : NoImage
                              : brand?.user_supplier?.image
                              ? brand?.user_supplier?.image
                              : NoImage
                          }
                          alt={brand.name}
                        />
                        {/* </Link> */}
                        {getRole() === userRole.client &&
                        brand?.client_brand_status != brandEnum.approved ? (
                          <div className="overlay">
                            <div className="buttonContainer">
                              <IconButton color="primary">
                                {brand?.client_brand_status ==
                                brandEnum.availableRequest ? (
                                  <LockIcon />
                                ) : brandEnum.availableRequest1 ? (
                                  <LockIcon />
                                ) : brand?.client_brand_status ==
                                  brandEnum.pendingrequest ? (
                                  <PendingIcon />
                                ) : (
                                  <BanIcon />
                                )}
                              </IconButton>
                              <Button
                                color="primary"
                                className={`${
                                  renderClassBool(brand)
                                    ? "iconButton"
                                    : "disabled"
                                } `}
                                onClick={() => {
                                  if (renderClassBool(brand)) {
                                    handleOpenConfirmPopup(
                                      brand?.user_supplier?.id,
                                      "send the request",
                                      2
                                    );
                                  }
                                }}
                              >
                                {renderButtonText(brand)}
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      {getRole() === userRole.vrm && (
                        <div className="card-info-links">
                          <Link
                            to={`/edit-brand/${brand.id}`}
                            title="Edit Brand"
                          >
                            <img src={editIcon} alt="edit" />
                          </Link>
                          <Link
                            to=""
                            title="Delete Brand"
                            onClick={() =>
                              // handleDeleteBrand(brand.user_supplier.id)
                              handleOpenConfirmPopup(
                                brand?.user_supplier?.id,
                                "delete",
                                1
                              )
                            }
                          >
                            <img src={deleteIcon} alt="delete" />
                          </Link>
                          <Link
                            to={`/view-brand/${brand?.id}`}
                            title="View Brand"
                          >
                            <img src={eyeIcon} alt="view product" />
                          </Link>
                          <Link to="" title="Inactive Brand">
                            <img
                              src={rejectIcon}
                              alt="Inactive Brand"
                              onClick={() =>
                                // handleStatusChange(brand?.id, "inactive")
                                handleOpenConfirmPopup(
                                  brand?.user_supplier?.id,
                                  "inactive",
                                  2
                                )
                              }
                            />
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  {getRole() === userRole.vrm && (
                    <Typography variant="h3">
                      {brand?.user_supplier?.name}
                    </Typography>
                  )}
                </ListItem>
              ))}
          </List>
          {!!brandDataFilter?.length && (
            <CustomPagination
              count={count}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </div>
        <ConfirmationPopup
          open={openConfirmPopup}
          handleClose={closeConfirmPopup}
          handleConfirm={() => {
            confirmParams?.flag === 1
              ? handleDeleteBrand(confirmParams?.id)
              : confirmParams?.flag === 2
              ? requestToInactiveBrand(confirmParams?.id, confirmParams?.status)
              : handleStatusChange(confirmParams?.id, confirmParams?.status);
          }}
          confirmText={`Are you sure to ${confirmParams?.status} this brand?`}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Brands;
