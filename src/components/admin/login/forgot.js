import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import MainButton from "../common/button";
import Logo from "../../../images/logo.png";
import axios from "axios";
import Countdown from "react-countdown";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [emailerror, setemailerror] = useState(false);
  const [timer, settimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const forgotInfo = (e) => {
    if (email === "") {
      setemailerror("null");
      setLoading(false);
    } else {
      settimer(true);
      setLoading(true);

      axios
        .put(`${process.env.REACT_APP_BASEURL}/admin_forget_password`, {
          admin_email: email,
        })
        .then((response) => {
          if (response.data.response === "invalid_mail") {
            settimer(false);
            setemailerror(response.data.response);
            setLoading(false);
          } else {
            navigate("/login");
          }
        });
    }
    e.preventDefault();
  };
  const handleFormChange = (e) => {
    setEmail(e.target.value);
    setemailerror(false);
  };

  // countdown
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      // return <Completionist />;
    } else {
      // Render a countdown
      return (
        <h4 className="mt-2 ms-2 text-danger mx-3">
          {hours}:{minutes}:{seconds}
        </h4>
      );
    }
  };
  // end countdown
  return (
    <Fragment>
      <div className="for_scrol">
        <div className="container">
          <div className="row mt-5">
            <div className="col-xl-4 col-lg-6 m-auto">
              <div className="heading_logo text-center">
                <div className="logo">
                  <img src={Logo} alt={"apnaorganic"} />
                </div>
                <div className="heading_line">
                  <h3>Sell On Apna Organic</h3>
                </div>
              </div>
              <div className="admin_login_form">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h4>Forgot your password</h4>
                  </div>

                  <div className="input-box">
                    <form className="row g-4">
                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) => handleFormChange(e)}
                            value={email}
                            name={"admin_email"}
                            placeholder="Email Address"
                          />
                          <label for="email">Email Address</label>
                        </div>
                        {timer === true ? (
                          <Countdown
                            date={Date.now() + 30000}
                            renderer={renderer}
                          />
                        ) : null}
                        {emailerror === "null" ? (
                          <p className="mt-1 ms-2 text-danger" type="invalid">
                            Please Enter Email
                          </p>
                        ) : emailerror === "invalid_mail" ? (
                          <p className="mt-1 ms-2 text-danger" type="invalid">
                            Please Enter Valid Email
                          </p>
                        ) : null}
                      </div>

                      <div className="col-12">
                        {loading === true ? (
                          <button
                            type="submit"
                            className="w-100 btn-success btn"
                          >
                            &nbsp;&nbsp;&nbsp; sending...
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          </button>
                        ) : (
                          <MainButton
                            btntext={"Forgot password"}
                            btnclass={"w-100 btn-success btn"}
                            onClick={forgotInfo}
                          />
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Forgot;
