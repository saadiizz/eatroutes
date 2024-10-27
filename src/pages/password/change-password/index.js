import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import API from "@services/axios";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import Header from "@components/header";
import Footer from "@components/footer";
import { changePasswordStyle } from "./style";
import { Button, Typography, TextField, InputAdornment } from "@mui/material";
import EyeIcon from "@assets/images/eye.svg";
import EyeHideIcon from "@assets/images/eye-line.svg";
import { useStore } from "@store/store";
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  LOGOUT,
} from "@utils/actionType";
import Loader from "@components/loader";
import { toast } from "react-toastify";

function ChangePassword() {
  const classes = changePasswordStyle();
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [state, dispatch] = useStore();

  let navigate = useNavigate();

  const handleClickOld = () => setOldPassword(!oldPassword);
  const handleClickNew = () => setNewPassword(!newPassword);
  const handleClickConfirm = () => setConfirmPassword(!confirmPassword);

  const formik = useFormik({
    initialValues: schema.changePasswordSchema,
    validationSchema: validationSchema.changePasswordValidationSchema,
    onSubmit: (value) => {
      if (value.oldPassword === value.newPassword) {
        toast.error("New password should not be same as old password");
      } else {
        dispatch({ type: CHANGE_PASSWORD });
        API.post("change-password", {
          old_password: value.oldPassword,
          password: value.newPassword,
          password_confirmation: value.confirmPassword,
        }).then((response) => {
          if (response.data.statusCode === 200) {
            dispatch({
              type: CHANGE_PASSWORD_SUCCESS,
            });
            dispatch({ type: LOGOUT });
            toast.success("Password changed successfully");
            navigate("/login");
          } else {
            dispatch({
              type: CHANGE_PASSWORD_FAILURE,
            });
            toast.error(response.data.errorMessage);
          }
        });
      }
    },
  });

  return (
    <div className={classes.changePasswordWrapper}>
      <Header />
      <Loader loading={state?.password?.loadingChangePassword} />
      <div className="change-password-wrapper">
        <div className="container">
          <Typography variant="h1">Change Password</Typography>
          <div className="white-box">
            <div className="form-wrapper">
              <div className="form-group full-width password-group">
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span onClick={handleClickOld} edge="end">
                          {oldPassword ? (
                            <img src={EyeIcon} alt="eye" />
                          ) : (
                            <img src={EyeHideIcon} alt="eye" />
                          )}
                        </span>
                      </InputAdornment>
                    ),
                  }}
                  id="oldPassword"
                  name="oldPassword"
                  label="Old Password"
                  type={oldPassword ? "text" : "password"}
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.oldPassword}
                  error={
                    formik.touched.oldPassword &&
                    Boolean(formik.errors.oldPassword)
                  }
                  helperText={
                    formik.touched.oldPassword && formik.errors.oldPassword
                  }
                />
              </div>
              <div className="form-group full-width password-group">
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span onClick={handleClickNew} edge="end">
                          {newPassword ? (
                            <img src={EyeIcon} alt="eye" />
                          ) : (
                            <img src={EyeHideIcon} alt="eye" />
                          )}
                        </span>
                      </InputAdornment>
                    ),
                  }}
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type={newPassword ? "text" : "password"}
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                />
              </div>
              <div className="form-group full-width password-group">
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span onClick={handleClickConfirm} edge="end">
                          {confirmPassword ? (
                            <img src={EyeIcon} alt="eye" />
                          ) : (
                            <img src={EyeHideIcon} alt="eye" />
                          )}
                        </span>
                      </InputAdornment>
                    ),
                  }}
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm New Password"
                  type={confirmPassword ? "text" : "password"}
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </div>
            </div>
          </div>
          <div className="bottom-btn-wrapper">
            <Button
              color="primary"
              className="primary-btn"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChangePassword;
