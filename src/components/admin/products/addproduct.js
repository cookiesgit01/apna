import React, { useEffect, useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GiCancel } from "react-icons/gi";
import { Badge } from "react-bootstrap";
import MainButton from "../common/button";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import { MdOutlineEdit } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import VariationJson from '../json/variation';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
const Addproduct = (props) => {
  const [addtag, setaddtag] = useState();
  const [pdata, setpdata] = useState([]);
  const [validated, setValidated] = useState(false);
  const [customvalidated, setcustomValidated] = useState(false);
  const [modalshow, setmodalshow] = useState(false);
  const [seoarray, setseoArray] = useState([]);
  const [varietyval, setvarietyval] = useState('');
  const [variantarray, setvariantarray] = useState([]);
  const [headerval, setheaderval] = useState('');
  const [descval, setdescval] = useState('');
  const [variantmainarray, setvariantmainarray] = useState([]);
  const [customarray, setcustomarray] = useState([]);
  const [data1, setdata1] = useState([]);
  const [vdata, setvdata] = useState([]);
  // const [varietyshow, setvarietyShow] = useState(false);
  const formRef = useRef();
  const mainformRef = useRef();

  var varietyy = VariationJson;

  // api

  // api end
  //  json
  const productjson = {
    "product_title_name": [
      "just herbs shampoo"
    ],
    "product_slug": [
      "just_herbs_123"
    ],
    "store_name": [
      "w2c_store_lapssi"
    ],
    "product_type": [
      "organic_shampoo"
    ],
    "category": [
      "18"
    ],
    "parent_category": [
      "5,18"
    ],
    "product_quantity": [
      "250"
    ],
    "mrp": [
      "600"
    ],
    "product_price": [
      "500"
    ],
    "sale_price": [
      "450"
    ],
    "discount": [
      "10"
    ],
    "wholesale_sales_tax": [
      "10"
    ],
    "manufacturers_sales_tax": [
      "10"
    ],
    "retails_sales_tax": [
      "5"
    ],
    "gst": [
      "25"
    ],
    "value_added_tax": [
      "5"
    ],
    "manufacturing_date": [
      "2022-11-01"
    ],
    "expire_date": [
      "2022-01-16"
    ],
    "quantity": [
      {
        "variations": "volume",
        "volume": "300",
        "price": "250",
        "mrp": "300",
        "sale_price": "200",
        "discount": "10",
        "special_offer": "on",
        "featured_product": "on",
        "manufacturing_date": "2022-11-08",
        "expire_date": "2022-11-27",
        "quantity": "50",
        "product_img": [
          "blob:http://localhost:3000/4737c736-dcc9-4901-a5c9-41efb95667ce",
          "blob:http://localhost:3000/e2394413-1533-42f0-858f-babcafefac1e"
        ]
      },
      {
        "variations": "color",
        "colorname": "pink",
        "size": "xl",
        "price": "250",
        "mrp": "1400",
        "sale_price": "200",
        "discount": "500",
        "featured_product": "on",
        "manufacturing_date": "2022-11-25",
        "quantity": "40",
        "product_img": [
          "blob:http://localhost:3000/c9b8c6e6-c0b6-49e2-8940-c49e3382eea6"
        ]
      },
      // {
      //   "variations": "volume",
      //   "volume": "400",
      //   "price": "200",
      //   "mrp": "100",
      //   "discount": "20",
      //   "sale_price": "550",
      //   "manufacturing_date": "2022-11-10",
      //   "expire_date": "2022-11-27",
      //   "quantity": "222",
      //   "product_img": [
      //     "blob:http://localhost:3000/7bde24eb-1e60-496b-b6b6-c3310e1e67ed"
      //   ]
      // },
      // {
      //   "variations": "weight",
      //   "weight": "1000",
      //   "price": "1000",
      //   "mrp": "2000",
      //   "sale_price": "150",
      //   "discount": "100",
      //   "manufacturing_date": "2022-11-11",
      //   "quantity": "2000",
      //   "product_img": [
      //     "blob:http://localhost:3000/1009d8bb-1047-4af6-9440-9edf8687f3e2"
      //   ]
      // }
    ],
    "special_offer": true,
    "variety": true,
    "seo_tag": [
      "shampoo",
      "herbs",
      "organic"
    ],
    "add_custom_input": [
      "packaging,good quality",
      "storage,500gb"
    ]
  }
  const varietyjson = {
    "quantity": [
      {
        "variations": "volume",
        "volume": "300",
        "price": "250",
        "mrp": "300",
        "sale_price": "200",
        "discount": "10",
        "special_offer": "on",
        "featured_product": "on",
        "manufacturing_date": "2022-11-08",
        "expire_date": "2022-11-27",
        "quantity": "50",
        "product_img": [
          "blob:http://localhost:3000/4737c736-dcc9-4901-a5c9-41efb95667ce",
          "blob:http://localhost:3000/e2394413-1533-42f0-858f-babcafefac1e"
        ]
      },
      {
        "variations": "color",
        "colorname": "pink",
        "size": "xl",
        "price": "250",
        "mrp": "1400",
        "sale_price": "200",
        "discount": "500",
        "featured_product": "on",
        "manufacturing_date": "2022-11-25",
        "quantity": "40",
        "product_img": [
          "blob:http://localhost:3000/c9b8c6e6-c0b6-49e2-8940-c49e3382eea6",
          "blob:http://localhost:3000/e2394413-1533-42f0-858f-babcafefac1e"
        ]
      },
    ]
  }
  // json end
  const handleClose = () => {
    setmodalshow(false)
  }

  useEffect(() => {
    if (props.show === 1) {
      setpdata('')
      setmodalshow(true)
    }
    if (props.show === 2) {
      setmodalshow(true)
      setpdata(productjson)
      setseoArray(productjson.seo_tag)
    }
  }, [props.show]);

  useEffect(() => {
    setvdata(varietyjson)
  }, []);

  // seotag
  let tagname;
  const ontagchange = (e) => {
    tagname = e.target.value;
    setaddtag(tagname);
  };

  const tagRemoveClick = (e) => {
    setseoArray(seoarray.filter(item => item !== e));
  }
  const ontagaddclick = (e) => {
    // e.preventDefault();
    setseoArray(seoarray => [...seoarray, addtag]);
    setaddtag('');
  };
  useEffect(() => {
    setpdata({
      ...pdata,
      seo_tag: seoarray
    });
  }, [seoarray]);
  useEffect(() => {
    setvariantmainarray(varietyjson.quantity)
  }, [variantarray]);
  // end seotag

  // variant
  const newImageUrls = [];
  const imguploadchange = (e) => {
    ([...e.target.files]).forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setvariantarray((variantarray) => { return { ...variantarray, product_img: newImageUrls } });
  }
  const onVariantChange = (e) => {
    setvariantarray({
      ...variantarray,
      [e.target.name]: e.target.value
    });
    // setdata1({
    //   ...data1,
    //   [e.target.name]: e.target.value
    // });
  };
  const onVariantaddclick = (e) => {
    if (variantarray !== '') {
      setvariantmainarray(variantmainarray => [...variantmainarray, variantarray]);
      setcustomValidated(false);
    }
    else {
      setcustomValidated(true);
    }
    e.preventDefault();
    formRef.current.reset();
    setvariantarray('');
  }

  const VariantRemoveClick = (e) => {
    setvariantmainarray(variantmainarray.filter(item => item !== e));
  }
  const VariantEditClick = (e) => {
    setdata1(e)
    setvariantmainarray(variantmainarray.filter(item => item !== e));
  }
  // varint end


  // handle click event of the Remove button
  let customvalue;
  const oncustomheadChange = (e) => {
    setheaderval(e.target.value);
  };
  const oncustomdescChange = (e) => {
    setdescval(e.target.value);
  };
  const handleAddClick = (e) => {
    customvalue = headerval + ',' + descval;

    if (headerval !== '' && descval !== '') {
      setcustomarray(customarray => [...customarray, customvalue]);
      setheaderval('');
      setdescval('');
      setcustomValidated(false);
    }
    else {
      setcustomValidated(true);
    }
  }
  const handleRemoveClick = (e) => {
    setcustomarray(customarray.filter(item => item !== e));
  };
  useEffect(() => {
    setpdata({
      ...pdata,
      add_custom_input: customarray
    });
  }, [customarray]);
  // end

  const handleInputcheckboxChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value
    setpdata({
      ...pdata,
      [e.target.name]: value
    });

  }
  const handleInputFieldChange = (e) => {
    setpdata({
      ...pdata,
      [e.target.name]: [e.target.value]
    });
  };
  const handleSaveDraft = (e) => {
    // const form = e.currentTarget;
  };

  const handleAddProduct = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault()
    }
    setValidated(true);
    setcustomValidated(false);
    e.preventDefault();
    mainformRef.current.reset();
    setpdata('');
    setValidated(false);
    // handleClose();
  }
  const handleUpdateProduct = (e) => {
    mainformRef.current.reset();
  }
  useEffect(() => {
    setvdata({
      ...vdata,
      quantity: variantmainarray
    });
  }, [variantmainarray]);




  return (
    <div>
      {/* form */}
      <Modal
        show={modalshow}
        onHide={handleClose}
        dialogClassName="addproductmainmodal"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton className="addproductheader">
          <Modal.Title id="example-custom-modal-styling-title">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="addproductbody p-2">
          <div className="d-flex justify-content-center align-items-center addproduct_form_boxx p-0 m-0">
            <Form className="p-2 addproduct_form" validated={validated} ref={mainformRef} onSubmit={handleAddProduct}>
              <div className="my-3 inputsection_box">
                <h5 className="m-0">Basic Info</h5>
                <div className="productvariety">

                  <Form.Group className="mx-3" controlId="validationCustom01">
                    <Form.Label className="inputlabelheading" sm="12">
                      Product Title/Name<span className="text-danger">*
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill productname
                        </Form.Control.Feedback></span>
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="text" placeholder="Product Title/Name" required onChange={() => handleInputFieldChange()} name={'product_title_name'} value={pdata.product_title_name} />
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please fill productname
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mx-3" controlId="validationCustom02">
                    <Form.Label className="inputlabelheading" sm="12">
                      Product Slug<span className="text-danger">* </span>
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="text" placeholder="Product Slug" onChange={handleInputFieldChange} name={'product_slug'} value={pdata.product_slug} />
                    </Col>
                  </Form.Group>


                  <Form.Group className="mx-3" controlId="validationCustom03">
                    <Form.Label className="inputlabelheading" sm="12">
                      Store Name<span className="text-danger">* <Form.Control.Feedback type="invalid" className="h6">
                        Please fill storename
                      </Form.Control.Feedback></span>
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="text" placeholder=" Store Name" required onChange={handleInputFieldChange} name={'store_name'} value={pdata.store_name} />
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please fill storename
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                </div>
                <Form.Group className="mx-3" controlId="validationCustom04">
                  <Form.Label className="inputlabelheading" sm="12">
                    Product Description
                  </Form.Label>
                  <Col sm="12">
                    <CKEditor
                      editor={ClassicEditor}
                      data="<p>Hello from CKEditor 5!</p>"
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(data)
                      }}
                      onBlur={(event, editor) => {
                      }}
                      onFocus={(event, editor) => {
                      }}
                      name={'product_description'}
                      value={pdata.product_description}
                    />

                  </Col>
                </Form.Group>
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
                        onChange={handleInputFieldChange}
                        value={pdata.product_type}
                      >
                        <option value={''}>Select Product Type</option>
                        <option value="organic_shampoo">organic_shampoo</option>
                        <option value="Foods">Two</option>
                        <option value="Clothes">Three</option>
                        <option value="Health Care">Four</option>
                        <option value="Books">Five</option>
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
                      <Form.Select aria-label="Category" className="adminselectbox" required onChange={handleInputFieldChange} name={'category'} value={pdata.category}>
                        <option value={''}> Select Category</option>
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
                        onChange={handleInputFieldChange} name={'parent_category'}
                        aria-label="Parent Category"
                        className="adminselectbox"
                        required
                        value={pdata.parent_category}
                      >
                        <option value={''}>Select Parent Category</option>
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
              {/*Price and Quantity  */}
              <div className="my-3 inputsection_box">
                <h5 className="m-0">Stock Info</h5>
                <div className="productvariety mt-0">
                  <Form.Group className="mx-3" controlId="validationCustom08">
                    <Form.Label className="inputlabelheading" sm="12">
                      Product Quantity<span className="text-danger">* </span>
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="number" placeholder="Product Quantity" required onChange={handleInputFieldChange} name={'product_quantity'} value={pdata.product_quantity} />
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please fill quantity
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mx-3" controlId="validationCustom09">
                    <Form.Label className="inputlabelheading" sm="12">
                      Mrp<span className="text-danger">*</span>
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="number" placeholder="mrp" required onChange={handleInputFieldChange} name={'mrp'} value={pdata.mrp} />
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please fill mrp
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group className="m-3" controlId="validationCustom10">
                    <Form.Label className="inputlabelheading" sm="12">
                      Product Price<span className="text-danger">* </span>
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="number" placeholder="Price" required onChange={handleInputFieldChange} name={'product_price'} value={pdata.product_price} />
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please fill price
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mx-3" controlId="validationCustom11">
                    <Form.Label className="inputlabelheading" sm="12">
                      Sale Price
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="number" placeholder="Sale Price" onChange={handleInputFieldChange} name={'sale_price'} value={pdata.sale_price} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mx-3" controlId="validationCustom11">
                    <Form.Label className="inputlabelheading" sm="12">
                      Discount
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="number" placeholder="Discount" onChange={handleInputFieldChange} name={'discount'} value={pdata.discount} />
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
                        value={pdata.wholesale_sales_tax}
                        onChange={handleInputFieldChange}
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
                        value={pdata.manufacturers_sales_tax}
                        onChange={handleInputFieldChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="m-3" controlId="validationCustom11">
                    <Form.Label className="inputlabelheading" sm="12">
                      Retail Sales Tax
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="number" placeholder="Retail Sales Tax" name="retails_sales_tax" value={pdata.retails_sales_tax}
                        onChange={handleInputFieldChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mx-3" controlId="validationCustom11">
                    <Form.Label className="inputlabelheading" sm="12">
                      Gst
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="number" placeholder="Gst" required name="gst" value={pdata.gst} onChange={handleInputFieldChange} />
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
                      <Form.Control type="number" placeholder="Value Added Tax" name="value_added_tax" value={pdata.value_added_tax} onChange={handleInputFieldChange} />
                    </Col>
                  </Form.Group>
                </div>
              </div>
              {/*Date  */}
              <div className="my-3 inputsection_box">
                <h5 className="m-0">Date</h5>
                <div className="productvariety">
                  <Form.Group className="mx-3" controlId="validationCustom11">
                    <Form.Label className="inputlabelheading" sm="12">
                      Manufacturing Date
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="date" placeholder="manufacturing_date" name="manufacturing_date" required onChange={handleInputFieldChange} value={pdata.manufacturing_date} />
                      <Form.Control.Feedback type="invalid">
                        Please choose a date
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mx-3">
                    <Form.Label
                      className="inputlabelheading"
                      sm="12 d-flex align-itmes-center"
                    >
                      Expire Date
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control type="date" placeholder="expire_date" required name="expire_date" value={pdata.expire_date} onChange={handleInputFieldChange} />
                      <Form.Control.Feedback type="invalid">
                        Please choose a expire date
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                </div>
              </div>
              {/* Variation */}
              {/* 
              <div className="my-3 inputsection_box">
                <h5 className="m-0">Variety</h5>
                <div className="row">
                  <Form ref={formRef} validated={validated} onSubmit={onVariantaddclick}>
                    <Form.Group
                      className="mx-3"
                    // controlId="validationCustom13"
                    >
                      <div className="variation_box my-2">
                        <div className="row">
                          <div className="col-auto">
                            <Table bordered className="align-middle my-2">
                              <thead className="align-middle">
                                <tr>
                                  <th >Variety</th>
                                  <th >Color</th>
                                  <th >Weight/Size</th>
                                  <th >Price</th>
                                  <th >Mrp</th>
                                  <th >Sale Price</th>
                                  <th >Discount</th>
                                  <th >Special Offer</th>
                                  <th >Featured Product</th>
                                  <th className="manufacture_date">Mdate</th>
                                  <th className="manufacture_date">Edate</th>
                                  <th className="manufacture_date">Image</th>
                                  <th className="manufacture_date">Quantity</th>
                                  <th ></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="p-0 text-center">
                                    <div className=" d-flex align-items-center">
                                      <InputGroup className="" size="sm">
                                        <Form.Select aria-label="Default select example" name='variations' value ={data1.variations} onChange={(e) => {
                                          // setvariantmainarray('');
                                          setcustomValidated(false)
                                          setvarietyval(e.target.value);
                                          setvariantarray({
                                            ...variantarray,
                                            variations: e.target.value
                                          });
                                        }}
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                        >
                                          <option value={''} >Select</option>
                                          {(varietyy.variety || []).map((vari, i) => {
                                            return (
                                              <option value={vari} key={i}>{vari}</option>
                                            );
                                          })}
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
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
                                          name={'colorname'}
                                          value={data1.colorname}
                                        />
                                      </InputGroup>
                                    </div>
                                  </td>

                                  <td className="p-0 text-center">
                                    <div className=" d-flex align-items-center">
                                      <InputGroup className="" size="sm">
                                        <Form.Control
                                        value={(data1.variations === 'weight' ? data1.weight : data1.variations === 'volume' ? data1.volume  : data1.variations === 'piece' ?  data1.piece : data1.variations === 'color' ? data1.size : null)}
                                          type="text"
                                          sm="9"
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
                                          name={(varietyval === 'weight' ? 'weight' : varietyval === 'volume' ? 'volume' : varietyval === 'piece' ? 'piece' : varietyval === 'color' ? 'size' : null)}
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
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
                                          name={'price'}
                                          value={data1.price}
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
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
                                          name={'mrp'}
                                          value={data1.mrp}

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
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
                                          name={'sale_price'}
                                          value={data1.sale_price}
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
                                          onChange={onVariantChange}
                                          name={'discount'}
                                          value={data1.discount}
                                        />
                                      </InputGroup>

                                    </div>
                                  </td>
                                  <td className="p-0 text-center">
                                    <div className="">
                                      <Form.Check
                                        onChange={onVariantChange}
                                        name={'special_offer'}
                                        value={data1.special_offer}
                                      />
                                    </div>
                                  </td>
                                  <td className="p-0 text-center">
                                    <div className="">
                                      <Form.Check
                                        onChange={onVariantChange}
                                        name={'featured_product'}
                                        value={data1.featured_product}
                                      />
                                    </div>
                                  </td>
                                  <td className="p-0 text-center">
                                    <div className="manufacture_date" >
                                      <InputGroup className="" size="sm">
                                        <Form.Control
                                          type="date"
                                          sm="9"
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
                                          name={'manufacturing_date'}
                                          value={data1.manufacturing_date}
                                        />
                                      </InputGroup>

                                    </div>
                                  </td>
                                  <td className="p-0 text-center">
                                    <div className="manufacture_date" >
                                      <InputGroup className="" size="sm">
                                        <Form.Control
                                          type="date"
                                          sm="9"
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
                                          name={'expire_date'}
                                          value={data1.expire_date}
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
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={imguploadchange}
                                          name={'product_img'}
                                         
                                        />
                                      </InputGroup>

                                    </div>
                                  </td>
                                  <td className="p-0">
                                    <div className="manufacture_date">
                                      <InputGroup className="" size="sm">
                                        <Form.Control
                                          name={'quantity'}
                                          type="number"
                                          value={data1.quantity}
                                          sm="9"
                                          min={'1'}
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
                                          onKeyPress={event => {
                                            if (event.key === "Enter") {
                                              onVariantaddclick();
                                            }
                                          }
                                          }
                                        />
                                      </InputGroup>
                                    </div>
                                  </td>
                                  <td className="p-0">
                                    <div className=" d-flex align-items-center">
                                      <Button variant="outline-success" className="addcategoryicon"
                                        type="submit"
                                        onClick={onVariantaddclick}
                                        size="sm">
                                        +
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              
                                {
                                  (pdata.quantity || []).map((variantdata, i) => {
                                    return (
                                      <tr >
                                        <td className="p-0 text-center ">
                                          {variantdata.variations}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {variantdata.colorname}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {(variantdata.variations === 'color' ? variantdata.size : variantdata.variations === 'weight' ? variantdata.weight : variantdata.variations === 'volume' ? variantdata.volume : variantdata.variations === 'piece' ? variantdata.piece : null)}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {variantdata.price}
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
                                          <Carousel indicators={false} controls={false}>
                                            {(variantdata.product_img || []).map((data) => {
                                              return (
                                                <Carousel.Item interval={1000}>
                                                  <img src={data} alt='apnaorganic' width={50} />
                                                </Carousel.Item>
                                              )
                                            })}
                                          </Carousel>
                                        </td>
                                        <td className="p-0 text-center">
                                          {variantdata.quantity}
                                        </td>
                                        <td className="p-0 text-center">
                                          <Button variant="text-danger" className="addcategoryicon text-danger"
                                            onClick={() => VariantRemoveClick(variantdata)} size="sm">
                                            &times;
                                          </Button>
                                          <Button variant="text-danger" className="addcategoryicon text-danger"
                                            onClick={() => VariantEditClick(variantdata)} size="sm">
                                            <MdOutlineEdit/>
                                          </Button>
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </div> */}
              <div className="my-3 inputsection_box">
                <div className="productvariety_box">
                  <h5 className="m-0">Offer</h5>
                  <div className="productvariety">
                    <Form.Group
                      className="mx-3"
                      controlId="validationCustom11"
                    >
                      <Form.Label
                        className="inputlabelheading"
                        sm="12 d-flex align-itmes-center"
                      >
                        {pdata.variety === true ?
                          <Form.Check className="mx-2" onChange={handleInputcheckboxChange} name='variety' value={pdata.variety === true ? true : false} checked /> :
                          <Form.Check className="mx-2" onChange={handleInputcheckboxChange} name='variety' value={pdata.variety === true ? true : false} />}
                        Variety
                      </Form.Label>
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/* Offer */}

              <div className="my-3 inputsection_box">
                <div>
                  <div className="productvariety_box">
                    <h5 className="m-0">Offer</h5>
                    <div className="productvariety">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label
                          className="inputlabelheading"
                          sm="12 d-flex align-itmes-center"
                        >
                          {pdata.special_offer === true ?
                            <Form.Check className="mx-2" onChange={handleInputcheckboxChange} name='special_offer' value={pdata.special_offer === true ? true : false} checked /> :
                            <Form.Check className="mx-2" onChange={handleInputcheckboxChange} name='special_offer' value={pdata.special_offer === true ? true : false} />}
                          Special Offer
                        </Form.Label>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label
                          className="inputlabelheading"
                          sm="9 d-flex align-items-end"
                        >
                          {pdata.featured_product === true ?
                            <Form.Check className="mx-0" value={pdata.featured_product ? true : false}
                              name='featured_product' onChange={handleInputcheckboxChange} checked /> :
                            <Form.Check className="mx-2" value={pdata.featured_product ? true : false}
                              name='featured_product' onChange={handleInputcheckboxChange} />
                          }

                          Featured Product
                        </Form.Label>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>

              {/* seo tag */}
              <div className="my-3 inputsection_box">
                <h5 className="m-0">Seo Tag</h5>
                <div className="productvariety">
                  <Form.Group className="mx-3" controlId="validationCustom11">
                    <div className=" d-flex align-items-center my-2">
                      <InputGroup className="" size="sm">
                        <Form.Control
                          sm="9"
                          onChange={ontagchange}
                          value={addtag}
                          onKeyPress={event => {
                            if (event.key === "Enter") {
                              ontagaddclick();
                            }
                          }
                          }
                        />
                        <Button variant="outline-success" className="addcategoryicon"
                          onClick={() => ontagaddclick()} size="sm">
                          +
                        </Button>

                      </InputGroup>

                    </div>

                    <div className="d-flex align-items-center tagselectbox mt-2" >
                      {(seoarray || []).map((seotags, i) => {
                        return (
                          <Badge className="tagselecttitle mb-0" bg="success" key={i}>{seotags}

                            <GiCancel
                              className=" mx-0 ms-1 btncancel"
                              onClick={() => tagRemoveClick(seotags)}
                            />

                          </Badge>

                        )

                      })}
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
                    onReady={editor => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(data)
                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }}
                  />

                </Col>
              </div>
              {/* input */}
              <div className="my-3 inputsection_box">
                <h5 className="m-0">Add Custom Input</h5>
                <div className=" mt-0 mb-3">
                  <Table className="align-middle" >
                    <thead>
                      <tr>
                        <th >Heading</th>
                        <th >Description</th>
                        <th ></th>
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
                              min={'1'}
                              onChange={oncustomheadChange}
                              name={'custom_input_header'}
                              className={(customvalidated === true) ? 'border-danger' : null}
                            />
                          </InputGroup>

                        </td>
                        <td className="col-4">
                          <InputGroup className="">
                            <Form.Control
                              className={(customvalidated === true) ? 'border-danger' : null}
                              value={descval}
                              name={'custom_input_desc'}
                              type="text"
                              sm="9"
                              min={'1'}
                              onChange={oncustomdescChange}
                              onKeyPress={event => {
                                if (event.key === "Enter") {
                                  handleAddClick();
                                }
                              }
                              }
                            />
                          </InputGroup>
                        </td>
                        <td className="">
                          <Button variant="outline-success" className="addcategoryicon"
                            onClick={() => handleAddClick()} size="sm">
                            +
                          </Button>

                        </td>
                      </tr>
                      {(pdata.add_custom_input || []).map((variantdata, i) => {
                        const arr = variantdata.split(',')
                        return (
                          <tr className="">
                            <td className=" text-center">
                              <InputGroup className="">
                                <Form.Control
                                  value={arr[0]}
                                  type="text"
                                  sm="9"
                                  min={'1'}
                                  onChange={oncustomheadChange}
                                  name={'custom_input_header'}
                                  required
                                />
                              </InputGroup>

                            </td>
                            <td className="text-center">
                              <InputGroup className="">
                                <Form.Control
                                  required
                                  value={arr[1]}
                                  name={'custom_input_desc'}
                                  type="text"
                                  sm="9"
                                  min={'1'}
                                  onChange={oncustomdescChange}
                                  onKeyPress={event => {
                                    if (event.key === "Enter") {
                                      handleAddClick();
                                    }
                                  }
                                  }
                                />
                              </InputGroup>
                            </td>
                            <td className="">
                              <Button variant="text-danger" className="addcategoryicon text-danger"
                                onClick={() => handleRemoveClick(variantdata)} size="sm">
                                &times;
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
                {/* );
                })} */}
                {/* --------------------------------------------- */}
              </div>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer className="addproductfooter">
          <Iconbutton
            btntext={" Cancel"}
            onClick={() => handleClose()}
            btnclass={"button main_outline_button px-2"}
          // Iconname={<GiCancel /> }
          />
          <MainButton btntext={"Save as Draft"} onClick={() => handleSaveDraft()} />
          <Iconbutton
            type={'submit'}
            btntext={(props.show === 2 ? "Update Product" : "Add Product")}
            onClick={(props.show === 2 ? handleUpdateProduct : handleAddProduct)}
            btnclass={"button main_button "}
          />
        </Modal.Footer>
      </Modal>
      {/* variety */}
      <Modal size="lg" show={props.show1} onHide={props.hide} dialogClassName="addproductmainmodal">
        <Form ref={formRef} validated={validated} onSubmit={onVariantaddclick}>
          <Modal.Header closeButton>
            <Modal.Title>Add Variety</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">

              <Form.Group
                className="mx-3"
              // controlId="validationCustom13"
              >
                <div className="variation_box my-2">
                  <div className="row">
                    <div className="col-auto">
                      <Table bordered className="align-middle my-2">
                        <thead className="align-middle">
                          <tr>
                            <th >Variety</th>
                            <th >Color</th>
                            <th >Weight/Size</th>
                            <th >Price</th>
                            <th >Mrp</th>
                            <th >Sale Price</th>
                            <th >Discount</th>
                            <th >Special Offer</th>
                            <th >Featured Product</th>
                            <th className="manufacture_date">Mdate</th>
                            <th className="manufacture_date">Edate</th>
                            <th className="manufacture_date">Image</th>
                            <th className="manufacture_date">Quantity</th>
                            <th ></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-0 text-center">
                              <div className=" d-flex align-items-center">
                                <InputGroup className="" size="sm">
                                  <Form.Select aria-label="Default select example" name='variations' value={data1.variations} onChange={(e) => {
                                    // setvariantmainarray('');
                                    setcustomValidated(false)
                                    setvarietyval(e.target.value);
                                    setvariantarray({
                                      ...variantarray,
                                      variations: e.target.value
                                    });
                                  }}
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                  >
                                    <option value={''} >Select</option>
                                    {(varietyy.variety || []).map((vari, i) => {
                                      return (
                                        <option value={vari} key={i}>{vari}</option>
                                      );
                                    })}
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
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={onVariantChange}
                                    name={'colorname'}
                                    value={data1.colorname}
                                  />
                                </InputGroup>
                              </div>
                            </td>

                            <td className="p-0 text-center">
                              <div className=" d-flex align-items-center">
                                <InputGroup className="" size="sm">
                                  <Form.Control
                                    value={(data1.variations === 'weight' ? data1.weight : data1.variations === 'volume' ? data1.volume : data1.variations === 'piece' ? data1.piece : data1.variations === 'color' ? data1.size : null)}
                                    type="text"
                                    sm="9"
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={onVariantChange}
                                    name={(varietyval === 'weight' ? 'weight' : varietyval === 'volume' ? 'volume' : varietyval === 'piece' ? 'piece' : varietyval === 'color' ? 'size' : null)}
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
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={onVariantChange}
                                    name={'price'}
                                    value={data1.price}
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
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={onVariantChange}
                                    name={'mrp'}
                                    value={data1.mrp}

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
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={onVariantChange}
                                    name={'sale_price'}
                                    value={data1.sale_price}
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
                                    onChange={onVariantChange}
                                    name={'discount'}
                                    value={data1.discount}
                                  />
                                </InputGroup>

                              </div>
                            </td>
                            <td className="p-0 text-center">
                              <div className="">
                                <Form.Check
                                  onChange={onVariantChange}
                                  name={'special_offer'}
                                  value={data1.special_offer}
                                />
                              </div>
                            </td>
                            <td className="p-0 text-center">
                              <div className="">
                                <Form.Check
                                  onChange={onVariantChange}
                                  name={'featured_product'}
                                  value={data1.featured_product}
                                />
                              </div>
                            </td>
                            <td className="p-0 text-center">
                              <div className="manufacture_date" >
                                <InputGroup className="" size="sm">
                                  <Form.Control
                                    type="date"
                                    sm="9"
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={onVariantChange}
                                    name={'manufacturing_date'}
                                    value={data1.manufacturing_date}
                                  />
                                </InputGroup>

                              </div>
                            </td>
                            <td className="p-0 text-center">
                              <div className="manufacture_date" >
                                <InputGroup className="" size="sm">
                                  <Form.Control
                                    type="date"
                                    sm="9"
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={onVariantChange}
                                    name={'expire_date'}
                                    value={data1.expire_date}
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
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={imguploadchange}
                                    name={'product_img'}

                                  />
                                </InputGroup>

                              </div>
                            </td>
                            <td className="p-0">
                              <div className="manufacture_date">
                                <InputGroup className="" size="sm">
                                  <Form.Control
                                    name={'quantity'}
                                    type="number"
                                    value={data1.quantity}
                                    sm="9"
                                    min={'1'}
                                    className={(customvalidated === true) ? 'border-danger' : null}
                                    onChange={onVariantChange}
                                    onKeyPress={event => {
                                      if (event.key === "Enter") {
                                        onVariantaddclick();
                                      }
                                    }
                                    }
                                  />
                                </InputGroup>
                              </div>
                            </td>
                            <td className="p-0">
                              <div className=" d-flex align-items-center">
                                <Button variant="outline-success" className="addcategoryicon"
                                  type="submit"
                                  onClick={onVariantaddclick}
                                  size="sm">
                                  +
                                </Button>
                              </div>
                            </td>
                          </tr>

                          {
                            (variantmainarray || []).map((variantdata, i) => {
                              return (
                                <tr >
                                  <td className="p-0 text-center ">
                                    {variantdata.variations}
                                  </td>
                                  <td className="p-0 text-center ">
                                    {variantdata.colorname}
                                  </td>
                                  <td className="p-0 text-center ">
                                    {(variantdata.variations === 'color' ? variantdata.size : variantdata.variations === 'weight' ? variantdata.weight : variantdata.variations === 'volume' ? variantdata.volume : variantdata.variations === 'piece' ? variantdata.piece : null)}
                                  </td>
                                  <td className="p-0 text-center ">
                                    {variantdata.price}
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
                                    <Carousel indicators={false} controls={false}>
                                      {(variantdata.product_img || []).map((data) => {
                                        return (
                                          <Carousel.Item interval={1000}>
                                            <img src={data} alt='apnaorganic' width={50} />
                                          </Carousel.Item>
                                        )
                                      })}
                                    </Carousel>
                                  </td>
                                  <td className="p-0 text-center">
                                    {variantdata.quantity}
                                  </td>
                                  <td className="p-0 text-center">
                                    <Button variant="text-danger" className="addcategoryicon text-danger"
                                      onClick={() => VariantRemoveClick(variantdata)} size="sm">
                                      x
                                    </Button>
                                    <Button variant="text-danger" className="addcategoryicon text-danger"
                                      onClick={() => VariantEditClick(variantdata)} size="sm">
                                      <MdOutlineEdit />
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Form.Group>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className='button main_outline_button' onClick={props.hide}>Cancel</button>
            <button className='button main_button' onClick={() => handleClose()}>Save</button>
          </Modal.Footer>
        </Form>
      </Modal>

    </div>
  );
};

export default Addproduct;
