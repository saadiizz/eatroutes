import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@utils/theme";
import { userRole } from "@utils/constant";
import Login from "@pages/login";
import Brands from "@pages/brands";
import Products from "@pages/products";
import ProductDetail from "@pages/product-detail";
import RegulatorySettings from "@pages/regulatory-settings";
import RequirementsSettings from "@pages/requirements";
import QuoteRequest from "@pages/quote-request";
import CustomerList from "@pages/customer-list";
import AddNewCustomer from "@pages/customer-list/add-new-customer";
import MyProfile from "@pages/my-profile";
import PrivateRoute from "@utils/privateRoute";
import PendingProductsVendor from "@pages/products-vendor/pending-product";
import PendingProductsSupplier from "@pages/products-vendor/pending-product-supplier"
import RejectedProductsSupplier from "@pages/products-vendor/rejected-product-supplier"
import ProductsVendor from "@pages/products-vendor";
import ChangePassword from "@pages/password/change-password";
import ForgotPassword from "@pages/password/forgot-password";
import PageNotFound from "@components/404";
import AddNewProduct from "@pages/products-vendor/add-new-product";
import QuoteRequestStaff from "@pages/quote-request-staff";
import SampleRequestVendor from "@pages/sample-request-vendor";
import ComingSoon from "@components/coming-soon";
import AddNewBrand from "@pages/add-new-brand";
import StaffClientRegulatory from "@pages/staff-client-regulatory";
import { getRole, getToken } from "@utils/commonFunctions";
import ViewQuoteRequest from "@pages/view-quote-request";
import ViewSampleRequest from "@pages/view-sample-request";
import PandingBrands from "@pages/pending-brands";
import ViewBrandProfile from "@pages/view-brand-profile";
import BrandRegistered from "@pages/add-new-brand/BrandRegistered";
import ViewOrderRequest from "./pages/view-orders";
import ViewOrderStaffRequest from "./pages/view-orders-staff";
import SampleRequestStaff from "./pages/sample-request-staff";
import BrandRequest from "./pages/brand-request";
import LeadList from './pages/leads/index'
import StaffList from "./pages/staff";
import AddNewLead from "./pages/leads/addLead";
import CustomerLead from "./pages/leads/customerLead";

function AppRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-new-brand" element={<AddNewBrand />} />
          <Route path="/pending-brands" element={<PandingBrands />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                {/* {getRole() === userRole.client || getRole() === userRole.vrm ? (
                  <Brands />
                ) : getRole() === userRole.staff ? (
                  <CustomerList />
                ) : (
                  <ProductsVendor />
                )} */}{}
                {getRole() === userRole.vrm && <Brands />}
                {getRole() === userRole.staff && <Brands />}
                {getRole() === userRole.brand && <ProductsVendor />}
                {getRole() === userRole.client && <Brands />}
                {getRole() === userRole.crm && <LeadList />}
              </PrivateRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <PrivateRoute
                role={[userRole.client, userRole.vrm, userRole.staff]}
              >
                <Brands />
              </PrivateRoute>
            }
          />
          <Route
            path="/brands/:id"
            element={
              <PrivateRoute role={[userRole.client, userRole.staff]}>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-brand/:id"
            element={
              <PrivateRoute role={[userRole.vrm]}>
                <ViewBrandProfile />
              </PrivateRoute>
            }
          />
            <Route
            path="/pending-products-vrm"
            element={
              <PrivateRoute role={[userRole.vrm]}>
              <PendingProductsVendor/>
              </PrivateRoute>
            }
          />
             <Route
            path="/pending-products-supplier"
            element={
              <PrivateRoute role={[userRole.brand]}>
              <PendingProductsSupplier/>
              </PrivateRoute>
            }
          />
            <Route
            path="/rejected-products-supplier"
            element={
              <PrivateRoute role={[userRole.brand]}>
              <RejectedProductsSupplier/>
              </PrivateRoute>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <PrivateRoute role={[userRole.client, userRole.staff]}>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/coming-soon"
            element={
              <PrivateRoute>
                <ComingSoon />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/products-vendor"
            element={
              <PrivateRoute role={[userRole.brand, userRole.vrm]}>
                <ProductsVendor />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-new-product"
            element={
              <PrivateRoute role={[userRole.brand, userRole.vrm]}>
                <AddNewProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <PrivateRoute role={[userRole.brand, userRole.vrm]}>
                <AddNewProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-brand/:id"
            element={
              <PrivateRoute role={[userRole.brand, userRole.vrm]}>
                <AddNewBrand />
              </PrivateRoute>
            }
          />
          <Route
            path="/regulatory-settings"
            element={
              <PrivateRoute role={[userRole.client]}>
                <RegulatorySettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/requirements"
            element={
              <PrivateRoute role={[userRole.client]}>
                <RequirementsSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/staff-client-regulatory/:id"
            element={
              <PrivateRoute role={[userRole.staff]}>
                <StaffClientRegulatory />
              </PrivateRoute>
            }
          />
          <Route
            path="/quote-request"
            element={
              <PrivateRoute role={[userRole.client, userRole.vrm]}>
                <QuoteRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/quote-request-staff"
            element={
              <PrivateRoute role={[userRole.staff]}>
                <QuoteRequestStaff />
              </PrivateRoute>
            }
          />

          <Route
            path="/sample-request-vendor"
            element={
              <PrivateRoute role={[userRole.vrm]}>
                <SampleRequestVendor />
              </PrivateRoute>
            }
          />
          <Route
            path="/sample-request-staff"
            element={
              <PrivateRoute role={[userRole.staff]}>
                <SampleRequestStaff />
              </PrivateRoute>
            }
          />
          <Route
            path="/brand-request"
            element={
              <PrivateRoute role={[userRole.staff]}>
                <BrandRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer-list"
            element={
              <PrivateRoute role={[userRole.staff,userRole.crm]}>
                <CustomerList />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute role={[userRole.crm]}>
                <LeadList/>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-new-lead"
            element={
              <PrivateRoute role={[userRole.crm]}>
                <AddNewLead/>
              </PrivateRoute>
            }
          />
          <Route
            path="/customerLead"
            element={
              <PrivateRoute role={[userRole.crm]}>
                <CustomerLead/>
              </PrivateRoute>
            }
          />
          <Route
            path="/staff-list"
            element={
              <PrivateRoute role={[userRole.crm]}>
                <StaffList/>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-new-customer"
            element={
              <PrivateRoute role={[userRole.staff]}>
                <AddNewCustomer />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <PrivateRoute
                role={[userRole.client, userRole.staff, userRole.vrm,userRole.crm]}
              >
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="brand/my-profile"
            element={
              <PrivateRoute role={[userRole.brand]}>
                <ViewBrandProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-quote-request"
            element={
              <PrivateRoute role={[userRole.client]}>
                <ViewQuoteRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-sample-request"
            element={
              <PrivateRoute role={[userRole.client]}>
                <ViewSampleRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-orders"
            element={
              <PrivateRoute role={[userRole.client]}>
                <ViewOrderRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-orders-staff"
            element={
              <PrivateRoute role={[userRole.staff,userRole.crm]}>
                <ViewOrderStaffRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/page-not-found"
            element={
              <PrivateRoute>
                <PageNotFound />
              </PrivateRoute>
            }
          />
          <Route
            path="/brand-registered"
            element={
              !getToken() ? (
                <BrandRegistered />
              ) : (
                <Navigate to="page-not-found" />
              )
            }
          />
          <Route path="*" element={<Navigate to="page-not-found" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default AppRoutes;
