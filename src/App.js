import "./App.css";
import { useState, useEffect } from "react";
import AppRoutes from "./Routes";
import "@assets/css/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrandContext } from "@context/brand";
import API from "@services/axios";
import { FETCH_CUSTOMERS_FAILURE } from "@utils/actionType";
import { useStore } from "@store/store";
import { getToken } from "@utils/commonFunctions";
function App() {
  const [dispatch] = useStore();
  const [brandName, setBrandName] = useState({ id: "", name: "Select Brands" });
  const [brandRequestList, setBrandReq] = useState([]);
  const getbrandReqest = () => {
    API.get(`/brand/requests?limit=${200}&client_brand_status=${3}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          setBrandReq(response.data.data);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
      });
  };
  useEffect(() => {
    let token = getToken();
    if (token) {
      getbrandReqest();
    }
  }, []);

  return (
    <>
      <BrandContext.Provider
        value={{ brandName, setBrandName, brandRequestList, setBrandReq }}
      >
        <AppRoutes />
      </BrandContext.Provider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </>
  );
}

export default App;
