// import React, { useState } from "react";
// import React from "react";
import { useState } from "react";
const useHook = (callback) => {
  // initial state
  // const initialState = {
  //     name: {
  //       value: '',
  //       required: true
  //     },
  //     email: {
  //       value: '',
  //       required: true,
  //       requiredMessage: 'Email address is required!',
  //       email: true,
  //       emailMessage: 'Email address is not valid!'
  //     }
  //     ,
  //     password: {
  //       value: '',
  //       required: true,
  //       minLength: 6,
  //       minLengthMessage: 'Password must be at least 6 characters long!',
  //       maxLength: 16,
  //       maxLengthMessage: 'Too many characters!'
  //     },
  //     confirmPassword: {
  //       value: '',
  //       required: true,
  //       matchWith: 'password',
  //       matchWithMessage: 'Passwords must be equal!'
  //     },
  //     gender: {
  //       value: '',
  //       required: true
  //     },
  //     difficulty: {
  //       value: '',
  //       required: true
  //     },
  //     image: {
  //       value: {},
  //       required: true,
  //       file: true,
  //       allowedTypes: ['jpg', 'jpeg', 'png', 'gif'],
  //       maxFileSize: 1024
  //     },
  //     description: {
  //       value: ''
  //     },
  //     terms: {
  //       value: false,
  //       required: true,
  //       requiredMessage: 'You need to accept our Terms and Conditions'
  //     }
  //   }
  // for input field data
  // for  validation error
  const [loginerror, setLoginerror] = useState({});

  // validation function

  const customValidates = (field, value) => {
    switch (field) {
      case "admin_email":
        let passregex =
          /^([a-zA-Z0-9_.+-])+(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
        let checkpass = passregex.test(value);
        console.log(checkpass)
        if (value === "") {
          setLoginerror({
            ...loginerror,
            field: "Please Enter Correct Email",
          });
        } else {
          setLoginerror("");
        }
        break;
      case "admin_password":
        if (value === "") {

          setLoginerror({
            ...loginerror,
            field: "Please Enter Correct Password",
          });
        } else {
          setLoginerror("");
        }
        break;
      default:
        break;
    }
  };

  // onchange function

  //   const onLoginFormChange = (e) => {
  //     e.persist();
  //     let name = e.target.name;
  //     let values = e.target.value;
  //     // customValidates(e, name, values);

  //     setLogindata({ ...logindata, [name]: values });
  //   };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     Object.entries(logindata).forEach(([field, value]) => {
  //       customValidates(e, field, value);
  //     });

  //     callback();
  //   };
  return {
    loginerror,
    customValidates,
  };
};

export default useHook;
