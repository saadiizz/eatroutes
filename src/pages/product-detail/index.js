import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "@components/header";
import Footer from "@components/footer";
import { productdetailStyle } from "./style";
import ProductQuantity from "./quantity-popup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, {
  Pagination,
  EffectFade,
  FreeMode,
  Navigation,
  Thumbs,
  Autoplay,
} from "swiper";
import { Typography, List, ListItem, Button, Breadcrumbs } from "@mui/material";
import leftArrow from "@assets/images/down-arrow-red.svg";
import leftwhiteArrow from "@assets/images/down-arrow-white.svg";
import {
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  CREATE_QUOTES,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
  FETCH_PRODUCT_VARIATIONS,
  FETCH_PRODUCT_VARIATIONS_SUCCESS,
  FETCH_PRODUCT_VARIATIONS_FAILURE,
} from "@utils/actionType";
import { setImageArray, setToLocalStore } from "@utils/commonFunctions";
import { useStore } from "@store/store";
import API from "@services/axios";
import Loader from "@components/loader";
import { toast } from "react-toastify";
import { getFromLocalStore, getRole } from "@utils/commonFunctions";
// import ProductGalleryEnlarg from "./productGalleryEnlarge";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import cx from "classnames";

// install Swiper modules
SwiperCore.use([
  Pagination,
  EffectFade,
  FreeMode,
  Navigation,
  Thumbs,
  Autoplay,
]);

function ProductDetail() {
  const classes = productdetailStyle();
  const [state, dispatch] = useStore();
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [open, setOpen] = useState(false);
  const [, setScroll] = useState("paper");
  const [product, setProduct] = useState([]);
  const [tab, setTab] = useState(0);
  const [currentFlavour, setCurrentFlavour] = useState([]);
  const [flavour, setFlavour] = useState([]);
  const [brand, setBrand] = useState();
  const [imageList, setImageList] = useState([]);
  const [openConfirmPopup, setConfirmPopup] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openNutritionPopup, setOpenNutritionPopup] = useState(false);
  const [msrp, setMsrp] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const { productDetailsData } = state?.products;

  const getNutritionFactsType = (data) => {
    let type = data?.split("/").reverse()[0].split(".").reverse()[0];
    return type;
  };

  useEffect(() => {
    let data = state?.quotes?.quotesData?.length
      ? state?.quotes?.quotesData
      : getFromLocalStore("client-quotes", true)
      ? getFromLocalStore("client-quotes", true)
      : [];
    dispatch({
      type: CREATE_QUOTES,
      payload: data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { quotesData } = state?.quotes;

  const getProductDetails = () => {
    dispatch({ type: FETCH_PRODUCT_DETAILS });
    API.get(`/product/get-product-detail/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCT_DETAILS_SUCCESS,
            payload: response.data.data,
          });
          getBrands(response.data.data.brand_id);
        } else {
          dispatch({
            type: FETCH_PRODUCT_DETAILS_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCT_DETAILS_FAILURE, payload: error });
      });
  };
  const getProductVariations = () => {
    dispatch({ type: FETCH_PRODUCT_VARIATIONS });
    API.get("product_variation/variations")
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_PRODUCT_VARIATIONS_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: FETCH_PRODUCT_VARIATIONS_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRODUCT_VARIATIONS_FAILURE, payload: error });
      });
  };
  const getBrands = (id) => {
    dispatch({ type: FETCH_BRANDS });
    API.get(`/brand/${id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_BRANDS_SUCCESS,
            payload: response.data.data,
          });
          setBrand(response.data.data);
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
    getProductDetails();
    getProductVariations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProduct = () => {
    const data = quotesData?.length
      ? quotesData?.find((d) => d.brand_id === productDetailsData?.brand_id)
      : {};

    data === undefined
      ? setProduct([])
      : setProduct(data?.products ? data?.products : []);
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, [productDetailsData, quotesData]);

  const getInitialState = () => {
    let allChildVariation = [];
    productDetailsData?.products_variations?.map((item) =>
      item?.variations_options?.map((data) =>
        allChildVariation.push({
          id: data.product_variation_id,
          flavour: item.variation_name,
          size: data.name,
        })
      )
    );

    let value = [];

    allChildVariation.map((cv) => {
      const data =
        product.length && product.find((p) => p.product_variation_id === cv.id);
      if (data) {
        return value.push(data);
      }
      return value.push({
        quantity: 0,
        product_variation_id: cv.id,
        product_id: productDetailsData?.id,
        status: "In Progress",
        size: cv.size,
        flavour: cv.flavour,
      });
    });

    setFlavour(value);
    setCurrentFlavour(value);
  };
  useEffect(() => {
    getInitialState();
    // eslint-disable-next-line
  }, [productDetailsData?.products_variations, product]);

  const handleClickOpen = (scrollType, data) => () => {
    setOpen(true);
    setScroll(scrollType);
    setTab(data);
  };
  const handleClose = () => {
    setOpen(false);
    setFlavour(currentFlavour);
  };

  const handleIncrementFlavour = (id, value) => {
    let data = flavour.map((f) =>
      f.product_variation_id === id ? { ...f, quantity: value + 1 } : f
    );
    setFlavour(data);
  };
  const handleDecrementFlavour = (id, value) => {
    let data = flavour.map((f) =>
      f.product_variation_id === id
        ? { ...f, quantity: value >= 1 ? value - 1 : value }
        : f
    );
    value >= 1 && setFlavour(data);
  };
  const handleQuantityChange = (e, id, val) => {
    let value = parseInt(e.target.value);
    let data = flavour.map((f) =>
      f.product_variation_id === id
        ? { ...f, quantity: isNaN(value) ? "" : value <= 99999 ? value : val }
        : f
    );
    setFlavour(data);
  };
  const handleAddToQuote = () => {
    handleClose();
    setCurrentFlavour(flavour);
    setFlavour(flavour);

    let newArr = Array.from(product);
    flavour.forEach((element) => {
      const itemIndex = newArr.findIndex(
        (o) => o.product_variation_id === element.product_variation_id
      );
      if (itemIndex > -1) {
        newArr[itemIndex] = element;
      } else {
        newArr.push(element);
      }
    });

    let arr = newArr?.filter((f) => f.quantity > 0);

    const abc =
      quotesData?.length &&
      quotesData?.find((d) => d.brand_id === productDetailsData?.brand_id);

    let finalData = abc
      ? { ...abc, products: arr }
      : {
          brand_id: productDetailsData?.brand_id,
          products: arr,
          brandDetails: brand,
        };

    let finalData2 =
      Object.keys(finalData).length > 0
        ? state?.quotes?.quotesData.length
          ? state?.quotes?.quotesData
              ?.filter((qd) => qd.brand_id !== finalData.brand_id)
              .concat(finalData)
              .filter((data) => data.products.length > 0)
          : [finalData]
        : [];
    dispatch({
      type: CREATE_QUOTES,
      payload: finalData2,
    });
    setToLocalStore("client-quotes", finalData2, true);
  };

  const handleTabChange = (data) => {
    setTab(data);
  };

  const getTotalQuantity = (data) => {
    let cv = [];
    productDetailsData?.products_variations[data]?.variations_options.map(
      (data) => cv.push(data.product_variation_id)
    );

    let sum = 0;
    currentFlavour?.map((f) =>
      cv?.includes(f.product_variation_id) ? (sum = sum + f.quantity) : sum
    );
    sum = sum === 0 ? "00" : sum;

    return sum;
  };

  const handleQuoteRequest = () => {
    quotesData?.length > 0
      ? !!quotesData?.find((data) =>
          data.products.find(
            (item) => item.product_id === productDetailsData?.id
          )
        )
        ? navigate("/quote-request")
        : setOpen(true)
      : setOpen(true);
  };

  const handleMsrp = () => {
    setMsrp(0);
    let arr = [];
    productDetailsData?.products_variations?.map((item) =>
       
     item?.variations_options?.map(
        (data) => (
         data?.msrp && arr.push(data?.msrp.replace(/[^0-9\.-]+/g, '')))
      )
    );

    arr.length && setMsrp(Math.min(...arr));
  };

  useEffect(() => {
    let data =
      productDetailsData &&
      setImageArray(
        productDetailsData?.image,
        productDetailsData?.products_gallery
      );
    setImageList(data);
    handleMsrp();
    // eslint-disable-next-line
  }, [productDetailsData]);

  const handleOpenConfirmPopup = () => {
    setConfirmPopup(true);
  };
  const closeConfirmPopup = () => {
    setConfirmPopup(false);
  };
  const closeNutritionPopup = () => {
    setOpenNutritionPopup(false);
  };

  return (
    <div className={classes.productdetailWrapper}>
      <Header />
      <Loader
        loading={
          state?.brands?.loadingBrands ||
          state?.products?.loadingProductVariations ||
          state?.products?.loadingProductDetails
        }
      />
      <div className="product-detail-page">
        <div className="container">
          <div className="breadcrumb-wrapper">
            <Button className="primary-border-btn" onClick={() => navigate(-1)}>
              <em>
                <img className="normal" src={leftArrow} alt="Back" />
                <img className="hover" src={leftwhiteArrow} alt="Back" />
              </em>
              Back
            </Button>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/" title="Brands">
                Brands
              </Link>
              <Link to={`/brands/${brand?.id}`} title="Brand">
                {brand?.name}
              </Link>
              <Typography>{productDetailsData?.name}</Typography>
            </Breadcrumbs>
          </div>
          <div className="product-detail-wrapper three-column-block">
            <div className="product-slider-block">
              <div className="product-slider-inner">
                <Swiper
                  loop={true}
                  effect={"fade"}
                  // thumbs={{ swiper: thumbsSwiper }}
                  className="product-main"
                  onClick={handleOpenConfirmPopup}
                  pagination={{
                    dynamicBullets: true,
                    clickable: true,
                  }}
                  slidesPerView={1}
                  modules={[Pagination, Autoplay, Navigation]}
                  autoplay={
                    imageList?.length > 1
                      ? {
                          delay: 2500,
                          disableOnInteraction: false,
                        }
                      : false
                  }
                >
                  {/* <SwiperSlide>
                    <div className="white-box">
                      <img
                        src={
                          productDetailsData?.image ||
                          productDetailsData?.products_gallery
                            ? productDetailsData?.image ||
                              productDetailsData?.products_gallery
                            : NoImage
                        }
                        alt={`${productDetailsData?.name}`}
                      />
                    </div>
                  </SwiperSlide> */}
                  {imageList?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="white-box">
                        <img src={img} alt={img} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {imageList?.length > 1 && (
                  <Button
                    style={{ marginLeft: "1.5rem" }}
                    color="primary"
                    className="primary-btn"
                    onClick={() => handleOpenConfirmPopup()}
                  >
                    View Gallery
                  </Button>
                )}
                {/* <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={18}
                  slidesPerView={2}
                  className="product-thumb"
                  navigation={true}
                  modules={[Navigation]}
                >
                  {" "}
                  {imageList?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="white-box">
                        <img src={img} alt={img} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper> */}
              </div>
            </div>
            <div className="product-content">
              <Typography variant="h1">{productDetailsData?.name}</Typography>
              <Typography variant="h3" className="product-headline">
                {productDetailsData?.product_heading}
              </Typography>
              <div
                className="content-description"
                dangerouslySetInnerHTML={{
                  __html: productDetailsData?.description,
                }}
              />
              <div className="box-wrapper">
                {productDetailsData?.product_shelf_life ? (
                  <div className="box">
                    <Typography variant="h6">SHELF LIFE</Typography>

                    <Typography variant="h1">
                      {productDetailsData?.product_shelf_life}
                    </Typography>
                    <div className="p-tag">MONTHS</div>
                  </div>
                ) : null}
                {msrp ? (
                  <div className="box">
                    <Typography variant="h6">MSRP (starting at)</Typography>

                    <Typography variant="h1">{msrp}</Typography>
                    <div className="p-tag">
                      {!!productDetailsData?.currency
                        ? productDetailsData?.currency
                        : ""}
                    </div>
                  </div>
                ) : null}
                {productDetailsData?.country_of_origin ? (
                  <div className={cx("box", "box-3")}>
                    <Typography variant="h6">COUNTRY OF ORIGIN</Typography>
                    <Typography variant="h1">
                      {!!productDetailsData?.country_of_origin
                        ? productDetailsData?.country_of_origin
                        : "-"}
                    </Typography>
                  </div>
                ) : null}
              </div>
              {productDetailsData?.nutrition_facts && (
                <div className="nutrition-facts-block">
                  {getNutritionFactsType(
                    productDetailsData?.nutrition_facts
                  ) === "pdf" ? (
                    <iframe
                      src={`${productDetailsData?.nutrition_facts}#toolbar=0`}
                      frameBorder="0"
                      title="Nutrition Facts"
                    ></iframe>
                  ) : (
                    <img
                      onClick={() => setOpenNutritionPopup(true)}
                      src={productDetailsData?.nutrition_facts}
                      alt="Nutrition Facts"
                    />
                  )}
                </div>
              )}
              {!!productDetailsData?.ingredients ? (
                <>
                  <Typography variant="h2">Ingredients:</Typography>
                  <div
                    className="content-description"
                    dangerouslySetInnerHTML={{
                      __html: productDetailsData?.ingredients,
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            {getRole() === "client" && (
              <div className="product-serving-block">
                <div className="white-box">
                  <div className="serving-title">
                    <Typography variant="h4">
                      {state?.products?.productVariationsData[0]?.name}s
                      Available
                    </Typography>
                  </div>
                  <List className="serving-list">
                    {productDetailsData?.products_variations.map((q, index) => {
                      return (
                        <ListItem key={q.variation_id}>
                          {q.variation_name}:
                          <span onClick={handleClickOpen("body", index)}>
                            {getTotalQuantity(index)}
                          </span>
                        </ListItem>
                      );
                    })}
                  </List>
                  <Button
                    color="primary"
                    className="primary-btn"
                    onClick={handleQuoteRequest}
                    // disabled={
                    //   quotesData?.length > 0
                    //     ? !quotesData?.find((data) =>
                    //         data.products.find(
                    //           (item) => item.product_id === productDetailsData?.id
                    //         )
                    //       )
                    //     : true
                    // }
                  >
                    {quotesData?.length > 0
                      ? !!quotesData?.find((data) =>
                          data.products.find(
                            (item) => item.product_id === productDetailsData?.id
                          )
                        )
                        ? "EDIT QUOTE"
                        : "GET A QUOTE"
                      : "GET A QUOTE"}
                  </Button>
                  <ProductQuantity
                    open={open}
                    handleClose={() => handleClose(false)}
                    childVariations={productDetailsData?.products_variations}
                    flavour={flavour}
                    handleIncrementFlavour={handleIncrementFlavour}
                    handleDecrementFlavour={handleDecrementFlavour}
                    handleQuantityChange={handleQuantityChange}
                    handleAddToQuote={handleAddToQuote}
                    tab={tab}
                    handleTabChange={handleTabChange}
                    productVariationsData={
                      state?.products?.productVariationsData
                    }
                  />
                </div>
              </div>
            )}
            {getRole() === "staff" && (
              <div className="product-serving-block">
                <div className="white-box">
                  <div className="serving-title">
                    <Typography variant="h4" style={{ textAlign: "center" }}>
                      Available{" "}
                      Options
                    </Typography>
                  </div>
                  <List className="serving-staff-list">
                    {productDetailsData?.products_variations.map((q, index) => {
                      return (
                        <>
                          <p key={q.variation_id}>
                            {q.variation_name}:
                            <span>
                              {q.variations_options
                                .map((o) => o.name)
                                .join(", ")}
                            </span>
                          </p>
                          <hr></hr>
                        </>
                      );
                    })}
                  </List>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {!!productDetailsData?.nutrition_facts && (
          <ProductGalleryEnlarg
            open={openNutritionPopup}
            handleClose={closeNutritionPopup}
            images={[productDetailsData?.nutrition_facts]}
          />
        )} */}
        {!!productDetailsData?.nutrition_facts && openNutritionPopup && (
          <Lightbox
            mainSrc={productDetailsData?.nutrition_facts}
            onCloseRequest={closeNutritionPopup}
          />
        )}
        {openConfirmPopup && !!imageList && (
          <Lightbox
            mainSrc={imageList[photoIndex]}
            nextSrc={imageList[(photoIndex + 1) % imageList.length]}
            prevSrc={
              imageList[(photoIndex + imageList.length - 1) % imageList.length]
            }
            onCloseRequest={closeConfirmPopup}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + imageList.length - 1) % imageList.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % imageList.length)
            }
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
