import React, { useState, useRef } from "react";
// import Input from "../common/input";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SAlert from "../common/salert";
// import logo from "../../../images/logo.png";
// import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import Iconbutton from "../common/iconbutton";
import axios from "axios";
import { Badge, Button, InputGroup, Table } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import storetype from "../json/storetype";
import status from "../json/Status";
import Loader from "../common/loader";

const VendorsList = () => {

  const token = localStorage.getItem("token");
  const [AddtagError, setAddTagError] = useState("");
  const [SocialLink, setSocialLink] = useState(false);
  const formRef = useRef();
  const [newImageUrls, setnewImageUrls] = useState([]);
  const [customValidation, setCustomValidation] = useState(false);
  const [show, setShow] = useState("");
  const [docsshow, setDocsShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendordata, setvendordata] = useState([]);
  const [file, setFile] = useState();
  // const [fileDoc, setFileDoc] = useState();
  // const [fileDocName, setFileDocName] = useState("");
  const [call, setCall] = useState(false);
  console.log(call)
  const [scall, setsCall] = useState(false);
  const [AddAlert, setAddAlert] = useState(false);
  const [ErrorAddAlert, setErrorAddAlert] = useState(false);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [ErrorUpdateAlert, setErrorUpdateAlert] = useState(false);
  const [docerror, setDocerror] = useState("");
  const [fileName, setFileName] = useState("");
  const vendorObject = {
    owner_name: "",
    shop_name: "",
    mobile: "",
    email: "",
    shop_address: "",
    gstn: "",
    geolocation: "",
    store_type: "",
    image: "",
    status: "active",
    document_name: [],
    availability: "",
    social_media_links: [],
  };
  const [vendorID, setVendorId] = useState("");
  const [addvendordata, setaddvendordata] = useState(vendorObject);
  const [changstatus, setchangstatus] = useState("");
  console.log(changstatus)
  const [apicall, setapicall] = useState(false);
  const [addtag, setaddtag] = useState();
  const [Docnamearray, setDocnameArray] = useState([]);
  const [headerval, setheaderval] = useState("");
  const [descval, setdescval] = useState("");
  const [customarray, setcustomarray] = useState([]);
  const [AddCustom, setAddCustom] = useState([]);
  // const [customvalidated, setcustomValidated] = useState(false);
  const [searchdata, setsearchData] = useState({
    status: "",
    store_type: "",
    owner_name: "",
  });
  let encoded;
  let ImgObj = [];
  // let docuarr;
  var imgvalidate;

  let admintoken = localStorage.getItem("token");
  const closeAddAlert = () => {
    setLoading(false);
    setAddAlert(false);
  };
  const closeUpdateAlert = () => {
    setLoading(false);
    setUpdateAlert(false);
    setErrorUpdateAlert(false);
    setErrorAddAlert(false);
    setShow(false);
  };
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    if (searchdata.owner_name) {
      setapicall(true);
    }
  };

  const onSearchClick = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/vendor_list`,
        {
          owner_name: `${searchdata.owner_name}`,
          store_type: `${searchdata.store_type}`,
          status: `${searchdata.status}`,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setvendordata(response.data);
        setLoading(false);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //To reset the search feild blank :-

  const OnReset = () => {
    setsearchData({ owner_name: "", store_type: "", status: "" });
    setapicall(true);
  };

  const columns = [
    {
      name: "ID",
      width: "60px",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Shop Logo",
      width: "120px",
      center: true,
      cell: (row) => (
        <>
          <img
            height="90px"
            width="75px"
            alt={row.owner_name}
            src={
              row.shop_logo === "" || row.shop_logo === "no image"
                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                : row.shop_logo
            }
            style={{
              borderRadius: 10,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "right",
            }}
            onClick={() => handleClick()}
          />
        </>
      ),
    },
    {
      name: "Shop Name",
      width: "120px",
      selector: (row) => (
        <p className="m-0">
          {row.shop_name}
          <br />
          <b>Profile:</b>{" "}
          {row.id == null ||
            row.owner_name == null ||
            row.shop_name == null ||
            row.mobile == null ||
            row.email == null ||
            row.shop_address == null ||
            row.gstn == null ||
            row.geolocation == null ||
            row.store_type == null ||
            row.document_name == null ||
            row.social_media_links == null ||
            row.shop_logo == null ? (
            <span className="text-danger">
              <b>Not Complete</b>
            </span>
          ) : (
            <span className="text-success">
              <b>Complete</b>
            </span>
          )}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Owner Name",
      selector: (row) => row.owner_name,
      sortable: true,
    },
    {
      name: "Store Type",
      selector: (row) => row.store_type,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.shop_address,
      sortable: true,
      center: true,
    },
    {
      name: "Contact",
      selector: (row) => row.mobile,
      sortable: true,
      center: true,
    },

    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.status === "pending"
              ? "badge bg-warning"
              : row.status === "approved"
                ? "badge bg-success"
                : row.status === "blocked"
                  ? "badge bg-danger"
                  : row.status === "in progress"
                    ? "badge bg-primary"
                    : row.status === "incomplete"
                      ? "badge bg-info"
                      : row.status === "return"
                        ? "badge bg-secondary"
                        : "badge bg-dark"
          }
        >
          {row.status === "pending"
            ? "Pending"
            : row.status === "approved"
              ? "Approved"
              : row.status === "blocked"
                ? "Blocked"
                : row.status === "in progress"
                  ? "In Progress"
                  : row.status === "incomplete"
                    ? "In Complete"
                    : row.status === "return"
                      ? "Return"
                      : "return"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Group className="" controlId="formBasicEmail">
          <Form.Select
            size="sm"
            aria-label="Search By status"
            onChange={(e) => handleStatusChnage(e, row.id)}
            name="status"
            value={row.status}
          >
            <option value={""}>Status</option>
            {(status.vendorestatus || []).map((data, i) => {
              return (
                <option value={data} key={i}>
                  {" "}
                  {data}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      ),
      sortable: true,
      center: true,
    },

    {
      name: "Add Docs",
      selector: (row) => (
        <Button size="sm" onClick={handleDocsShow.bind(this, row.id)}>
          Add Docs
        </Button>
        // : null
        /*: null*/
        /*: null*/
        /*: null*/
        /*: null*/
        /*: null*/
        /*: null*/
       /*: null*/),
      sortable: true,
    },
    {
      name: "ACTION",
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(this, row.id)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/vendors`,
        {
          vendor_id: "all",
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        setvendordata(response.data);
        setLoading(false);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall]);

  useEffect(() => {
    setaddvendordata({
      ...addvendordata,
      document_name: Docnamearray,
    });
  }, [Docnamearray]);
  console.log("SHOWWW+" + Docnamearray)
  const handleFormChange = (e) => {
    setCustomValidation(false);
    setaddvendordata({
      ...addvendordata,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = (e) => {
    // formRef.current.reset();
    // e.preventDefault();

    // setLoading(false);
    setCustomValidation(false);
    setSocialLink(false);
    setcustomarray([]);
    setAddTagError("");
    setaddtag("");
    setaddvendordata(vendorObject);
    setDocnameArray("");
    setapicall(true);
    setShow(false);
  };

  const handleShow = (e) => {
    setLoading(false);
    setCustomValidation(false);
    setAddTagError("");
    setaddtag("");
    setDocnameArray("");

    if (e === "add") {
      setShow(e);
    }
    if (e !== "add") {
      setCall(true);

      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/vendors`,
          {
            vendor_id: e,
            addvendordata,
          },
          {
            headers: {
              admin_token: token,
            },
          }
        )
        .then((response) => {
          setaddvendordata(response.data[0]);

          setFile("");
          setFileName("");

          setcustomarray(response.data[0].social_media_links);
          let strCopy = response.data[0].document_name.split(",");
          console.log("" + strCopy)
          setDocnameArray(strCopy);
          setapicall(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      setShow(e);
    }
  };

  const onDocumentNamechange = (e) => {
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
  // const CreateTimeout = () => {
  //   setCondition(false);
  // };

  const DocuRemoveClick = (e) => {
    setDocnameArray(Docnamearray.filter((item) => item !== e));
  };
  // const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);

  const handleStatusChnage = (e, id) => {
    setchangstatus(e.target.value);
    // setTimeout(CreateTimeout, 50000);
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BASEURL_0}/vendor_status_change`,
        {
          status_change: e.target.value,
          id: `${id}`,
        },
        {
          headers: {
            admin_token: token,
          },
        }
      )
      .then((response) => {
        // setLoading(false);
        // setapicall(true);
        if (
          response.data.status_message === "vendor status change succesfully "
        ) {
          setLoading(false);
          setapicall(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const ImgFormChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  imgvalidate = fileName.split(".").pop();

  //img code start-----------------------------------------------------------------------------------------------

  const handleDocsShow = (id) => {
    setVendorId(id);
    setDocsShow(true);
    onImgView(id);
  };
  const handleDocsClose = (e) => {
    e.preventDefault();
    setDocsShow(false);
  };

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
    if (e.target.files.length <= 5) {
      // e.preventDefault()

      for (let i = 0; i < e.target.files.length; i++) {
        encoded = await convertToBase64(e.target.files[i]);

        const [first, ...rest] = encoded.base64.split(",");
        const [nameimg, ext] = encoded.name.split(".");
        console.log(first, nameimg)
        const vendorimg = rest.join("-");
        let imar = {
          vendor_id: `${vendorID}`,
          documents_name: `${encoded.name}${i}${vendorID}`,
          documents_position: `position${i}`,
          type_of_file: `${ext}`,
          img_64: vendorimg,
        };
        if (
          ext === "jpeg" ||
          ext === "jpg" ||
          ext === "png" ||
          ext === "pdf" ||
          ext === ""
        ) {
          ImgObj.push(imar);
        } else {
          setDocerror("This image / document is not accetable");
        }
      }

      if (newImageUrls.length <= 5) {
        axios
          .post(
            `${process.env.REACT_APP_BASEURL_0}/vendor_documents_upload`,
            ImgObj, {
            headers: { admin_token: `${token}` },
          }
          )
          .then((response) => {
            onImgView(vendorID);
            setDocerror("");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Cannot More than 6 picss");
      }
    } else {
      alert("Cannot More than 6 pics");
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

  const onImgView = (vendorID) => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL_0}/vendor_documents_get?vendor_id=${vendorID}`, {
        headers: { admin_token: `${token}` },
      }
      )
      .then((response) => {
        setnewImageUrls(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //img code end-------------------------------------------------------------------------------------------------

  // let returnarr = [];
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

  // }

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

  // let shoplogo = `${process.env.REACT_APP_BASEURL}/${addvendordata.shop_logo}`;
  const handleClick = () => { };

  const AddVendorClick = (e) => {
    e.preventDefault();

    if (addvendordata.owner_name === "") {
      setCustomValidation("ownernameEmpty");
    } else if (addvendordata.shop_name === "") {
      setCustomValidation("shopnameEmpty");
    } else if (addvendordata.mobile === "") {
      setCustomValidation("MobileEmpty");
    } else if (
      addvendordata.mobile.length > 10 ||
      addvendordata.mobile.length < 10
    ) {
      setCustomValidation("10number");
    } else if (addvendordata.email === "") {
      // var regex = /^([a-zA-Z0-9_.+-])+(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
      var rst = /\S+@\S+\.\S+/.test(addvendordata.email);
      if (rst !== true) {
        setCustomValidation("EmailEmpty");
      }
      setCustomValidation("EmailEmpty");
    } else if (addvendordata.shop_address === "") {
      setCustomValidation("ShopAddressEmpty");
    } else if (addvendordata.gstn === "") {
      setCustomValidation("GSTEmpty");
    } else if (addvendordata.store_type === "") {
      setCustomValidation("storeTypeEmpty");
    } else if (addvendordata.geolocation === "") {
      setCustomValidation("GeolocationEmpty");
    } else if (
      imgvalidate === "jpg" ||
      imgvalidate === "jpeg" ||
      imgvalidate === "png" ||
      imgvalidate === ""
    ) {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      let x = [addvendordata.document_name];
      let socialname = addvendordata.testjson;
      let socialname_new = JSON.stringify(socialname);

      formData.append("image", file);
      formData.append("filename", fileName);
      formData.append("owner_name", addvendordata.owner_name);
      formData.append("shop_name", addvendordata.shop_name);
      formData.append("mobile", addvendordata.mobile);
      formData.append("email", addvendordata.email);
      formData.append("shop_address", addvendordata.shop_address);
      formData.append("gstn", addvendordata.gstn);
      formData.append("geolocation", addvendordata.geolocation);
      formData.append("store_type", addvendordata.store_type);
      formData.append("availability", addvendordata.availability);
      formData.append("document_name", x);
      formData.append("status", addvendordata.status);
      formData.append("social_media_links", socialname_new);

      axios
        .post(`${process.env.REACT_APP_BASEURL}/vendor_register`, formData, {
          headers: {
            admin_token: admintoken,
          },
        })
        .then((response) => {
          if (response.data.message === "vendor already exist") {
            setCustomValidation("alreadyexist");
            setLoading(false);
          } else if (
            response.data.message === "Sent mail to super_admin Succesfully"
          ) {
            setapicall(true);
            setShow(false);
            setAddAlert(true);
            setLoading(false);
            setaddvendordata(vendorObject);
            setCustomValidation(false);
            setcustomarray([]);
            setAddTagError("");
            setaddtag("");

            setDocnameArray("");
          }
        })
        .catch(function (error) {
          setLoading(false);
          setErrorAddAlert(true);
          console.log(error);
        });
    } else {
      setCustomValidation("imgformat");

      // formRef.current.reset();
    }

    // }
  };

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
      // var regex = /^([a-zA-Z0-9_.+-])+(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
      // /\S+@\S+\.\S+/.test(value)


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
      setLoading(true);
      let x = [addvendordata.document_name];

      const formData = new FormData();

      let socialname = addvendordata.testjson;
      let socialname_new = JSON.stringify(socialname);
      formData.append("vendor_id", addvendordata.id);
      formData.append("image", file);
      formData.append("filename", fileName);
      formData.append("owner_name", addvendordata.owner_name);
      formData.append("shop_name", addvendordata.shop_name);
      formData.append("mobile", addvendordata.mobile);
      formData.append("email", addvendordata.email);
      formData.append("shop_address", addvendordata.shop_address);
      formData.append("gstn", addvendordata.gstn);
      formData.append("geolocation", addvendordata.geolocation);
      formData.append("store_type", addvendordata.store_type);
      formData.append("availability", addvendordata.availability);
      formData.append("document_name", x);
      formData.append("status", "active");
      formData.append("social_media_links", socialname_new);

      axios
        .put(`${process.env.REACT_APP_BASEURL_0}/vendor_update`, formData, {
          headers: {
            admin_token: token,
          },
        })
        .then((response) => {
          let data = response.data;
          if (data.response === "header error") {
            setLoading(false);
          } else if (response.data.message === "Updated Vendor Profile") {
            setUpdateAlert(true);
            setLoading(false);
            setapicall(true);
            setShow(false);
            setaddvendordata(vendorObject);
          }
        })
        .catch(function (error) {
          setErrorUpdateAlert(true);
          console.log(error);
        });
    } else {
      setCustomValidation("imgformat");
    }
  };

  return (
    <>
      {loading === true ? <Loader /> : null}
      <div>
        <h2>Vendors List</h2>

        {/* search bar */}
        <div className="card p-3">
          <div className="row page_searchbox">
            <div className="col-md-3 col-sm-6 aos_input">
              <input
                type={"text"}
                placeholder={"Search by Owner Name"}
                onChange={OnSearchChange}
                name="owner_name"
                value={searchdata.owner_name}
                className={"adminsideinput"}
              />
            </div>
            <div className="col-md-3 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by Status"
                className="adminselectbox"
                onChange={OnSearchChange}
                name="status"
                value={searchdata.status}
              >
                <option value={""}>Status</option>
                {(status.vendorestatus || []).map((data, i) => {
                  return (
                    <option value={data} key={i}>
                      {" "}
                      {data}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by Store Type"
                className="adminselectbox"
                onChange={OnSearchChange}
                name="store_type"
                value={searchdata.store_type}
              >
                <option value={""}>Store Type</option>
                {(storetype.storetype || []).map((data, i) => {
                  return (
                    <option key={i} value={data}>
                      {data}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6 aos_input">
              <button
                className="button main_button w-100"
                onClick={() => onSearchClick()}
              >
                Search
              </button>
            </div>
            <div className="col-md-3 col-sm-6 aos_input mt-2">
              <button
                className="button main_button w-100"
                onClick={() => OnReset()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="product_page_uploadbox my-4">
            <button
              className="button main_button ml-auto"
              onClick={() => handleShow("add")}
            >
              Add New Shop
            </button>
          </div>
          <DataTable
            columns={columns}
            className="main_data_table"
            data={vendordata}
            pagination
            highlightOnHover
            pointerOnHover
          />
          <SAlert
            show={Alert}
            title="Vender"
            text="Are you Sure you want to delete"
            onConfirm={hideAlert}
            showCancelButton={true}
            onCancel={hideAlert}
          />
        </div>
        <Modal size="lg" show={show} onHide={() => handleClose()}>
          {loading === true ? (
            <Loader />
          ) : (
            <Form
              className=""
              // noValidate
              // validated={validated}
              // ref={formRef}
              onSubmit={
                show === "add"
                  ? (e) => AddVendorClick(e)
                  : (e) => UpdateVendorClick(e)
              }
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {show === "add" ? "Add New Vendor " : " Update Vendor "}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row p-3 m-0">
                  <div className="col-md-6">
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>
                        Owner Name <span className="text-danger">* </span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => handleFormChange(e)}
                        value={addvendordata.owner_name}
                        // required
                        type="text"
                        placeholder="Owner Name"
                        name={"owner_name"}
                      />
                      {customValidation === "ownernameEmpty" ? (
                        <span className="text-danger">
                          Please fill the Owner{" "}
                        </span>
                      ) : customValidation === false ? (
                        ""
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>
                        Shop Name <span className="text-danger">* </span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => handleFormChange(e)}
                        value={addvendordata.shop_name}
                        // required
                        type="text"
                        placeholder="Shop Name"
                        name={"shop_name"}
                      />
                      {customValidation === "shopnameEmpty" ? (
                        <span className="text-danger">
                          Please fill the Shop name
                        </span>
                      ) : customValidation === false ? (
                        ""
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>
                        Mobile <span className="text-danger">* </span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => handleFormChange(e)}
                        value={addvendordata.mobile}
                        // required
                        type="number"
                        // min={1}
                        placeholder="Mobile"
                        name={"mobile"}
                      // maxLength={10}
                      // minLength={10}
                      />
                      {customValidation === "MobileEmpty" ? (
                        <span className="text-danger">
                          Please fill the Mobile{" "}
                        </span>
                      ) : customValidation === "10number" ? (
                        <span className="text-danger">
                          Mobile Number should not be greater then 10 and less
                          than 10{" "}
                        </span>
                      ) : customValidation === false ? (
                        ""
                      ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>
                        Email <span className="text-danger">* </span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => handleFormChange(e)}
                        value={addvendordata.email}
                        // required
                        type="email"
                        placeholder="Email"
                        disabled={show === "add" ? false : true}
                        name={"email"}
                      />
                      {/* {customValidation === "alreadyexist" ? (
                    <p className="text-danger mx-2">
                      {"Vendore Already Exist"}
                    </p>
                  ) : null} */}

                      {customValidation === "EmailEmpty" ? (
                        <span className="text-danger">
                          Please fill the Email and valid email
                        </span>
                      ) : customValidation === "alreadyexist" ? (
                        <span className="text-danger">
                          Vendore Already Exist
                        </span>
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>
                        Shop Address <span className="text-danger">* </span>{" "}
                      </Form.Label>
                      <Form.Control
                        className="vendor_address"
                        as="textarea"
                        rows={3}
                        id={"address"}
                        placeholder="Address"
                        name={"shop_address"}
                        onChange={(e) => handleFormChange(e)}
                        value={addvendordata.shop_address}
                        // required
                        maxLength={100}
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
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>
                        GSTN <span className="text-danger">* </span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => handleFormChange(e)}
                        value={addvendordata.gstn}
                        // required
                        type="text"
                        placeholder="GSTN"
                        name={"gstn"}
                      />
                      {customValidation === "GSTEmpty" ? (
                        <span className="text-danger">
                          Please fill the GST NO.{" "}
                        </span>
                      ) : customValidation === false ? (
                        ""
                      ) : null}
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>Avaliable</Form.Label>
                      <Form.Select
                        size="sm"
                        aria-label="Default select example"
                        onChange={(e) => handleFormChange(e)}
                        name="availability"
                      >
                        <option
                          value=""
                          selected={
                            addvendordata.availability === "" ? true : false
                          }
                        >
                          Select
                        </option>
                        <option
                          value="close"
                          selected={
                            addvendordata.availability === "close"
                              ? true
                              : false
                          }
                        >
                          close
                        </option>
                        <option
                          value="update"
                          selected={
                            addvendordata.availability === "update"
                              ? true
                              : false
                          }
                        >
                          update
                        </option>
                        <option
                          value="block"
                          selected={
                            addvendordata.availability === "block"
                              ? true
                              : false
                          }
                        >
                          Block
                        </option>
                        <option
                          value="delete"
                          selected={
                            addvendordata.availability === "delete"
                              ? true
                              : false
                          }
                        >
                          Delete
                        </option>
                      </Form.Select>
                      {/* <Form.Control.Feedback type="invalid" className="h6">
                    Please fill gstn
                  </Form.Control.Feedback> */}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>
                        Store Type <span className="text-danger">* </span>
                      </Form.Label>
                      <Form.Select
                        // required
                        size="sm"
                        aria-label="Default select example"
                        onChange={(e) => handleFormChange(e)}
                        name="store_type"
                        value={addvendordata.store_type}
                      >
                        <option
                          value=""
                          selected={
                            addvendordata.store_type === "" ? true : false
                          }
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
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>
                        Geolocation <span className="text-danger">* </span>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => handleFormChange(e)}
                        // required
                        type="location"
                        placeholder="Geolocation"
                        name={"geolocation"}
                        value={addvendordata.geolocation}
                      />
                      {customValidation === "GeolocationEmpty" ? (
                        <span className="text-danger">
                          Please fill the Location{" "}
                        </span>
                      ) : customValidation === false ? (
                        ""
                      ) : null}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3 aos_input">
                      <Form.Label>Document Name</Form.Label>
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
                        />{" "}
                        <Button
                          variant="outline-success"
                          className="addcategoryicon"
                          onClick={() => onDocuAddclick()}
                          size="sm"
                        >
                          +
                        </Button>
                        {AddtagError === "addTagErorrr" ? (
                          <span className="text-danger">
                            Please Add Document first...!!!
                          </span>
                        ) : null}
                      </InputGroup>

                      {Docnamearray === undefined ||
                        Docnamearray === null ||
                        Docnamearray === "" ||
                        Docnamearray.length === 0 ? null : (
                        <div className="d-flex align-items-center tagselectbox mt-2">
                          {(Docnamearray || []).map((seotags, i) => {
                            return (
                              <>
                                {seotags === '""' ? null : (
                                  <Badge
                                    className="tagselecttitle mb-0"
                                    bg="success"
                                  >
                                    {seotags === null ||
                                      seotags === undefined ||
                                      seotags === '""'
                                      ? null
                                      : seotags}

                                    <GiCancel
                                      className=" mx-0 ms-1 btncancel"
                                      onClick={() => DocuRemoveClick(seotags)}
                                    />
                                  </Badge>
                                )}
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
                                <span className="text-danger">
                                  {" "}
                                  Please Fill..!!{" "}
                                </span>
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
                                      onClick={() =>
                                        handleRemoveClick(variantdata)
                                      }
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
                  <div className="col-md-6">
                    <Form.Group
                      className="mb-3 aos_input"
                      controlId="validationCustom08"
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
                        <img
                          src={addvendordata.shop_logo}
                          alt="newimg"
                          width={"50px"}
                        />
                      ) : null}
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please upload document
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="button main_outline_button"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>

                <Iconbutton
                  type={"submit"}
                  btntext={show === "add" ? "Add Vendor" : "Update Vendor"}
                  // onClick={(show === 'add' ? AddVendorClick : UpdateVendorClick(show))}
                  btnclass={"button main_button "}
                />
              </Modal.Footer>
            </Form>
          )}
        </Modal>

        {/*   Add Docs model */}

        <Modal
          size="lg"
          show={docsshow}
          onHide={(e) => {
            handleDocsClose(e);
          }}
        >
          <Form ref={formRef}>
            <Modal.Header>
              <Modal.Title>Add Images and Documents</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row ">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="validationCustom09"
                  >
                    <Form.Label>
                      Documents Upload (In .jpg, .jpeg, .png , .pdf format){" "}
                    </Form.Label>
                    <Form.Control
                      multiple
                      type="file"
                      placeholder="multiple document upload"
                      name={"img_64"}
                      accept="image/png,image/jpeg,image/jpg,document/pdf"
                      onChange={(e) => imguploadchange(e)}
                    />
                  </Form.Group>
                  <small className="text-danger">{docerror}</small>
                </div>
              </div>
              <Table>
                <tbody>
                  {newImageUrls ? (
                    <tr className="d-flex flex-wrap">
                      {newImageUrls.map((imgg, i) => {
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
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button main_outline_button"
                onClick={(e) => handleDocsClose(e)}
              >
                Cancel
              </button>
            </Modal.Footer>
          </Form>
        </Modal>

        <SAlert
          show={AddAlert}
          title=" Vender Added Successfully "
          onConfirm={closeAddAlert}
        />
        <SAlert
          show={UpdateAlert}
          title=" Vender Updated Successfully "
          onConfirm={closeUpdateAlert}
        />
        <SAlert
          show={ErrorUpdateAlert}
          title=" Vender Not Updated  "
          onConfirm={closeUpdateAlert}
        />
        <SAlert
          show={ErrorAddAlert}
          title=" Vender Not Added...!!!  "
          onConfirm={closeUpdateAlert}
        />

        {/* /End add docs model/ */}
      </div>
    </>
  );
};

export default VendorsList;
