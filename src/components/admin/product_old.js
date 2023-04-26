import React, { useEffect, useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Input from "./common/input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Badge } from "react-bootstrap";
import MainButton from "./common/button";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "./common/iconbutton";
import { MdOutlineEdit } from "react-icons/md";
import InputGroup from "react-bootstrap/InputGroup";
import VariationJson from "./json/variation";
import Table from "react-bootstrap/Table";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlinePlus, AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import moment from "moment/moment";

function Product_Old() {
  const [pdata, setpdata] = useState([]);
  const [proddata, setproddata] = useState([]);
  const [variantid, setvariantid] = useState("");
  const [productid, setproductid] = useState("");
  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [variantapicall, setvariantapicall] = useState(false);
  const [varietyshow, setvarietyShow] = useState(false);
  const [addtag, setaddtag] = useState();
  const [validated, setValidated] = useState(false);
  const [customvalidated, setcustomValidated] = useState(false);
  const [modalshow, setmodalshow] = useState(false);
  const [seoarray, setseoArray] = useState([]);
  const [varietyval, setvarietyval] = useState("");
  const [variantarray, setvariantarray] = useState({
    product_status: "1",
    product_id: "",
    unit: "",
    colors: "",
    unit_quantity: "",
    size: "",
    product_price: "",
    mrp: "",
    sale_price: "",
    discount: "",
    special_offer: false,
    featured_product: false,
    manufacturing_date: "",
    expire_date: "",
    quantity: "",
  });
  const [variantmainarray, setvariantmainarray] = useState([]);
  const [data1, setdata1] = useState("");
  const [otherintro, setotherintro] = useState("");
  const [headerval, setheaderval] = useState("");
  const [descval, setdescval] = useState("");
  const [customarray, setcustomarray] = useState([]);
  const [vdata, setvdata] = useState([]);
  const [productdata, setproductdata] = useState({
    add_custom_input: "",
    product_title_name: "",
    product_slug: "",
    store_name: "",
    product_type: "",
    category: "",
    parent_category: "",
    wholesale_sales_tax: "",
    manufacturing_date: "",
    expire_date: "",
    seo_tag: "",
    variety: false,
    product_description: "",
    other_introduction: "",
    is_active: "0",
  });
  const mainformRef = useRef();
  const formRef = useRef();
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    category: "",
    status: "",
  });

  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios
      .post("${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400", {
        product_search: {
          search: `${searchdata.product_title_name}`,
          category: `${searchdata.category}`,
          status: `${searchdata.status}`,
          // "is_delete":"no",
        },
      })
      .then((response) => {
        setpdata(response.data);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall, searchdata, Alert]);

  //
  let filtered;
  const handleAlert = (id) => {
    setvariantid(id[0]);
    setproductid(id[1]);
    setAlert(true);
  };
  const hideAlert = () => {
    axios
      .put("${process.env.REACT_APP_BASEURL}/products_delete", {
        varient_id: `${variantid}`,
        product_id: `${productid}`,
        is_delete: "0",
      })
      .then((response) => {
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    setAlert(false);
  };

  //  json
  var varietyy = VariationJson;

  const columns = [
    {
      name: "#",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          // height="90px"
          // width="75px"
          alt={"apna_organic"}
          src={row.id}
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight: "100px",
            maxWidth: "100px",
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => (
        <div>
          <p
            className="mb-1"
            onClick={() => {
              navigate("/productdetail");
            }}
          >
            <b>
              {row.product_title_name}
              <br />
              SKU: {row.product_id} <br />
              <div
                dangerouslySetInnerHTML={{ __html: pdata.product_description }}
                className="editor"
              ></div>
            </b>
          </p>
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "160px",
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Gst",
      selector: (row) => row.gst,
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Stock",
      selector: (row) => row.quantity,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.status == 1
              ? "badge bg-success"
              : row.status == 2
                ? "badge bg-danger"
                : "badge bg-secondary"
          }
        >
          {row.status == 1
            ? "Pending"
            : row.status == 2
              ? "Inactive"
              : "Draft"}
        </span>
      ),
      sortable: true,
      width: "115px",
      // center: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          value={row.status}
          className="w-100"
          onChange={undefined}
        >
          <option value="">Select</option>
          <option value="1">Pending</option>
          <option value="2">Draft</option>
          <option value="3">Expired</option>
          <option value="4">Special Offer</option>
          <option value="5">Featured Offer </option>
          <option value="6">Promotional </option>
        </Form.Select>
      ),
      sortable: true,
    },
    {
      name: "Variety",
      selector: (row) => (
        // (row.variety) ?
        <Button
          size="sm"
          onClick={handlevarietyShow.bind(this, row.product_id)}
        >
          Add Variety
        </Button>
        // : null
      ),
      sortable: true,
    },
    {
      name: "Action",
      width: "110px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(this, row.product_id)}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, [
              row.id,
              row.product_id,
              row.is_delete,
            ])}
          />
        </div>
      ),
    },
  ];

  // modal

  const handleShow = (e) => {
    if (e === "add") {
      setmodalshow(e);
    } else {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/product?id=${e}`)
        .then((response) => {
          setproductdata(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // setpdata(pdata[e])
      // setseoArray(pdata[e].seo_tag)
      setmodalshow(e);
      setvariantapicall(false);
    }
  };
  useEffect(() => {
    handleShow();
  }, [variantapicall]);
  const handlevarietyShow = (id) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`, {
        product_search: {
          search: "",
          product_id: `${id}`,
          is_delete: "0",
        },
      })
      .then((response) => {
        setvdata(response.data.results);
        setvariantarray({
          ...variantarray,
          product_id: id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    setvarietyShow(true);
  };
  const handlevarietyClose = () => {
    setvarietyShow(false);
  };
  const handleClose = () => {
    mainformRef.current.reset();
    setValidated(false);
    setmodalshow(false);
  };

  // seotag
  let tagname;
  const ontagchange = (e) => {
    tagname = e.target.value;
    setaddtag(tagname);
  };

  const tagRemoveClick = (e) => {
    setseoArray(seoarray.filter((item) => item !== e));
  };
  const ontagaddclick = (e) => {
    // e.preventDefault();
    setproductdata({
      ...productdata,
      seo_tag: addtag,
    });
    // setseoArray(seoarray => [...seoarray, addtag]);
    setaddtag("");
  };

  // useEffect(() => {
  //   setproductdata({
  //     ...productdata,
  //     seo_tag: addtag
  //   });
  // }, [seoarray]);
  // useEffect(() => {
  //   setvariantarray(varietyjson)
  // }, []);
  // end seotag

  // variant
  const newImageUrls = [];
  const imguploadchange = (e) => {
    [...e.target.files].forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setvariantarray((variantarray) => {
      return { ...variantarray, product_img: newImageUrls };
    });
  };
  const onVariantChange = (e) => {
    setvariantarray({
      ...variantarray,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputcheckboxChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setvariantarray({
      ...variantarray,
      [e.target.name]: value,
    });
  };
  const handleVarietyChange = (e) => {
    // const varietyvalue = e.target.type === 'radio' ? e.target.checked : e.target.value
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
  };

  const onVariantaddclick = (id) => {
    // id.preventDefault();
    if (id === "") {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/products_varient_add`,
          variantarray
        )
        .then((response) => {
          setvdata(response.data.results);
          // setvariantarray(response.data)
          setvariantapicall(true);
          console.log(
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .put(
          `${process.env.REACT_APP_BASEURL}/products_varient_update`,
          variantarray
        )
        .then((response) => {
          setvariantarray(response.data);
          setvariantapicall(true);

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const VariantAddProduct = () => {

    setvariantmainarray((variantmainarray) => [
      ...variantmainarray,
      variantarray,
    ]);
    setcustomValidated(false);
    formRef.current.reset();

  };
  const VariantRemoveClick = (id, productid) => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete`, {
        id: `${id}`,
        product_id: `${productid}`,
        is_delete: "1",
      })
      .then((response) => {
        // setvariantarray(response.data[0])
        setvariantapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    setvdata(vdata.filter((item) => item !== id));
  };
  const VariantEditClick = (id, productid) => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/products_pricing?id=${id}&product_id=${productid}`
      )
      .then((response) => {
        setvariantarray(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  useEffect(() => {
    setproductdata({
      ...productdata,
      price: variantmainarray,
    });
  }, [variantmainarray]);

  let customvalue;
  const oncustomheadChange = (e) => {
    setheaderval(e.target.value);
  };
  const oncustomdescChange = (e) => {
    setdescval(e.target.value);
  };
  const handleAddClick = (e) => {
    customvalue = headerval + "," + descval;

    if (headerval !== "" && descval !== "") {
      setcustomarray((customarray) => [...customarray, customvalue]);
      setheaderval("");
      setdescval("");
      setcustomValidated(false);
    } else {
      setcustomValidated(true);
    }
  };
  const handleRemoveClick = (e) => {
    setcustomarray(customarray.filter((item) => item !== e));
  };
  useEffect(() => {
    setproductdata({
      ...productdata,
      add_custom_input: customarray,
    });
  }, [customarray]);
  // end

  const handleInputFieldChange = (e) => {
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
  };

  const handledescription = (event, editor) => {
    setdata1(editor.getData());
    setproductdata({
      ...productdata,
      product_description: data1,
    });
  };

  const OtherDescription = (event, editor) => {
    setotherintro(editor.getData());

    setproductdata({
      ...productdata,
      other_introduction: otherintro,
    });
  };

  //  const createMarkup = () => {
  //     return { __html: pdata.product_description };
  //   }
  const handleSaveDraft = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
      e.preventDefault();
    }
  };

  let productdataa = [];
  const handleAddProduct = (e) => {
    productdataa.push(productdata);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
    }
    setValidated(true);
    setcustomValidated(false);
    axios
      .post("${process.env.REACT_APP_BASEURL}/products", productdataa)
      .then((response) => {
        setapicall(true);
      });
    e.preventDefault();
    // mainformRef.current.reset();
    // setpdata('');
    setValidated(false);
    // handleClose();
  };
  // console.log("udhdfhkjsf   "+JSON.stringify(productdata))
  const handleUpdateProduct = (e) => {
    // setproductdata({ ...productdata, is_active: "0" })
    e.preventDefault();
    axios
      .put("${process.env.REACT_APP_BASEURL}/products_update", productdata)
      .then((response) => {
        setapicall(true);
        setmodalshow(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClick = () => { };
  const navigate = useNavigate();
  return (
    <div className="App productlist_maindiv">
      <h2>Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row">
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"text"}
              placeholder={"Search by product name"}
              onChange={OnSearchChange}
              name="product_title_name"
              value={searchdata.product_title_name}
              className={"adminsideinput"}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              placeholder="Search by category"
              onChange={OnSearchChange}
              name="category"
              value={searchdata.category}
            >
              <option>Search by category</option>
              <option value="1">Food</option>
              <option value="2">Fish & Meat</option>
              <option value="3">Baby Care</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              placeholder="Search by status"
              onChange={OnSearchChange}
              name="status"
              value={searchdata.status}
            >
              <option>Search by status</option>
              <option value="1">Pending</option>
              <option value="2">Selling</option>
              <option value="3">Draft</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <div className="product_page_uploadbox_one">
            <Input type={"file"} inputclass={"hiddeninput"} />
            <Iconbutton
              btntext={"Upload"}
              btnclass={"button main_outline_button"}
              Iconname={<AiOutlineCloudUpload />}
            />
          </div>
          <MainButton btntext={"Download"} />
          <Iconbutton
            btntext={"Add Product"}
            onClick={() => {
              handleShow("add");
            }}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button "}
          />
        </div>

        {/* datatable */}
        <Modal
          show={modalshow}
          onHide={() => handleClose()}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form
            className="p-2 addproduct_form"
            validated={validated}
            ref={mainformRef}
            onSubmit={
              modalshow === "add"
                ? (e) => handleAddProduct(e)
                : (modalshow) => handleUpdateProduct(modalshow)
            }
          >
            <Modal.Header closeButton className="addproductheader">
              <Modal.Title id="example-custom-modal-styling-title">
                {modalshow === "add" ? "Add Product" : "Update Product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="addproductbody p-2">
              <div className=" addproduct_form_boxx p-0 m-0">
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Basic Info</h5>
                  <div className="d-flex product_basixinfo">
                    <div className="product_detail-box col-md-4">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom01"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Title/Name
                          <span className="text-danger">
                            *
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please fill productname
                            </Form.Control.Feedback>
                          </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="text"
                            placeholder="Product Title/Name"
                            required
                            onChange={(e) => handleInputFieldChange(e)}
                            name={"product_title_name"}
                            value={productdata.product_title_name}
                          />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill productname
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom02"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Slug<span className="text-danger">* </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="text"
                            placeholder="Product Slug"
                            onChange={(e) => handleInputFieldChange(e)}
                            name={"product_slug"}
                            value={productdata.product_slug}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustomBrand"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Brand
                        </Form.Label>
                        <Col sm="12">
                          <Form.Select
                            aria-label="Product Type"
                            className="adminselectbox"
                            name="brand"
                            onChange={(e) => handleInputFieldChange(e)}
                            value={
                              productdata.brand === null ||
                                productdata.brand === undefined
                                ? ""
                                : productdata.brand
                            }
                          >
                            <option value={""}>Select Brand</option>
                            <option value="puma">Puma</option>
                            <option value="mamaearth">Mamaearth</option>
                            <option value="adidas">Adidas</option>
                            <option value="sketchers">Sketchers</option>
                          </Form.Select>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom03"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Store Name
                          <span className="text-danger">
                            *{" "}
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please fill storename
                            </Form.Control.Feedback>
                          </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="text"
                            placeholder=" Store Name"
                            required
                            onChange={(e) => handleInputFieldChange(e)}
                            name={"store_name"}
                            value={productdata.store_name}
                          />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill storename
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                    <div className="col-md-8">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom04"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Description
                        </Form.Label>
                        <Col sm="12">
                          <CKEditor
                            editor={ClassicEditor}
                            data={productdata.product_description}
                            onChange={handledescription}
                            name={"product_description"}
                          // value={productdata.product_description}
                          />
                        </Col>
                        {/* <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div> */}
                      </Form.Group>
                    </div>
                  </div>
                </div>
                {/* category */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Category Info</h5>
                  <div className="productvariety">
                    <Form.Group className="mx-3" controlId="validationCustom05">
                      <Form.Label className="inputlabelheading" sm="12">
                        Product Type<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Select
                          aria-label="Product Type"
                          className="adminselectbox"
                          required
                          name="product_type"
                          onChange={(e) => handleInputFieldChange(e)}
                          value={
                            productdata.product_type === null ||
                              productdata.product_type === undefined
                              ? ""
                              : productdata.product_type
                          }
                        >
                          <option value={""}>Select Product Type</option>
                          <option value="cloths">cloths</option>
                          <option value="Foods">foods</option>
                          <option value="electronic">Electronic</option>
                          <option value="Health Care">Health Care</option>
                          <option value="Books">Books</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select producttype
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom06">
                      <Form.Label className="inputlabelheading" sm="12">
                        Category<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Select
                          aria-label="Category"
                          className="adminselectbox"
                          required
                          onChange={(e) => handleInputFieldChange(e)}
                          name={"category"}
                          value={
                            productdata.category === null ||
                              productdata.category === undefined
                              ? ""
                              : productdata.category
                          }
                        >
                          <option value={""}> Select Category</option>
                          <option value="18">18</option>
                          <option value="Drinks">Two</option>
                          <option value="Cakes">Three</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select category
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom07">
                      <Form.Label className="inputlabelheading" sm="12">
                        Parent Category<span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Select
                          onChange={(e) => handleInputFieldChange(e)}
                          name={"parent_category"}
                          aria-label="Parent Category"
                          className="adminselectbox"
                          required
                          value={
                            productdata.parent_category === null ||
                              productdata.parent_category === undefined
                              ? ""
                              : productdata.parent_category
                          }
                        >
                          <option value={""}>Select Parent Category</option>
                          <option value="5,18">5,18</option>
                          <option value="Fresh">Two</option>
                          <option value="Organic">Three</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select parentcategory
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                {/* Taxes */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Taxes</h5>
                  <div className="productvariety mt-0">
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Wholesale Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          placeholder="Wholesale Sales Tax"
                          name="wholesale_sales_tax"
                          value={
                            productdata.wholesale_sales_tax === null ||
                              productdata.wholesale_sales_tax === undefined
                              ? ""
                              : productdata.wholesale_sales_tax
                          }
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Manufacturers’ Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          placeholder="Manufacturers’ Sales Tax "
                          name="manufacturers_sales_tax"
                          value={
                            productdata.manufacturers_sales_tax === null ||
                              productdata.manufacturers_sales_tax === undefined
                              ? ""
                              : productdata.manufacturers_sales_tax
                          }
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="m-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Retail Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          placeholder="Retail Sales Tax"
                          name="retails_sales_tax"
                          value={
                            productdata.retails_sales_tax === null ||
                              productdata.retails_sales_tax === undefined
                              ? ""
                              : productdata.retails_sales_tax
                          }
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Gst
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          placeholder="Gst"
                          required
                          name="gst"
                          value={productdata.gst}
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please choose a gst
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Value Added Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          placeholder="Value Added Tax"
                          name="value_added_tax"
                          value={
                            productdata.value_added_tax === null ||
                              productdata.value_added_tax === undefined
                              ? ""
                              : productdata.value_added_tax
                          }
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                {/*Date  */}

                {/* Variation */}
                {modalshow === "add" ? (
                  <div className="my-3 inputsection_box">
                    <div className="productvariety_box">
                      <div className="productvariety">
                        <Form.Group
                          className="mx-3"
                          controlId="validationCustom11"
                        >
                          <Form.Label
                            className="inputlabelheading"
                            sm="12 d-flex align-itmes-center"
                          >
                            <Form.Check
                              type="radio"
                              aria-label="radio 1"
                              className="mx-2"
                              onChange={handleVarietyChange}
                              name="variety"
                              value={false}
                              checked={
                                productdata.variety === false ? true : false
                              }
                            />
                            Single Product
                          </Form.Label>
                        </Form.Group>
                        <Form.Group
                          className="mx-3"
                          controlId="validationCustom11"
                        >
                          <Form.Label
                            className="inputlabelheading"
                            sm="12 d-flex align-itmes-center"
                          >
                            <Form.Check
                              type="radio"
                              aria-label="radio 2"
                              className="mx-2"
                              onChange={handleVarietyChange}
                              name="variety"
                              checked={
                                productdata.variety === true ? true : false
                              }
                              value={true}
                            />
                            Multiple Variety
                          </Form.Label>
                        </Form.Group>
                      </div>
                      <div className="row">
                        <Form.Group
                          className="mx-3"
                        // controlId="validationCustom13"
                        >
                          <div className="variation_box my-2">
                            <div className="row">
                              <div className="col-auto">
                                <Table
                                  bordered
                                  className="align-middle my-2 aadvariety_table_"
                                >
                                  <thead className="align-middle">
                                    <tr>
                                      <th>Variety</th>
                                      <th>Color</th>
                                      <th>Weight</th>
                                      <th>Size</th>
                                      <th>Price</th>
                                      <th>Mrp</th>
                                      <th>Sale Price</th>
                                      <th>Discount</th>
                                      <th>Special Offer</th>
                                      <th>Featured Product</th>
                                      <th className="manufacture_date">
                                        Mdate
                                      </th>
                                      <th className="manufacture_date">
                                        Edate
                                      </th>
                                      <th className="manufacture_date">
                                        Image
                                      </th>
                                      <th className="">Qty</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="p-0 text-center">
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Select
                                              aria-label="Default select example"
                                              name="unit"
                                              value={variantarray.unit}
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                            >
                                              <option value={""}>Select</option>
                                              {(varietyy.variety || []).map(
                                                (vari, i) => {
                                                  return (
                                                    <option
                                                      value={
                                                        vari === "weight"
                                                          ? "gm"
                                                          : vari === "volume"
                                                            ? "l"
                                                            : vari === "piece"
                                                              ? "pcs"
                                                              : vari === "color"
                                                                ? "pcs"
                                                                : null
                                                      }
                                                      key={i}
                                                    >
                                                      {vari}
                                                    </option>
                                                  );
                                                }
                                              )}
                                            </Form.Select>
                                          </InputGroup>
                                        </div>
                                      </td>

                                      <td className="p-0 text-center">
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              type="text"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"colors"}
                                              value={variantarray.colors}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>

                                      <td className="p-0 text-center">
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              value={
                                                variantarray.unit === "weight"
                                                  ? variantarray.unit_quantity
                                                  : variantarray.unit ===
                                                    "volume"
                                                    ? variantarray.unit_quantity
                                                    : variantarray.unit ===
                                                      "piece"
                                                      ? variantarray.unit_quantity
                                                      : null
                                              }
                                              type="number"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"unit_quantity"}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              value={
                                                variantarray.unit === "color"
                                                  ? variantarray.size
                                                  : ""
                                              }
                                              type="text"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"size"}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              min={1}
                                              type="number"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"product_price"}
                                              value={variantarray.product_price}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              type="number"
                                              min={1}
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"mrp"}
                                              value={variantarray.mrp}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              type="number"
                                              sm="9"
                                              min={1}
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"sale_price"}
                                              value={variantarray.sale_price}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              type="number"
                                              sm="9"
                                              min={1}
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"discount"}
                                              value={variantarray.discount}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className="">
                                          {variantarray.special_offer ===
                                            true ? (
                                            <Form.Check
                                              className="mx-2"
                                              onChange={
                                                handleInputcheckboxChange
                                              }
                                              name="special_offer"
                                              value={
                                                variantarray.special_offer ===
                                                  true
                                                  ? true
                                                  : false
                                              }
                                              checked
                                            />
                                          ) : (
                                            <Form.Check
                                              className="mx-2"
                                              onChange={
                                                handleInputcheckboxChange
                                              }
                                              name="special_offer"
                                              value={
                                                variantarray.special_offer ===
                                                  true
                                                  ? true
                                                  : false
                                              }
                                            />
                                          )}
                                          {/* <Form.Check
                                            onChange={(e) => handleInputcheckboxChange(e)}
                                            name={'special_offer'}
                                            value={variantarray.special_offer}
                                          /> */}
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className="">
                                          {variantarray.featured_product ===
                                            true ? (
                                            <Form.Check
                                              className="mx-2"
                                              onChange={
                                                handleInputcheckboxChange
                                              }
                                              name={"featured_product"}
                                              value={
                                                variantarray.featured_product ===
                                                  true
                                                  ? true
                                                  : false
                                              }
                                              checked
                                            />
                                          ) : (
                                            <Form.Check
                                              className="mx-2"
                                              onChange={
                                                handleInputcheckboxChange
                                              }
                                              name={"featured_product"}
                                              value={
                                                variantarray.featured_product ===
                                                  true
                                                  ? true
                                                  : false
                                              }
                                            />
                                          )}
                                          {/* <Form.Check
                                            onChange={(e) => handleInputcheckboxChange(e)}
                                            name={'featured_product'}
                                            value={variantarray.featured_product}
                                          /> */}
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className="manufacture_date">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              type="date"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"manufacturing_date"}
                                              value={
                                                variantarray.manufacturing_date
                                              }
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className="manufacture_date">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              type="date"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"expire_date"}
                                              value={variantarray.expire_date}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0 text-center">
                                        <div className="manufacture_date">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              multiple
                                              type="file"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={imguploadchange}
                                              name={"product_img"}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>

                                      <td className="p-0">
                                        <div className="">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              name={"quantity"}
                                              type="number"
                                              value={variantarray.quantity}
                                              sm="9"
                                              min={"1"}
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              onKeyPress={(event) => {
                                                if (event.key === "Enter") {
                                                  VariantAddProduct();
                                                }
                                              }}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      <td className="p-0">
                                        <div className=" d-flex align-items-center">
                                          <Button
                                            variant="outline-success"
                                            className="addcategoryicon"
                                            onClick={() => VariantAddProduct()}
                                            size="sm"
                                          >
                                            +
                                          </Button>
                                        </div>
                                      </td>
                                    </tr> {(variantmainarray || []).map(
                                      (variantdata, i) => {
                                        return (
                                          <tr>
                                            <td className="p-0 text-center ">
                                              {variantdata.unit === "pcs"
                                                ? "color"
                                                : variantdata.unit === "gms"
                                                  ? "weight"
                                                  : variantdata.unit === "ml"
                                                    ? "volume"
                                                    : null}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.colors}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.unit === "gms"
                                                ? variantdata.unit_quantity
                                                : variantdata.unit === "ml"
                                                  ? variantdata.unit_quantity
                                                  : variantdata.unit === "pcs"
                                                    ? variantdata.unit_quantity
                                                    : null}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.unit === "pcs"
                                                ? variantdata.size
                                                : null}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.product_price}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.mrp}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.sale_price}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.discount}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.special_offer}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.featured_product}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.manufacturing_date}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.expire_date}
                                            </td>
                                            <td className="p-0 text-center">
                                              <Carousel
                                                indicators={false}
                                                controls={false}
                                              >
                                                {(
                                                  variantdata.product_img || []
                                                ).map((data) => {
                                                  return (
                                                    <Carousel.Item
                                                      interval={1000}
                                                    >
                                                      <img
                                                        src={data}
                                                        alt="apnaorganic"
                                                        width={50}
                                                      />
                                                    </Carousel.Item>
                                                  );
                                                })}
                                              </Carousel>
                                            </td>
                                            <td className="p-0 text-center">
                                              {variantdata.quantity}
                                            </td>
                                            <td className="p-0 text-center">
                                              {/* <Button variant="text-danger" className="addcategoryicon text-danger"
                        onClick={(id) => VariantRemoveClick(variantdata.id)} size="sm">
                        &times;
                      </Button>
                      <Button variant="text-danger" className="addcategoryicon text-danger"
                        onClick={(id) => VariantEditClick(variantdata.id)} size="sm">
                        <MdOutlineEdit />
                      </Button> */}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                ) : null}
                {/* Offer */}

                {/* seo tag */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Seo Tag</h5>
                  <div className="productvariety">
                    <Form.Group
                      className="mx-3"
                      controlId="validationCustomSeo"
                    >
                      <div className=" d-flex align-items-center my-2">
                        <InputGroup className="" size="sm">
                          <Form.Control
                            sm="9"
                            onChange={ontagchange}
                            value={addtag}
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                ontagaddclick();
                              }
                            }}
                          />
                          <Button
                            variant="outline-success"
                            className="addcategoryicon"
                            onClick={() => ontagaddclick()}
                            size="sm"
                          >
                            +
                          </Button>
                        </InputGroup>
                      </div>

                      <div className="d-flex align-items-center tagselectbox mt-2">
                        {/* {(seoarray || []).map((seotags, i) => {
                          return ( */}
                        <Badge className="tagselecttitle mb-0" bg="success">
                          {productdata.seo_tag === null ||
                            productdata.seo_tag === undefined
                            ? ""
                            : productdata.seo_tag}
                          <GiCancel
                            className=" mx-0 ms-1 btncancel"
                            onClick={() => tagRemoveClick(proddata.seo_tag)}
                          />
                        </Badge>

                        {/* )

                        })} */}
                      </div>
                    </Form.Group>
                  </div>
                </div>

                {/* other info */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Other Instruction</h5>
                  <Col sm="12" className="mt-3">
                    <CKEditor
                      editor={ClassicEditor}
                      data="<p>Hello from CKEditor 5!</p>"
                      onChange={OtherDescription}
                      name={"other_introduction"}
                    />
                  </Col>
                </div>
                {/* input */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Add Custom Input</h5>
                  <div className=" mt-0 mb-3">
                    <Table className="align-middle">
                      <thead>
                        <tr>
                          <th>Heading</th>
                          <th>Description</th>
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
                                name={"custom_input_header"}
                                className={
                                  customvalidated === true
                                    ? "border-danger"
                                    : null
                                }
                              />
                            </InputGroup>
                          </td>
                          <td className="col-4">
                            <InputGroup className="">
                              <Form.Control
                                className={
                                  customvalidated === true
                                    ? "border-danger"
                                    : null
                                }
                                value={descval}
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
                              variant="outline-success"
                              className="addcategoryicon"
                              onClick={() => handleAddClick()}
                              size="sm"
                            >
                              +
                            </Button>
                          </td>
                        </tr>{productdata.add_custom_input === null ||
                          productdata.add_custom_input === undefined
                          ? ""
                          : (productdata.add_custom_input || []).map(
                            (variantdata, i) => {
                              const arr = variantdata.split(",");
                              return (
                                <tr className="">
                                  <td className=" text-center">
                                    <InputGroup className="">
                                      <Form.Control
                                        value={arr[0]}
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
                                        value={arr[1]}
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
                            }
                          )}
                      </tbody>
                    </Table>
                  </div>
                  {/* );
                })} */}
                  {/* --------------------------------------------- */}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="addproductfooter">
              <Iconbutton
                btntext={" Cancel"}
                onClick={() => handleClose()}
                btnclass={"button main_outline_button px-2"}
              // Iconname={<GiCancel /> }
              />
              <MainButton
                btntext={"Save as Draft"}
                onClick={() => handleSaveDraft()}
              />
              <Iconbutton
                type={"submit"}
                btntext={modalshow === "add" ? "Add Product" : "Update Product"}
                btnclass={"button main_button "}
              />
            </Modal.Footer>
          </Form>
        </Modal>
        {/* variety */}
        <Modal
          size="lg"
          show={varietyshow}
          onHide={() => handlevarietyClose()}
          dialogClassName="addproductmainmodal"
        >
          <Form ref={formRef} validated={validated}>
            <Modal.Header closeButton>
              <Modal.Title>Add Variety</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <Form.Group
                  className=""
                // controlId="validationCustom13"
                >
                  <div className="variation_box my-2">
                    <div className="row">
                      <div className="col-auto">
                        <Table bordered className="align-middle my-2">
                          <thead className="align-middle">
                            <tr>
                              <th>Variety</th>
                              <th>Color</th>
                              <th>Weight</th>
                              <th>Size</th>
                              <th>Price</th>
                              <th>Mrp</th>
                              <th>Sale Price</th>
                              <th>Discount</th>
                              <th>Special Offer</th>
                              <th>Featured Product</th>
                              <th className="manufacture_date">Mdate</th>
                              <th className="manufacture_date">Edate</th>
                              <th className="manufacture_date">Image</th>
                              <th className="manufacture_date">Quantity</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Select
                                      aria-label="Default select example"
                                      name="unit"
                                      value={
                                        variantarray.unit === "pcs"
                                          ? "color"
                                          : variantarray.unit === "gms"
                                            ? "weight"
                                            : variantarray.unit === "ml"
                                              ? "volume"
                                              : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                    >
                                      <option value={""}>Select</option>
                                      {(varietyy.variety || []).map(
                                        (vari, i) => {
                                          return (
                                            <option value={vari} key={i}>
                                              {vari}
                                            </option>
                                          );
                                        }
                                      )}
                                    </Form.Select>
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="text"
                                      sm="9"
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"colors"}
                                      value={variantarray.colors}
                                    />
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={
                                        variantarray.unit === "gms"
                                          ? variantarray.unit_quantity
                                          : variantarray.unit === "ml"
                                            ? variantarray.unit_quantity
                                            : variantarray.unit === "pcs"
                                              ? variantarray.unit_quantity
                                              : null
                                      }
                                      type="text"
                                      sm="9"
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"unit_quantity"}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={
                                        variantarray.unit === "pcs"
                                          ? variantarray.size
                                          : null
                                      }
                                      type="text"
                                      sm="9"
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"size"}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      min={1}
                                      type="number"
                                      sm="9"
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"product_price"}
                                      value={variantarray.product_price}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      min={1}
                                      sm="9"
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"mrp"}
                                      value={variantarray.mrp}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      sm="9"
                                      min={1}
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"sale_price"}
                                      value={variantarray.sale_price}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      sm="9"
                                      min={1}
                                      onChange={(e) => onVariantChange(e)}
                                      name={"discount"}
                                      value={variantarray.discount}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="">
                                  <Form.Check
                                    onChange={(e) => onVariantChange(e)}
                                    name={"special_offer"}
                                    value={variantarray.special_offer}
                                  />
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="">
                                  <Form.Check
                                    onChange={(e) => onVariantChange(e)}
                                    name={"featured_product"}
                                    value={variantarray.featured_product}
                                  />
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="manufacture_date">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="date"
                                      sm="9"
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"manufacturing_date"}
                                      value={moment(
                                        variantarray.manufacturing_date
                                      ).format("YYYY-MM-DD")}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="manufacture_date">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="date"
                                      sm="9"
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"expire_date"}
                                      value={moment(
                                        variantarray.expire_date
                                      ).format("YYYY-MM-DD")}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="manufacture_date">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      multiple
                                      type="file"
                                      sm="9"
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={imguploadchange}
                                      name={"product_img"}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0">
                                <div className="manufacture_date">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      name={"quantity"}
                                      type="number"
                                      value={variantarray.quantity}
                                      sm="9"
                                      min={"1"}
                                      className={
                                        customvalidated === true
                                          ? "border-danger"
                                          : null
                                      }
                                      onChange={(e) => onVariantChange(e)}
                                      onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                          onVariantaddclick();
                                        }
                                      }}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0">
                                <div className=" d-flex align-items-center">
                                  <Button
                                    variant="outline-success"
                                    className="addcategoryicon"
                                    // type="submit"
                                    onClick={() =>
                                      onVariantaddclick(variantarray.id)
                                    }
                                    size="sm"
                                  >
                                    +
                                  </Button>
                                </div>
                              </td>
                            </tr>{vdata === "" ||
                              vdata === null ||
                              vdata === undefined
                              ? null
                              : (vdata || []).map((variantdata, i) => {
                                return variantdata.is_delete ===
                                  "1" ? null : (
                                  <tr>
                                    <td className="p-0 text-center ">
                                      {variantdata.unit === "pcs"
                                        ? "color"
                                        : variantdata.unit === "gms"
                                          ? "weight"
                                          : variantdata.unit === "ml"
                                            ? "volume"
                                            : null}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.colors}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.unit === "gms"
                                        ? variantdata.unit_quantity
                                        : variantdata.unit === "ml"
                                          ? variantdata.unit_quantity
                                          : variantdata.unit === "pcs"
                                            ? variantdata.unit_quantity
                                            : null}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.unit === "pcs"
                                        ? variantdata.size
                                        : null}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.product_price}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.mrp}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.sale_price}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.discount}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.special_offer}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.featured_product}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {moment(
                                        variantdata.manufacturing_date
                                      ).format("YYYY-MM-DD")}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {moment(variantdata.expire_date).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </td>
                                    <td className="p-0 text-center">
                                      <Carousel
                                        indicators={false}
                                        controls={false}
                                      >
                                        {(variantdata.product_img || []).map(
                                          (data) => {
                                            return (
                                              <Carousel.Item interval={1000}>
                                                <img
                                                  src={data}
                                                  alt="apnaorganic"
                                                  width={50}
                                                />
                                              </Carousel.Item>
                                            );
                                          }
                                        )}
                                      </Carousel>
                                    </td>
                                    <td className="p-0 text-center">
                                      {variantdata.quantity}
                                    </td>
                                    <td className="p-0 text-center">
                                      <Button
                                        variant="text-danger"
                                        className="addcategoryicon text-danger"
                                        onClick={(id) =>
                                          VariantRemoveClick(
                                            variantdata.id,
                                            variantdata.product_id
                                          )
                                        }
                                        size="sm"
                                      >
                                        &times;
                                      </Button>
                                      <Button
                                        variant="text-danger"
                                        className="addcategoryicon text-danger"
                                        onClick={(id) =>
                                          VariantEditClick(
                                            variantdata.id,
                                            variantdata.product_id
                                          )
                                        }
                                        size="sm"
                                      >
                                        <MdOutlineEdit />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button main_outline_button"
                onClick={() => handlevarietyClose()}
              >
                Cancel
              </button>
              <button
                className="button main_button"
                onClick={(e) => handlevarietyClose(e)}
              >
                Save
              </button>
            </Modal.Footer>
          </Form>
        </Modal>

        <DataTable
          columns={columns}
          data={pdata.results}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body product_table"}
        />
        <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
}

export default Product_Old;
