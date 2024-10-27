import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "@components/footer";
import SiteLogo from "@assets/images/site-logo.png";
import LoginBg from "@assets/images/login-background.jpg";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from "@utils/actionType";
import { getToken, getRole } from "@utils/commonFunctions";
import { useStore } from "@store/store";
import API from "@services/axios";
import { loginStyle } from "./style";
import { userRole } from "@utils/constant";
import Loader from "@components/loader";
import { toast } from "react-toastify";

function Login() {
  const classes = loginStyle();
  const [state, dispatch] = useStore();
  let navigate = useNavigate();

  useEffect(() => {
    getToken() && navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: schema.loginSchema,
    validationSchema: validationSchema.loginValidationSchema,
    onSubmit: (values) => {
      dispatch({ type: LOGIN });
      // +`?username=${values.username}&password=${values.password}`
      let payload = {
        username:values.username,
        password:values.password
      }
      API.post("/authenticate",payload)
        .then((response) => {
          if (response.data.statusCode === 200) {
            const temp_pass = response.data?.data.user?.temp_password;
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            temp_pass === 1
              ? getToken() && navigate("/change-password")
              : getToken() &&
                [userRole.client, userRole.vrm, userRole.staff].includes(
                  getRole()
                )
              ? navigate("/")
              : userRole.brand === getRole()
              ? navigate("/products-vendor")
              : navigate("/");
          } else {
            dispatch({
              type: LOGIN_FAILURE,
              payload: response.data.errorMessage,
            });
            toast.error(response.data.errorMessage);
          }
        })
        .catch((error) => {
          dispatch({ type: LOGIN_FAILURE, payload: error.errorMessage });
          console.log(error.errorMessage);
        });
    },
  });

  return (
    <div className={classes.loginWrapper}>
      <Loader loading={state?.login?.loading} />
      <div className="login-page-wrapper">
        <img src={LoginBg} alt="Login" className="login-bg" />
        <div className="login-block">
          <div className="logo-block">
            <img src={SiteLogo} alt="Eat routes" />
          </div>
          <form className="login-inner" onSubmit={formik.handleSubmit}>
            <Typography variant="h1">Welcome</Typography>
            <div className="form-wrapper">
              <div className="form-group">
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
            </div>
            <div className="btn-wrapper">
              <Button color="primary" className="primary-btn" type="submit">
                Login
              </Button>
            </div>
            <p className="register-account-link">
              Don’t have an account ?
              <Link to="/add-new-brand" title="Register Account">
                Register Your Brand
              </Link>
            </p>
            <p className="register-account-link">
              <Link to="/forgot-password" title="Forgot Password">
                Forgot Password?
              </Link>
            </p>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
