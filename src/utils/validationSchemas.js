import * as yup from "yup";
import { getRole } from "@utils/commonFunctions";
import { userRole } from "@utils/constant";

const emailRegExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
const userRegExp = /^[a-zA-Z0-9{0,40}._]+$/;
/* eslint-disable no-useless-escape */
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// const phoneRegExp =
//   /^(?:\+(([1-9]{1,3}|[0-9]{2,3})))[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{1,8})(?: *x(\d+))?$/;
const today = new Date();
today.setHours(0, 0, 0, 0);
const validationSchema = {
  loginValidationSchema: yup.object({
    username: yup
      .string()
      .trim()
      .min(6, "User Name must more than 6 characters")
      .matches(userRegExp, "Enter a valid userName")
      .required("User Name is required"),
    password: yup.string().required("Password is required"),
  }),

  addCustomerValidationSchema: yup.object({
    firstName: yup
      .string()
      .trim()
      .max(70, "First name must not be more than 70 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .trim()
      .max(70, "Last name must not be more than 70 characters")
      .required("Last name is required"),
    company: yup
      .string()
      .trim()
      .max(70, "Company name must not be more than 70 characters")
      .required("Company name is required"),
    streetAddress: yup
      .string()
      .trim()
      .required("Street address is required")
      .min(10, "Street address must not be less than 10 characters")
      .max(150, "Street address must not be more than 150 characters"),
    city: yup.string().trim().required("City is required"),
    postalCode: yup.string().trim().nullable(),
    country: yup.string().trim().required("Country is required"),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegExp, "Enter a valid phone number (+(area code)(number))")
      .required("Phone number is required"),
    emailAddress: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .max(100, "Email address must not be more than 100 characters")
      .matches(emailRegExp, "Enter a valid email")
      .required("Email is required"),
    userName: yup
      .string()
      .trim()
      .min(6, "User Name must more than 6 characters")
      .matches(userRegExp, "Enter a valid userName")
      .optional(),
    // .required("User Name is required"),
    verifyEmail: yup
      .string()
      .email("Enter a valid email")
      .max(100, "Email address must not be more than 100 characters")
      .matches(emailRegExp, "Enter a valid email")
      .oneOf([yup.ref("emailAddress")], "Email and verify email must match")
      .required("Verify Email is required"),
    password: yup
      .string()
      .trim()
      .min(8, "Password must not be less than 8 characters")
      .required("password is required"),
  }),
  addLeadValidationSchema: yup.object({
    firstName: yup
      .string()
      .trim()
      .max(50, "First name must not be more than 70 characters")
      .required("First name is required *"),
    // lastName: yup
    //   .string()
    //   .trim()
    //   .max(70, "Last name must not be more than 70 characters")
    //   .required("Last name is required"),
    // company: yup
    //   .string()
    //   .trim()
    //   .max(70, "Company name must not be more than 70 characters")
    //   .required("Company name is required"),
    // streetAddress: yup
    //   .string()
    //   .trim()
    //   .required("Street address is required")
    //   .min(10, "Street address must not be less than 10 characters")
    //   .max(150, "Street address must not be more than 150 characters"),
    // city: yup.string().trim().required("City is required"),
    // postalCode: yup
    //   .string()
    //   .trim()
    //   .nullable()
    //   .max(6, "Postal code must not be more than 6"),
    // country: yup.string().trim().required("Country is required"),
    //   VitedInpt: yup.string().label("VitedInpt"),
    // DeadSide: yup.string().optional().when('VitedInpt', ([VitedInpt]: any, schema: any): any => {
    //   if (VitedInpt == String(VitedInpt)) {
    //     return yup.string().required("Unvited is required").label("Unvited")
    //   }
    // }),
    // topInpt:'Unvited',
    // staffInpt:yup.string().trim().optional().required("Staff is required"),
    rating: yup.string().trim().required("Rating is required *"),
    // topInpt:yup.string().trim().required("input item is required"),
    unvitInpt: yup.string().trim().required("Unvited is required *"),
    // vitedInpt :yup.string().trim().required("Staff is required"),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegExp, "Enter a valid phone number (+(area code)(number))")
      .required("Phone number is required *"),
    emailAddress: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .max(100, "Email address must not be more than 100 characters")
      .matches(emailRegExp, "Enter a valid email")
      .required("Email is required *"),
  }),
  addCustomerLeadValidationSchema: yup.object({
    firstName: yup
      .string()
      .trim()
      .max(70, "First name must not be more than 70 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .trim()
      .max(70, "Last name must not be more than 70 characters")
      .required("Last name is required"),
    company: yup
      .string()
      .trim()
      .max(70, "Company name must not be more than 70 characters")
      .required("Company name is required"),
    streetAddress: yup
      .string()
      .trim()
      .required("Street address is required")
      .min(10, "Street address must not be less than 10 characters")
      .max(150, "Street address must not be more than 150 characters"),
    city: yup.string().trim().required("City is required"),
    // postalCode: yup
    //   .string()
    //   .trim()
    //   .nullable()
    //   .max(6, "Postal code must not be more than 6"),
    country: yup.string().trim().required("Country is required"),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegExp, "Enter a valid phone number (+(area code)(number))")
      .required("Phone number is required"),
    emailAddress: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .max(100, "Email address must not be more than 100 characters")
      .matches(emailRegExp, "Enter a valid email")
      .required("Email is required"),
    userName: yup
      .string()
      .trim()
      .min(6, "User Name must more than 6 characters")
      .matches(userRegExp, "Enter a valid userName")
      .required("User Name is required"),
    // verifyEmail: yup
    //   .string()
    //   .email("Enter a valid email")
    //   .max(100, "Email address must not be more than 100 characters")
    //   .matches(emailRegExp, "Enter a valid email")
    //   .oneOf([yup.ref("emailAddress")], "Email and verify email must match")
    //   .required("Verify Email is required"),
    password: yup
      .string()
      .trim()
      .min(8, "Password must not be less than 8 characters")
      .required("password is required"),
  }),
  editCustomerValidationSchema: yup.object({
    firstName: yup
      .string()
      .max(70, "First name must not be more than 70 characters")
      .trim()
      .required("First name is required"),
    lastName: yup
      .string()
      .max(70, "Last name must not be more than 70 characters")
      .trim()
      .required("Last name is required"),
    company: yup
      .string()
      .trim()
      .nullable()
      .max(70, "Company name must not be more than 70 characters")
      .required("Company name is required"),
    streetAddress: yup
      .string()
      .trim()
      .nullable()
      .required("Street address is required")
      .min(10, "Street address must not be less than 10 characters")
      .max(150, "Street address must not be more than 150 characters"),
    city: yup.string().trim().nullable().required("City is required"),
    postalCode: yup
      .string()
      .trim()
      .nullable()
      .required("Postal/Zip code is required"),
    country: yup.string().nullable().required("Country is required"),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegExp, "Enter a valid phone number (+(area code)(number))")
      .required("Phone number is required"),
    emailAddress: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .max(100, "Email address must not be more than 100 characters")
      .matches(emailRegExp, "Enter a valid email")
      .required("Email is required"),
    // userName: yup
    //   .string()
    //   .trim()
    //   .min(6, "User Name must more than 6 characters")
    //   .matches(userRegExp, "Enter a valid userName")
    //   .required("User Name is required"),
  }),

  changePasswordValidationSchema: yup.object({
    oldPassword: yup.string().required("Password is required"),
    newPassword: yup
      .string()
      .trim()
      .min(6, "Password should be of minimum 6 characters length")
      .required("New password is required"),
    confirmPassword: yup
      .string()
      .trim()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Confirm password is required")
      .oneOf([yup.ref("newPassword"), null], "New passwords does not match."),
  }),

  forgotPasswordValidationSchema: yup.object({
    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .max(60, "Email address must not be more than 60 characters")
      .matches(emailRegExp, "Enter a valid email")
      .required("Email is required"),
  }),
  addProductValidationSchema: yup.object({
    ...(getRole() === userRole.vrm
      ? { brandId: yup.number().nullable().required("Brand name is required") }
      : {}),
    name: yup
      .string()
      .trim()
      .max(60, "Name must not be more than 60 characters")
      .required("Name is required"),
    // sku: yup.string().trim().max(60, "SKU not be more than 60 characters"),
    image: yup.string().required("Product image is required"),
    description: yup
      .string()
      .trim()
      // .min(10, "Description not be less than 10 characters")
      .required("Description is required"),
    categories: yup.array().min(1, "Categories is required"),
    variationTypes: yup
      .number()
      .nullable()
      .required("Variation types is required"),
    subVariations: yup.array().when("variationTypes", {
      is: (value) => value !== undefined,
      then: yup.array().nullable().min(1, "Field is required!!"),
    }),
  }),

  addBrandValidationSchema: yup.object({
    firstName: yup
      .string()
      .trim()
      .max(70, "First name must not be more than 70 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .trim()
      .max(70, "Last name must not be more than 70 characters")
      .required("Last name is required"),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegExp, "Enter a valid phone number (+(area code)(number))")
      .required("Phone number is required"),
    emailAddress: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .max(100, "Email address must not be more than 100 characters")
      .matches(emailRegExp, "Enter a valid email")
      .required("Email is required"),
    userName: yup
      .string()
      .trim()
      .min(6, "User Name must more than 6 characters")
      .matches(userRegExp, "Enter a valid userName")
      .required("User Name is required"),

    password: yup
      .string()
      .trim()
      .min(8, "Password must not be less than 8 characters")
      .required("password is required"),

    companyName: yup
      .string()
      .trim()
      .max(70, "Company name must not be more than 70 characters")
      .required("Company name is required"),
    companyAddress: yup
      .string()
      .trim()
      .required("Company address is required")
      .min(10, "Company address must not be less than 10 characters")
      .max(150, "Company address must not be more than 150 characters"),
    brandName: yup
      .string()
      .trim()
      .max(70, "Brand name must not be more than 70 characters")
      .required("Brand name is required"),
    brandWebsite: yup
      .string()
      .trim()
      .max(70, "Brand Website must not be more than 70 characters")
      .required("Brand Website is required"),
    categories: yup.array().min(1, "Categories is required"),
    //categories: yup.number().nullable(),
    // image: yup.string().required("Image is required"),

    // bankName: yup
    //   .string()
    //   .trim()
    //   .max(70, "Bank name must not be more than 70 characters")
    //   .required("Bank name is required"),
    // bankAddress: yup
    //   .string()
    //   .trim()
    //   .required("Bank address is required")
    //   .min(10, "Bank address must not be less than 10 characters")
    //   .max(150, "Bank address must not be more than 150 characters"),
    // beneficiaryName: yup
    //   .string()
    //   .trim()
    //   .max(70, "Beneficiary name must not be more than 70 characters")
    //   .required("Beneficiary name is required"),
    // beneficiaryAddress: yup
    //   .string()
    //   .trim()
    //   .required("Beneficiary address is required")
    //   .min(10, "Beneficiary address must not be less than 10 characters")
    //   .max(150, "Beneficiary address must not be more than 150 characters"),
    // accountNumber: yup
    //   .string()
    //   .trim()
    //   .max(13, "Account Number must not be more than 13 characters")
    //   .required("Account Number is required"),
    // routingNumber: yup
    //   .string()
    //   .trim()
    //   .max(13, "Routing Number must not be more than 13 characters")
    //   .required("Routing Number is required"),
    // wirePaymentDetail: yup
    //   .string()
    //   .trim()
    //   .required("Wire payment detail is required"),

    // wirePaymentDetail: yup.string().when("bankName", {
    //   is: (value) => !value,
    //   then: yup.string().required("Wire payment detail is required"),
    // }),

    // catalogForm: yup.string().trim().required("Catalog Form is required"),
    // orderForm: yup.string().trim().required("Order Form is required"),
    // productsImport: yup.string().trim().required("Products Import is required"),
    // businessLicense: yup
    //   .string()
    //   .trim()
    //   .required("Business License is required"),
  }),
  editBrandValidationSchema: yup.object({
    firstName: yup
      .string()
      .trim()
      .max(70, "First name must not be more than 70 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .trim()
      .max(70, "Last name must not be more than 70 characters")
      .required("Last name is required"),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegExp, "Enter a valid phone number (+(area code)(number))")
      .required("Phone number is required"),
    emailAddress: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .max(100, "Email address must not be more than 100 characters")
      .matches(emailRegExp, "Enter a valid email")
      .required("Email is required"),
    userName: yup
      .string()
      .trim()
      .min(6, "User Name must more than 6 characters")
      .matches(userRegExp, "Enter a valid userName")
      .required("User Name is required"),
    companyName: yup
      .string()
      .trim()
      .max(70, "Company name must not be more than 70 characters")
      .required("Company name is required"),
    companyAddress: yup
      .string()
      .trim()
      .nullable()
      .required("Company address is required")
      .min(10, "Company address must not be less than 10 characters")
      .max(150, "Company address must not be more than 150 characters"),
    brandName: yup
      .string()
      .trim()
      .max(70, "Brand name must not be more than 70 characters")
      .required("Brand name is required"),
    brandWebsite: yup
      .string()
      .trim()
      .max(70, "Brand Website must not be more than 70 characters")
      .required("Brand Website is required"),
    categories: yup.array().min(1, "Categories is required"),
  }),

  addSampleValidationSchema: yup.object({
    address: yup.string().required("Shipping Address is required"),
    city: yup.string().trim().required("City is required"),
    state: yup.string().required("State is required"),
    postal_code: yup.string().nullable(),
    country: yup.string().trim().required("Country is required"),
    notes: yup.string().nullable(),
    request: yup.string().nullable(),
  }),

  requestSampleApprovedValidationSchema: yup.object({
    charge_amount: yup
      .number()
      .min(1, "Please enter more than 0 amount")
      .required("ship amount is required"),
  }),

  requestSampleShippedValidationSchema: yup.object({
    tracking_url: yup.string().required("Tracking URL is required"),
  }),

  requestSampleRejectedValidationSchema: yup.object({
    reason: yup.string().required("Reason is required"),
  }),

  requestQuoteReadyValidationSchema: yup.object({
    pdf: yup.string().required("PDF file is required"),
    notes: yup.string().nullable(),
  }),

  requestQuoteStaffApprovedValidationSchema: yup.object({
    sales_order: yup.number().nullable(),
    tracking_url: yup.string().required("Tracking URL is required"),
  }),
};

export default validationSchema;
