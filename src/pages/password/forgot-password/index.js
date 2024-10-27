import React from "react";
import { useFormik } from "formik";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "@components/footer";
import SiteLogo from "@assets/images/site-logo.png";
import LoginBg from "@assets/images/login-background.jpg";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "@utils/actionType";
import { useStore } from "@store/store";
import API from "@services/axios";
import { loginStyle } from "./style";
import Loader from "@components/loader";
import { toast } from "react-toastify";

function ForgotPassword() {
  const classes = loginStyle();
  const [state, dispatch] = useStore();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: schema.forgotPasswordSchema,
    validationSchema: validationSchema.forgotPasswordValidationSchema,
    onSubmit: (values) => {
      dispatch({ type: FORGOT_PASSWORD });
      API.post("/forgot-password", values).then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
          toast.success("Password link successfully sent to your mail");
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILURE,
          });
          toast.error(response.data.errorMessage);
        }
        navigate("/login");
      });
    },
  });

  return (
    <div className={classes.forgotPasswordWrapper}>
      <Loader loading={state?.password?.loadingForgotPassword} />

      <div className="forgot-password-wrapper">
        <img src={LoginBg} alt="Login" className="forgot-password-bg" />
        <div className="forgot-password-block">
          <div className="logo-block">
            <img src={SiteLogo} alt="Eat routes" />
          </div>
          <form
            className="forgot-password-inner"
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h1">Forgot Password</Typography>
            <p className="instruction">
              Enter your registered email below to receive password reset instructions.
            </p>
            <div className="form-wrapper">
              <div className="form-group">
                <TextField
                  id="email"
                  name="email"
                  label="Email Id"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
            </div>
            <div className="btn-wrapper">
              <Button color="primary" className="primary-btn" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ForgotPassword;
