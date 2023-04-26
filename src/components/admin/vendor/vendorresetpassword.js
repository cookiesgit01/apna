import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./login.css";
import MainButton from "../common/button";
import axios from "axios";

const VendorResetPassword = (props) => {





  const navigate = useNavigate();
  const [PasswordError, setPasswordError] = useState("");
  const [passval, setpassval] = useState("");

  const [password, setpassword] = useState({
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [validation, setValidation] = useState(false);
  const onPasswordChange = (e) => {
    setpassword({ ...password, [e.target.name]: e.target.value });
    setPasswordError("")
    setValidation(false);
  };

  const PasswordChange = (e) => {
    setpassval(e.target.value)
    setPasswordError("")
  }
  const LoginForm = (e) => {
    if (
      passval.new_password !== password.confirm_password &&
      passval.new_password !== "" &&
      password.confirm_password !== ""
    )
      if (!passval) {
        setPasswordError("New password is required");
      }
      else if (
        passval < 8 ||
        passval !== /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      ) {
        setPasswordError(
          "New password must be at least 8 characters, 1 lowercase letter, 1 uppercase letter and 1 digit"
        );
      }
      else if (
        passval.new_password === "" ||
        password.confirm_password === ""
      ) {
        setValidation("please fill all input");
      }
      else {
        setValidation("not same");
        setPasswordError("");
      }
    if (passval.length >= 8) {

      axios
        .put(`${process.env.REACT_APP_BASEURL}/update_password`, {
          admin_email: password.email,
          admin_password: password.current_password,
          new_admin_password: password.confirm_password,
        })
        .then((response) => {
          if (response.data.response === "please fill all input") {
            setValidation("please fill all input");
          } else if (response.data.response === "email not matched") {
            setValidation("email not matched");
          } else if (response.data.response === "password not matched") {
            setValidation("password not matched");
          } else if (
            passval.new_password === password.confirm_password &&
            response.data.response === "password_updated"
          ) {
            navigate("/login");
          }
        });

    }
    e.preventDefault();
  };

  return (
    <Fragment>


      <div className="admin_login_form">
        <div className="log-in-box">
          <div className="log-in-title">
            <h4>Change Password</h4>
          </div>

          <div className="input-box">
            <form className="row g-4">
              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    required
                    value={password.email}
                    name={"email"}
                    onChange={(e) => onPasswordChange(e)}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                  />
                  <label for="currentpassword">Email</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    required
                    value={password.current_password}
                    name={"current_password"}
                    onChange={(e) => onPasswordChange(e)}
                    type="password"
                    className="form-control"
                    id="currentpassword"
                    placeholder="Current Password"
                  />
                  <label for="currentpassword">Current Password</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    required
                    value={passval.new_password}
                    name={"new_password"}
                    onChange={(e) => PasswordChange(e)}
                    type="password"
                    className="form-control"
                    id="new password"
                    placeholder="New Password"
                  />
                  {PasswordError && (
                    <p className="error-message text-danger">{PasswordError}</p>
                  )}
                  <label for="new password">New Password</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    required
                    value={password.confirm_password}
                    name={"confirm_password"}
                    onChange={(e) => onPasswordChange(e)}
                    type="password"
                    className="form-control"
                    id="confirm password"
                    placeholder="Confirm Password"
                  />
                  <label for="confirm password">Confirm Password</label>
                </div>
              </div>
              {validation === "please fill all input" ? (
                <p className="mt-2 ms-2 text-danger" type="invalid">
                  Please Fill All Fields
                </p>
              ) : validation === "email not matched" ? (
                <p className="mt-2 ms-2 text-danger" type="invalid">
                  Please Fill Correct Email
                </p>
              ) : validation === "password not matched" ? (
                <p className="mt-2 ms-2 text-danger" type="invalid">
                  Please Fill Correct Password
                </p>
              ) : validation === "not same" ? (
                <p className="mt-2 ms-2 text-danger" type="invalid">
                  New Password And Confirm Password Should Be Same
                </p>
              ) : null}
              <div className="col-12">
                <MainButton
                  btntext={"Change Password"}
                  btnclass={"w-100 btn-success btn"}
                  onClick={LoginForm}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

    </Fragment>
  );
};
export default VendorResetPassword;
