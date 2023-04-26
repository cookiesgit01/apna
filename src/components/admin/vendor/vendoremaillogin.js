import React, { Fragment, useState } from "react";



import MainButton from "../common/button";

import Logo from '../../../images/logo.png'
import Spinner from "react-bootstrap/Spinner";


const VendorEmailLogin = () => {


  //   const [sellerLoginshow, setSellerLoginShow] = useState(false);
  //   const [sellerForgetpasswordshow, setSellerForgetpasswordshow] = useState(false);
  //   const [sellerChangepasswordshow, setSellerChangepasswordshow] = useState(false);
  //   const [otpverificationshow, setOtpverificationShow] = useState(false);
  //   const[sellersignupshow,setSellerSignUpShow]=useState(true)
  const [spinner, setSpinner] = useState(false);
  //   const [otp, setotp] = useState(0);
  //   const [emailVal, setemailVal] = useState("");



  //   const [emailerror, setemailerror] = useState("");

  //   const [passval, setpassval] = useState("");


  //   const navigate = useNavigate();

  //   const { state } = useLocation();

  //   const [emailvaluebyforget,setEmailvaluebyforget]=useState()

  // const getdatafromForgetpassword=(data)=>{
  //   setEmailvaluebyforget(data)


  // }


  // const sellerloginfunction=()=>{
  //   setSellerLoginShow(true)
  //   setSellerSignUpShow(false)
  // }

  // const sellerForgetPasswordFunction=()=>{
  //   setSellerForgetpasswordshow(true)
  //   setSellerLoginShow(false)
  //   setSellerSignUpShow(false)
  // }


  //   const onEmailChange=(e)=>{
  //     setemailVal(e.target.value);
  //     setemailerror("")
  //   }


  //   const onPasswordChange = (e) => {
  //     setpassval(e.target.value);
  //   };

  setSpinner(false)

  //   const SignUpUser = (e) => {

  //     e.preventDefault();

  //     // alert("SINGNNN"+email)
  //      setSpinner("spinner");
  //     axios
  //       .post(`${process.env.REACT_APP_BASEURL}/vendor_signup`, {
  //         email: emailVal,
  //       })
  //       .then((response) => {

  //         setSpinner(false);
  //         if (response.data.response === false) {
  //           setemailerror("Already Exist. Please Login");
  //           emailVal = "";
  //         } else if (response.data.message === "invalid address") {
  //           setemailerror("invalid address");
  //           setSpinner(false);
  //         } else {
  //           setSpinner(false);
  //           setemailerror("")
  //           setOtpverificationShow(true)
  //           setSellerSignUpShow(false)
  //         }
  //         return response;
  //       })
  //       .catch((error) => {});
  //   };
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
                  <h3>Seller  On Apna Organic</h3>
                </div>
              </div>

              {/* vendor sign up[  start] */}
              <div className="admin_login_form">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h4>Create your password</h4>
                  </div>
                  <div className="input-box">
                    <form className="row g-4"
                    // onSubmit={SignUpUser}
                    >
                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            required
                            // onChange={(e)=>{ onEmailChange(e)}}
                            type="email"
                            className="form-control"
                            name={"admin_email"}

                            placeholder="Email Address"
                          />
                          {/* {emailerror === "Already Exist. Please Login" ? (
                            <p className="text-danger">
                              {"Vendor Already Exist. Please Login"}
                            </p>
                          ) : emailerror === "invalid address" ? (
                            <p className="mt-1 ms-2 text-danger" type="invalid">
                              Please Enter Correct Email
                            </p>
                          ) : null} */}
                          <label htmlFor="email">Email Address</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            required
                            // onChange={(e) => onPasswordChange(e)}
                            type="password"
                            className="form-control"
                            name={"admin_password"}

                            placeholder="Password"
                          />

                          <label htmlFor="password">Password</label>
                        </div>
                      </div>

                      <div className="col-12 py-2">
                        <div className="forgot-box d-flex justify-content-between">
                          <div className="form-check ps-0 m-0 remember-box">
                            <input
                              className="checkbox_animated check-box"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Remember me
                            </label>
                          </div>
                          {/* <NavLink to="/forgot" className="forgot">
                            Forgot Password?
                          </NavLink> */}
                          {/* <div
                      onClick={sellerForgetPasswordFunction}
                       className="sign-up-box"

                     > 
                          Forget password?
                     </div>  */}
                        </div>
                      </div>

                      <div className="col-12">
                        {spinner === "spinner" ?
                          <MainButton
                            btntext={<Spinner animation="border" role="status">
                              <span className="visually-hidden">

                                Sign Up
                              </span>
                            </Spinner>}
                            btnclass={"w-100 btn-success btn"}
                          >
                          </MainButton> :
                          <MainButton
                            btntext={"Sign Up"}
                            btnclass={"w-100 btn-success btn"}
                          ></MainButton>}

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
export default VendorEmailLogin;
