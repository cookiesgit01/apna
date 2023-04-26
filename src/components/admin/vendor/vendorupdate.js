import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Badge, Button, InputGroup, Table } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
// import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import storetype from "../json/storetype";

const VendorUpdate = () => {
  let vendorid = localStorage.getItem("vendorid");
  let vendortoken = localStorage.getItem("vendor_token");
  const [emailVal, setemailVal] = useState("");

  const [AddtagError, setAddTagError] = useState("");
  const [customValidation, setCustomValidation] = useState(false);
  const [SocialLink, setSocialLink] = useState(false);
  const [show, setShow] = useState(false);
  const [newImageUrls, setnewImageUrls] = useState([]);
  const [scall, setsCall] = useState(false);
  const [addvendordata, setaddvendordata] = useState({
    owner_name: "",
    shop_name: "",
    mobile: "",
    email: "",
    shop_address: "",
    gstn: "",
    geolocation: "",
    store_type: "",
    image: "",
    status: "",
    document_name: [],
    availability: "",
    social_media_links: [],
  });

  let encoded;
  let ImgObj = [];
  var imgvalidate;
  const [addtag, setaddtag] = useState();
  const [Docnamearray, setDocnameArray] = useState([]);
  const [headerval, setheaderval] = useState("");
  const [descval, setdescval] = useState("");
  const [customarray, setcustomarray] = useState([]);
  const [AddCustom, setAddCustom] = useState([]);
  // const [customvalidated, setcustomValidated] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [apicall, setapicall] = useState(false);

  const handleClose = () => {
    setShow(false);
    setaddvendordata({
      owner_name: "",
      shop_name: "",
      mobile: "",
      email: "",
      shop_address: "",
      gstn: "",
      geolocation: "",
      store_type: "",
      image: "",
      status: "",
      document_name: [],
      availability: "",
      social_media_links: [],
    });
    setnewImageUrls([]);
    // navigate("/");
  };

  // for close the reqest apporove model
  const handleClose1 = () => {
    setShow(false);
    setemailVal("")

  };

  const OnVendorDetail = () => {
    if (
      vendortoken === null ||
      vendortoken === "undefined" ||
      vendortoken === ""
    ) {
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/vendors`,
          {
            vendor_id: vendorid,
          },
          {
            headers: {
              vendor_token: vendortoken,
            },
          }
        )
        .then((response) => {
          setaddvendordata(response.data[0]);
          setFile("");
          setFileName("");
          setcustomarray(response.data[0].social_media_links);
          let strCopy = response.data[0].document_name.split(",");
          setDocnameArray(strCopy);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    OnVendorDetail();
  }, []);

  useEffect(() => {
    setaddvendordata({
      ...addvendordata,
      document_name: Docnamearray,
    });
  }, [Docnamearray]);

  // get the value of vendor input field
  const handleFormChange = (e) => {
    setCustomValidation(false);

    setaddvendordata({
      ...addvendordata,
      [e.target.name]: e.target.value,
    });
  };

  // onchange of add tag
  const onDocumentNamechange = (e) => {
    setAddTagError("");
    setaddtag(e.target.value);
  };

  const onDocuAddclick = (e) => {
    if (addtag === "") {
      setAddTagError("addTagErorrr");
    } else {
      setDocnameArray((Docnamearray) => [...Docnamearray, addtag]);
      setaddtag("");
      setAddTagError("");
    }
  };

  const DocuRemoveClick = (e) => {
    setDocnameArray(Docnamearray.filter((item) => item !== e));
  };
  const ImgFormChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  imgvalidate = fileName.split(".").pop();
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      const { name } = file;
      fileReader.addEventListener("load", () => {
        resolve({ name: name, base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const imguploadchange = async (e) => {
    // e.preventDefault()
    for (let i = 0; i < e.target.files.length; i++) {
      encoded = await convertToBase64(e.target.files[i]);
      const [first, ...rest] = encoded.base64.split(",");
      const [nameimg, ext] = encoded.name.split(".");
      console.log(first, nameimg)
      const vendorimg = rest.join("-");
      let imar = {
        vendor_id: `${vendorid}`,
        documents_name: `${encoded.name}${i}${vendorid}`,
        documents_position: `position${i}`,
        type_of_file: `${ext}`,
        img_64: vendorimg,
      };
      ImgObj.push(imar);
    }
    // image
    if (newImageUrls.length <= 5) {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/vendor_documents_upload`,
          ImgObj
        )
        .then((response) => {
          setapicall(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Cannot upload more than 6 image");
    }
  };

  const onImgRemove = (id, vendor_id) => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/vendor_document_delete`, {
        vendor_doc_id: `${id}`,
        vendor_id: `${vendor_id}`,
      })
      .then((response) => {
        onImgView(vendor_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    onImgView();
    // OnVendorDetail();
  }, [apicall]);
  const onImgView = () => {
    if (
      vendorid === null ||
      vendorid === "undefined" ||
      vendorid === "null" ||
      vendorid === undefined
    ) {
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/vendor_documents_get?vendor_id=${vendorid}`
        )
        .then((response) => {
          setnewImageUrls(response.data);
          setapicall(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  //img code end-------------------------------------------------------------------------------------------------
  // social media link
  const oncustomheadChange = (e) => {
    setSocialLink(false);
    setheaderval(e.target.value);
  };

  const oncustomdescChange = (e) => {
    setSocialLink(false);
    setdescval(e.target.value);
  };
  useEffect(() => {
    if (headerval !== "" && descval !== "") {
      setcustomarray((customarray) => [...customarray, AddCustom]);
      setheaderval("");
      setdescval("");
      setAddCustom("");
      // setcustomValidated(false);
      setsCall(false);
    }
  }, [scall]);

  // validation on social media link
  const handleAddClick = (e) => {
    if (headerval === "") {
      setSocialLink("HeaderBlank");
    } else if (descval === "") {
      setSocialLink("DesBlank");
    } else {
      let returnedTarget = Object.assign({}, { [headerval]: descval });
      setAddCustom(...AddCustom, returnedTarget);
      setsCall(true);
    }
  };

  const handleRemoveClick = (e) => {
    setcustomarray(customarray.filter((item) => item !== e));
  };

  useEffect(() => {
    setaddvendordata({
      ...addvendordata,
      testjson: customarray,
    });
  }, [customarray]);

  // end social media link

  const UpdateVendorClick = (e) => {
    e.preventDefault();

    if (addvendordata.owner_name === "" || addvendordata.owner_name === null) {
      setCustomValidation("ownernameEmpty");
    } else if (
      addvendordata.shop_name === "" ||
      addvendordata.shop_name === null
    ) {
      setCustomValidation("shopnameEmpty");
    } else if (addvendordata.mobile === "" || addvendordata.mobile === null) {
      setCustomValidation("MobileEmpty");
    } else if (
      addvendordata.mobile.length > 10 ||
      addvendordata.mobile.length < 10
    ) {
      setCustomValidation("10number");
    } else if (addvendordata.email === "" || addvendordata.email === null) {
      // var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
      var rst = /\S+@\S+\.\S+/.test(addvendordata.email);
      if (rst !== true) {
        setCustomValidation("EmailEmpty");
      }
      setCustomValidation("EmailEmpty");
    } else if (
      addvendordata.shop_address === "" ||
      addvendordata.shop_address === null
    ) {
      setCustomValidation("ShopAddressEmpty");
    } else if (addvendordata.gstn === "" || addvendordata.gstn === null) {
      setCustomValidation("GSTEmpty");
    } else if (
      addvendordata.store_type === "" ||
      addvendordata.store_type === null
    ) {
      setCustomValidation("storeTypeEmpty");
    } else if (
      addvendordata.geolocation === "" ||
      addvendordata.geolocation === null
    ) {
      setCustomValidation("GeolocationEmpty");
    } else if (
      imgvalidate === "jpg" ||
      imgvalidate === "jpeg" ||
      imgvalidate === "png" ||
      imgvalidate === ""
    ) {
      // e.stopPropagation();
      let x = [addvendordata.document_name];
      // e.preventDefault();
      const formData = new FormData();

      let socialname = addvendordata.testjson;
      let socialname_new = JSON.stringify(socialname);

      formData.append("id", vendorid);
      formData.append("image", file);
      formData.append("filename", fileName);
      formData.append("owner_name", addvendordata.owner_name);
      formData.append("shop_name", addvendordata.shop_name);
      formData.append("mobile", addvendordata.mobile);
      formData.append("email", emailVal);
      formData.append("shop_address", addvendordata.shop_address);
      formData.append("gstn", addvendordata.gstn);
      formData.append("geolocation", addvendordata.geolocation);
      formData.append("store_type", addvendordata.store_type);
      formData.append("availability", addvendordata.availability);
      formData.append("document_name", x);
      formData.append("status", "pending");
      formData.append("social_media_links", socialname_new);

      axios
        .put(`${process.env.REACT_APP_BASEURL}/vendor_update`, formData, {
          headers: {
            vendor_token: vendortoken,
          },
        })
        .then((response) => {
          let data = response.data;
          if (data.message === "Updated Vendor Profile") {
            setShow(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setCustomValidation("imgformat");
    }
  };
  return (
    <>
      <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block justify-content-center ">
        <Form
          className=""
          // validated={validated}
          // ref={formRef}
          onSubmit={(e) => UpdateVendorClick(e)}
        >
          <div className="row p-3 m-0">
            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              //  controlId="validationCustom01"
              >
                <Form.Label>
                  Owner Name <span className="text-danger">* </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Owner Name"
                  name={"owner_name"}
                  onChange={(e) => handleFormChange(e)}
                  value={addvendordata.owner_name}
                // required
                />
                {customValidation === "ownernameEmpty" ? (
                  <span className="text-danger">Please fill the Owner </span>
                ) : customValidation === false ? (
                  ""
                ) : null}
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              //  controlId="validationCustom02"
              >
                <Form.Label>
                  Shop Name <span className="text-danger">* </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Shop Name"
                  name={"shop_name"}
                  onChange={(e) => handleFormChange(e)}
                  value={addvendordata.shop_name}
                //  required
                />
                {customValidation === "shopnameEmpty" ? (
                  <span className="text-danger">Please fill the Shop name</span>
                ) : customValidation === false ? (
                  ""
                ) : null}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              //  controlId="validationCustom03"
              >
                <Form.Label>
                  Mobile <span className="text-danger">* </span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mobile"
                  name={"mobile"}
                  onChange={(e) => handleFormChange(e)}
                  value={addvendordata.mobile}
                // required
                />
                {customValidation === "MobileEmpty" ? (
                  <span className="text-danger">Please fill the Mobile </span>
                ) : customValidation === "10number" ? (
                  <span className="text-danger">
                    Mobile Number should not be greater then 10 and less than 10{" "}
                  </span>
                ) : customValidation === false ? (
                  ""
                ) : null}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              //  controlId="validationCustom04"
              >
                <Form.Label>
                  Email <span className="text-danger">* </span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name={"email"}
                  onChange={(e) => handleFormChange(e)}
                  value={addvendordata.email}
                // required
                />
                {customValidation === "EmailEmpty" ? (
                  <span className="text-danger">
                    Please fill the Email and valid email
                  </span>
                ) : customValidation === false ? (
                  ""
                ) : null}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              //  controlId="validationCustom05"
              >
                <Form.Label>
                  Shop Address <span className="text-danger">* </span>
                </Form.Label>
                <Form.Control
                  className="vendor_address"
                  as="textarea"
                  rows={3}
                  placeholder="Address"
                  name={"shop_address"}
                  onChange={(e) => handleFormChange(e)}
                  value={addvendordata.shop_address}
                // required
                />
                {customValidation === "ShopAddressEmpty" ? (
                  <span className="text-danger">
                    Please fill the Shop Address{" "}
                  </span>
                ) : customValidation === false ? (
                  ""
                ) : null}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              // controlId="validationCustom06"
              >
                <Form.Label>
                  GSTN <span className="text-danger">* </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="GSTN"
                  name={"gstn"}
                  onChange={(e) => handleFormChange(e)}
                  value={addvendordata.gstn}
                // required
                />
                {customValidation === "GSTEmpty" ? (
                  <span className="text-danger">Please fill the GST NO. </span>
                ) : customValidation === false ? (
                  ""
                ) : null}
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              // controlId="validationCustom06"
              >
                <Form.Label>Avaliable</Form.Label>
                <Form.Select
                  size="sm"
                  aria-label="Default select example"
                  onChange={(e) => handleFormChange(e)}
                  name="availability"
                >
                  <option
                    value=""
                    selected={addvendordata.availability === "" ? true : false}
                  >
                    Select
                  </option>
                  <option
                    value="close"
                    selected={
                      addvendordata.availability === "close" ? true : false
                    }
                  >
                    close
                  </option>
                  <option
                    value="update"
                    selected={
                      addvendordata.availability === "update" ? true : false
                    }
                  >
                    update
                  </option>
                  <option
                    value="block"
                    selected={
                      addvendordata.availability === "block" ? true : false
                    }
                  >
                    Block
                  </option>
                  <option
                    value="delete"
                    selected={
                      addvendordata.availability === "delete" ? true : false
                    }
                  >
                    Delete
                  </option>
                </Form.Select>
                {/* <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please fill gstn
                            </Form.Control.Feedback> */}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              // controlId="validationCustom06"
              >
                <Form.Label>
                  Store Type <span className="text-danger">* </span>
                </Form.Label>
                <Form.Select
                  size="sm"
                  aria-label="Default select example"
                  onChange={(e) => handleFormChange(e)}
                  name="store_type"
                  value={addvendordata.store_type}
                >
                  <option
                    value=""
                    selected={addvendordata.store_type === "" ? true : false}
                  >
                    Select
                  </option>
                  {(storetype.storetype || []).map((data, i) => {
                    return (
                      <option key={i} value={data}>
                        {data}
                      </option>
                    );
                  })}
                </Form.Select>
                {customValidation === "storeTypeEmpty" ? (
                  <span className="text-danger">
                    Please fill the Store type...
                  </span>
                ) : customValidation === false ? (
                  ""
                ) : null}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              // controlId="validationCustom07"
              >
                <Form.Label>
                  Geolocation <span className="text-danger">* </span>
                </Form.Label>
                <Form.Control
                  type="location"
                  placeholder="Geolocation"
                  name={"geolocation"}
                  onChange={(e) => handleFormChange(e)}
                  value={addvendordata.geolocation}
                // required
                />
                {customValidation === "GeolocationEmpty" ? (
                  <span className="text-danger">Please fill the Location </span>
                ) : customValidation === false ? (
                  ""
                ) : null}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              // controlId="validationCustom10"
              >
                <Form.Label>
                  Document Name <span className="text-danger">* </span>
                </Form.Label>
                <InputGroup className="" size="sm">
                  <Form.Control
                    onChange={(e) => onDocumentNamechange(e)}
                    value={addtag}
                    placeholder="document_name"
                    name={"document_name"}
                    onClick={(event) => {
                      if (event.key === "Enter") {
                        onDocuAddclick();
                      }
                    }}
                  />
                  <Button
                    variant="outline-success"
                    className="addcategoryicon"
                    onClick={() => onDocuAddclick()}
                    size="sm"
                  >
                    +
                  </Button>
                </InputGroup>
                {AddtagError === "addTagErorrr" ? (
                  <span className="text-danger">
                    Please Add Document first...!!!
                  </span>
                ) : null}

                {Docnamearray === undefined ||
                  Docnamearray === null ||
                  Docnamearray === "" ? null : (
                  <div className="d-flex align-items-center tagselectbox mt-2">
                    {Docnamearray.map((seotags, i) => {
                      return (
                        <>
                          <Badge className="tagselecttitle mb-0" bg="success">
                            {seotags === null || seotags === undefined
                              ? ""
                              : seotags}

                            <GiCancel
                              className=" mx-0 ms-1 btncancel"
                              onClick={() => DocuRemoveClick(seotags)}
                            />
                          </Badge>
                        </>
                      );
                    })}
                  </div>
                )}
              </Form.Group>
            </div>

            {/* social media links -------------------------------------------------------------------------*/}

            <div className="my-3 inputsection_box">
              <h5 className="m-0">Add Social Media Link</h5>
              <div className=" mt-0 mb-3">
                <Table className="align-middle">
                  <thead>
                    <tr>
                      <th>Social Media</th>
                      <th>Link</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center col-4">
                        <InputGroup className="">
                          <Form.Control
                            value={headerval}
                            type="text"
                            sm="9"
                            min={"1"}
                            onChange={oncustomheadChange}
                            name={"header"}
                          />
                        </InputGroup>
                      </td>
                      <td className="col-4">
                        <InputGroup className="">
                          <Form.Control
                            value={descval}
                            name={"description"}
                            type="text"
                            sm="9"
                            min={"1"}
                            onChange={oncustomdescChange}
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                handleAddClick();
                              }
                            }}
                          />
                        </InputGroup>
                      </td>
                      <td className="">
                        <Button
                          variant="outline-success"
                          className="addcategoryicon"
                          onClick={() => handleAddClick()}
                          size="sm"
                        >
                          +
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {SocialLink === "HeaderBlank" ? (
                          <span className="text-danger">
                            {" "}
                            Please Fill ..!!{" "}
                          </span>
                        ) : SocialLink === false ? (
                          ""
                        ) : null}
                      </td>
                      <td>
                        {" "}
                        {SocialLink === "DesBlank" ? (
                          <span className="text-danger"> Please Fill..!! </span>
                        ) : SocialLink === false ? (
                          ""
                        ) : null}
                      </td>
                    </tr>
                    {customarray
                      ? (customarray || []).map((variantdata, i) => {
                        let v = JSON.stringify(variantdata);
                        let st = v.split(":");
                        let pro = st[0].replace(/[{}]/g, "");
                        let link = st[1].replace(/[{}]/g, "");

                        return (
                          <tr className="">
                            <td className=" text-center">
                              <InputGroup className="">
                                <Form.Control
                                  value={JSON.parse(pro)}
                                  type="text"
                                  sm="9"
                                  min={"1"}
                                  onChange={oncustomheadChange}
                                  name={"custom_input_header"}
                                  required
                                />
                              </InputGroup>
                            </td>
                            <td className="text-center">
                              <InputGroup className="">
                                <Form.Control
                                  required
                                  value={JSON.parse(link)}
                                  name={"custom_input_desc"}
                                  type="text"
                                  sm="9"
                                  min={"1"}
                                  onChange={oncustomdescChange}
                                  onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                      handleAddClick();
                                    }
                                  }}
                                />
                              </InputGroup>
                            </td>
                            <td className="">
                              <Button
                                variant="text-danger"
                                className="addcategoryicon text-danger"
                                onClick={() => handleRemoveClick(variantdata)}
                                size="sm"
                              >
                                &times;
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                      : null}
                  </tbody>
                </Table>
              </div>
              {/* );
                })} */}
              {/* --------------------------------------------- */}
            </div>
            {/* end social media link */}
            <div classImg="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              // controlId="validationCustom08"
              >
                <Form.Label>
                  Shop Logo <b>(In .jpg, .jpeg, .png format)</b>
                </Form.Label>
                <Form.Control
                  onChange={(e) => ImgFormChange(e)}
                  type="file"
                  placeholder="Shop_logo"
                  name={"shop_logo"}
                  accept=".png, .jpg, .jpeg"
                />
                {customValidation === "imgformat" ? (
                  <p className="text-danger mx-2">
                    {"Please Select Correct Image Format"}
                  </p>
                ) : null}
                {addvendordata.shop_logo ? (
                  <img src={addvendordata.shop_logo} alt="" width={"50px"} />
                ) : null}
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group
                className="mb-3 aos_input"
              //  controlId="validationCustom09"
              >
                <Form.Label>Documents Upload </Form.Label>
                <Form.Control
                  multiple
                  type="file"
                  placeholder="multiple document upload"
                  name={"img_64"}
                  onChange={(e) => imguploadchange(e)}
                />
              </Form.Group>
            </div>
            <Table className="vendordoc_image_table">
              <tbody className="vendordoc_image_table_body">
                {newImageUrls ? (
                  <tr className="d-flex flex-wrap">
                    {(newImageUrls || []).map((imgg, i) => {
                      return (
                        <td className="imgprivew_box">
                          <img
                            src={imgg.documents_path}
                            key={i}
                            alt="apna_organic"
                            width={80}
                            height={100}
                          />
                          <span
                            className="cross_icon"
                            onClick={() =>
                              onImgRemove(imgg.vendor_doc_id, imgg.vendor_id)
                            }
                          >
                            X
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ) : null}
              </tbody>
            </Table>
          </div>

          <button className={"mx-4 btn btn-success"} type={"submit"}>
            {"Update Vendor"}
          </button>
        </Form>
      </div>

      <Modal show={show} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Message for vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body> Your Request now Pending wait for approval!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default VendorUpdate;
