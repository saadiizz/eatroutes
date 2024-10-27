import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/header";
import Footer from "@components/footer";
import { brandsStyle } from "./style";
import {
  Typography,
  List,
  Card,
  CardContent,
  ListItem,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import NoImage from "@assets/images/no-image.jpg";
import rejectIcon from "@assets/images/red-cross.png";
import tickIcon from "@assets/images/marron-tick.png";
import eyeIcon from "@assets/images/red-eye.png";
import editIcon from "@assets/images/edit.png";
import searchIcon from "@assets/images/magnifying-glass.svg";
import {
  FETCH_PENDING_BRANDS,
  FETCH_PENDING_BRANDS_SUCCESS,
  FETCH_PENDING_BRANDS_FAILURE,
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import { useDebounce } from "@hooks/useDebounce";
import API from "@services/axios";
import Loader from "@components/loader";
import CustomPagination from "@components/pagination";
import { toast } from "react-toastify";
import ConfirmationPopup from "@components/confirmationPopup";

function PendingBrands() {
  const classes = brandsStyle();
  const [state, dispatch] = useStore();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [confirmParams, setConfirmParams] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const navigate = useNavigate();

  const getBrands = () => {
    dispatch({ type: FETCH_PENDING_BRANDS });
    API.get(`/vrm/pending-supplier-list?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PENDING_BRANDS_SUCCESS,
            payload: response.data.data,
          });
          setData(response.data.data);
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({
            type: FETCH_PENDING_BRANDS_FAILURE,
            payload: response.data.data,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PENDING_BRANDS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleApproveRejectRequest = (id, status) => {
    dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE });
    API.post(`/vrm/update-supplier-status/${id}`, { status })
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
    const searchData = state?.brands?.pendingBrandsData?.filter((data) => {
      if (data?.user_supplier?.name.toLowerCase().includes(trimVal)) {
        return true;
      }
      return false;
    });
    search ? setData(searchData) : setData(state?.brands?.pendingBrandsData);
  };

  useDebounce(() => filterData(), 500, search);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenConfirmPopup = (id, status) => {
    setConfirmPopup(true);
    setConfirmParams({
      id,
      status,
    });
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
    setConfirmParams(null);
  };

  return (
    <div className={classes.brandsWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadPendingBrands || state?.quotes?.accessRequesting
        }
      />
      <div className="brand-list-wrapper">
        <div className="container">
          <div className="brand-title-wrapper">
            <Typography variant="h1">Pending Brands</Typography>
            <div className="heading-right">
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
                className="primary-btn primary-border-btn"
                onClick={() => navigate("/brands")}
              >
                Back To Brands
              </Button>
            </div>
          </div>
          {data?.length === 0 && (
            <p className="no-data">No pending brands available</p>
          )}
          <List className="brand-list">
            {data?.length > 0 &&
              data.map((brand) => (
                <ListItem
                  className="brand-list-item"
                  key={brand?.user_supplier?.id}
                >
                  <Card className="logo-wrapper white-box">
                    <CardContent>
                      <Link to="" title={brand?.user_supplier?.name}>
                        <img
                          src={
                            brand?.user_supplier?.image
                              ? brand?.user_supplier?.image
                              : NoImage
                          }
                          alt={brand?.user_supplier?.name}
                        />
                      </Link>
                      <div className="card-info-links">
                        <Link to="" title="Approve Brand">
                          <img
                            src={tickIcon}
                            alt="tick"
                            onClick={() =>
                              handleOpenConfirmPopup(brand?.id, "active")
                            }
                          />
                        </Link>
                        <Link to="" title="Reject Brand">
                          <img
                            src={rejectIcon}
                            alt="reject"
                            onClick={() =>
                              handleOpenConfirmPopup(brand?.id, "reject")
                            }
                          />
                        </Link>
                        <Link
                          to={`/view-brand/${brand?.id}`}
                          title="View Brand"
                        >
                          <img src={eyeIcon} alt="view product" />
                        </Link>
                        <Link to={`/edit-brand/${brand.id}`} title="Edit Brand">
                          <img src={editIcon} alt="edit" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  <Typography variant="h3">
                    {brand?.user_supplier?.name}
                  </Typography>
                </ListItem>
              ))}
          </List>
          {!!data?.length && (
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
          handleConfirm={() =>
            handleApproveRejectRequest(confirmParams?.id, confirmParams?.status)
          }
          confirmText={`Are you sure to ${confirmParams?.status} request?`}
        />
      </div>
      <Footer />
    </div>
  );
}

export default PendingBrands;
