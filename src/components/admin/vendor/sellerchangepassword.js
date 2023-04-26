import React, { Fragment, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";
import MainButton from "../common/button";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import SAlert from "../common/salert";
const SallerChangePassword = (props) => {



  const [showalert, setShowshowAlert] = useState(false);
  const [spinner, setSpinner] = useState(false);


  const [emailerror, setemailerror] = useState("");

  const [otperror, setOtperror] = useState(false);



  const [forgototp, setforgototp] = useState(0);
  const [forgotpassval, setforgotpassval] = useState("");

  // const { state } = useLocation();


  const closePasswordAlert = () => {
    setShowshowAlert(false)
  }



  const onfORGOTPasswordChange = (e) => {
    setemailerror("")
    setOtperror(false)
    setforgotpassval(e.target.value);
  };

  // const handlefORGOTFormChange = (e) => {
  //   setemailerror("")
  //   setforgotemail(e.target.value);
  // };



  const OnOtpChange = (e) => {
    setOtperror(false)
    setforgototp(e.target.value);
  };

  const VerifyfORGOTOTP = (e) => {


    // if(forgototp==0||forgototp==""){
    //    setOtperror("OtpisEmpty")

    //  } else {
    //    setOtperror("")
    //  }
    if (forgotpassval === "") {

      setemailerror("forgetPasswordEmpty")
    } else {
      setemailerror("")
    }


    if (forgototp !== "" && forgotpassval !== "") {

      e.preventDefault();
      setSpinner("spinner1");

      axios
        .post(`${process.env.REACT_APP_BASEURL}/vendor_otp_verify`, {
          email: props.sendEmailValue,
          otp: Number(forgototp),
          password: forgotpassval,
        })
        .then((response) => {
          setSpinner(false);


          if (response.data.message === "otp not matched") {
            setOtperror("otpNotMatched");
          }
          if (response.data.message === "succecfully forget password") {
            setSpinner(false);
            setShowshowAlert(true)
            props.showsellerlogin(true)
            props.sellersign(false)
            props.forgetpassword(false)
            props.sellerChangePsword(false)
          }



        })
        .catch((error) => { });

    }

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
                    value={props.sendEmailValue}
                    name={"email"}
                    disabled
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
                    // value={forgototp}
                    name="otp"
                    onChange={(e) => OnOtpChange(e)}
                    type="number"
                    className="form-control"
                    id="currentpassword"
                    placeholder="Enter Otp"
                  />
                  {otperror === "otpNotMatched" ? (
                    <p className="text-danger">Invalid Otp....!!!</p>
                  ) : otperror === "OtpisEmpty" ? (
                    <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please Enter Otp First
                    </p>
                  ) : null}
                  <label for="currentpassword">One Time Password</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating theme-form-floating log-in-form">
                  <input
                    required
                    value={forgotpassval}
                    name="password"
                    onChange={(e) => onfORGOTPasswordChange(e)}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="New Password"
                  />
                  {emailerror === "forgetPasswordEmpty" ? (
                    <p className="mt-1 ms-2 text-danger" type="invalid">
                      Enter password First
                    </p>
                  ) : null}
                  <label for="new password">New Password</label>
                </div>
              </div>



              <div className="col-12">



                {spinner === "spinner1" ?
                  <MainButton
                    btntext={<Spinner animation="border" role="status">
                      <span className="visually-hidden">

                        Change Password
                      </span>
                    </Spinner>}
                    onClick={VerifyfORGOTOTP}
                    btnclass={"w-100 btn-success btn"}
                  >
                  </MainButton> :
                  <MainButton
                    btntext={" Change Password"}
                    btnclass={"w-100 btn-success btn"}
                    onClick={VerifyfORGOTOTP}
                  ></MainButton>}

              </div>
            </form>
          </div>
        </div>
      </div>
      <SAlert
        show={showalert}
        title=" Success "
        text="Pasword Change Successfully"
        onConfirm={closePasswordAlert}
      />
    </Fragment>
  );
};
export default SallerChangePassword;
