import React, { useEffect, useState, useRef } from "react";

import Col from "react-bootstrap/Col";

// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Badge } from "react-bootstrap";
import MainButton from "./common/button";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "./common/iconbutton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { RiImageAddLine } from "react-icons/ri";
import InputGroup from "react-bootstrap/InputGroup";
import VariationJson from "./json/variation";
import CategoryJson from "./json/categorytype";
import Table from "react-bootstrap/Table";
import FileInput from "./setting/FileInput";
import { GiCancel } from "react-icons/gi";

import ImageCropper from "./setting/ImageCropper";
import {
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import SAlert from "./common/salert";
import axios from "axios";
import { Button } from "react-bootstrap";
import moment from "moment/moment";
import BrandJson from "./json/BrandJson";
import { downloadExcel } from "react-export-table-to-excel";
import productstatus from "../admin/json/Status";
import Loader from "./common/loader";
let encoded;
let ImgObj = [];
function Product() {
  const [CategoryEditdata, setCategoryEditData] = useState([]);
  console.log(CategoryEditdata)
  const [show, setShow] = useState(false);
  console.log(show)
  // const [cover,setCover]=useState("cover")
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  console.log(imgAfterCrop)

  const [newImageUrls, setnewImageUrls] = useState([]);

  const [image, setImage] = useState("");
  const [imageName, setimageName] = useState("");

  ClassicEditor.defaultConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "insertTable",
        "|",
        "undo",
        "redo",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    language: "en",
  };

  const navigate = useNavigate();
  let [searcherror, setsearcherror] = useState(false);
  const [open, setOpen] = useState(false);
  const [changeUnitproperty, setChangeUnitProperty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkProductType, setCheckProductType] = useState(false);
  const [error, setError] = useState(true);
  const [vendorid, setVendorId] = useState([]);

  const [filtervategory, setfiltercategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [indVal, setIndVal] = useState(0);
  const [subCategory, setSubCategory] = useState([]);
  const [childCategory, setchildCategory] = useState([]);
  const [grandcCategory, setgrandcCategory] = useState([]);
  console.log(grandcCategory);
  const [scategory, setScategory] = useState({
    parent_category: "",
    sub_category: "",
    childcategory: "",
    gcategory: "",
  });

  // console.log(cat_catname)

  const [categoryeditparent, setCategoryEditparent] = useState("");
  const [categoryeditsubparent, setCategoryEditSubparent] = useState("");
  console.log(categoryeditsubparent);

  const [categoryeditchildparent, setCategoryEditChildparent] = useState("");

  const [level, setlevel] = useState("");
  console.log(level);

  const [pdata, setpdata] = useState([]);
  // console.log("PDAYTAA>NAME"+JSON.stringify(pdata.category_name))

  const [variantid, setvariantid] = useState("");
  console.log(variantid);

  const [productid, setproductid] = useState("");
  const [Alert, setAlert] = useState(false);
  const [VerityAlert, setVerityAlert] = useState(false);
  const [varietyValidation, setvarietyValidated] = useState(false);
  const [ProductDraftAlert, setProductDraftAlert] = useState(false);
  const [UpdatetAlert, setUpdatetAlert] = useState(false);
  const [ProductAlert, setProductAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [variantapicall, setvariantapicall] = useState(false);
  const [varietyshow, setvarietyShow] = useState(false);
  const [addtag, setaddtag] = useState();
  const [validated, setValidated] = useState(false);
  const [customvalidated, setcustomValidated] = useState(false);
  const [modalshow, setmodalshow] = useState(false);
  const [unitValidated, setunitValidated] = useState(false);
  const [varietyUnitvalidation, setVarietyUnitvalidation] = useState("");
  var veriantData = {
    product_status: "pending",
    product_id: "",
    unit: "",
    colors: "",
    unit_quantity: "",
    size: "",
    product_price: "",
    mrp: "",
    sale_price: "",
    discount: "0",
    special_offer: false,
    featured_product: false,
    manufacturing_date: "",
    expire_date: "",
    quantity: "",
  };

  const [totaltax, settotaltax] = useState("");
  const [variantarray, setvariantarray] = useState(veriantData);


  const [variantmainarray, setvariantmainarray] = useState([]);
  // const [productvariantarray, setproductvariantarray] = useState(veriantData);
  const [data1, setdata1] = useState("");
  console.log(data1);
  const [otherintro, setotherintro] = useState("");
  console.log(otherintro);

  const [headerval, setheaderval] = useState("");
  const [descval, setdescval] = useState("");
  const [customarray, setcustomarray] = useState([]);
  const [AddCustom, setAddCustom] = useState({
    header: [],
    description: [],
  });
  const [vdata, setvdata] = useState([]);
  // let [condition, setCondition] = useState(false);
  // var category_name={

  // }
  var data = {
    add_custom_input: [],
    product_title_name: "",
    product_slug: "",
    store_name: "",
    product_type: "",
    category: [],
    parent_category: "",
    wholesale_sales_tax: "0",
    gst: "0",
    cgst: "0",
    sgst: "0",
    retails_sales_tax: "0",
    value_added_tax: "0",
    manufacturers_sales_tax: "0",
    manufacturing_date: "",
    expire_date: "",
    seo_tag: [],
    variety: "",
    product_description: "",
    other_introduction: "",
    vendor_id: "",
    shop: "",
    show_product_rating: "0",
  };
  const [RestoreAlert, setRestoreAlert] = useState(false);
  const [productdata, setproductdata] = useState(data);
  const mainformRef = useRef();
  const formRef = useRef();
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    vendor: "",
    brand: "",
    tag: "",
    category: "",
    product_status: "",
  });

  const [variantremove, setVariantRemove] = useState([]);
  const [editbutton, setEditButton] = useState(false);
  console.log(editbutton)
  const [taxdata, settaxdata] = useState({
    wholesale_sales_tax: "0",
    gst: "0",
    cgst: "0",
    sgst: "0",
    retails_sales_tax: "0",
    value_added_tax: "0",
    manufacturers_sales_tax: "0",
  });
  const [productID, setproductID] = useState("");
  const [bulkProductError, setBulkProductError] = useState("");
  const [AddtagError, setAddTagError] = useState("");
  console.log(AddtagError)

  const [Docnamearray, setDocnameArray] = useState([]);

  // OFFER ADD MODAL
  const [featureshow, setfeatureShow] = useState(false);
  const [featuredata, setfeaturedata] = useState({
    start_date: "",
    end_date: "",
    product_id: "",
    fetured_type: "",
  });
  //ADD SEO TAG
  const onDocuAddclick = () => {

    if (addtag !== "") {
      setDocnameArray((Docnamearray) => [...Docnamearray, addtag]);
      console.log(Docnamearray)
      setaddtag("");
      setAddTagError("");
      setcustomValidated(false);
      setOpen(false)

    }
    else {
      setcustomValidated(true);

      //     setaddtag(e.target.value);
      // console.log("e.target.value")

      // console.log(e.target.value)

    }
  };

  const onDocumentNamechange = (e) => {
    setaddtag(e.target.value);
    // console.log("e.target.value")
    // console.log(e.target.value)
  };

  const DocuRemoveClick = (e) => {
    setDocnameArray(Docnamearray.filter((item) => item !== e));
  };

  const [productname, setproductname] = useState("");

  const OnOfferProductAdd = (e) => {
    setValidated(true)
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BASEURL_0}/add_fetured_product`,
        featuredata,
        {
          headers: { admin_token: `${token}` },
        }
      )
      .then((response) => {

        if (response.data.message === "Already_Exist") {
          setError(false);
        } else {
          setRestoreAlert(true);
          setapicall(true);
          setfeatureShow(false);
          setfeaturedata({
            start_date: "",
            end_date: "",
          });
          setError("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const featureModalClose = (e) => {
    setfeatureShow(false);
    setError("");
    setfeaturedata({ start_date: "", end_date: "" });
  };
  // const featureModalShow = () => setfeatureShow(true);
  const OnProductOfferClick = (e, productid, productname) => {
    setfeaturedata({
      ...featuredata,
      product_id: `${productid}`,
      fetured_type: e,
    });
    setproductname(productname);
    setfeatureShow(true);
  };
  const OnFeatureDateChaneg = (e) => {
    setfeaturedata({ ...featuredata, [e.target.name]: e.target.value });
  };

  // OFFER ADD MODAL END

  // PRODUCT STATUS CHANGE API
  const onProductStatusChange = (e, id, productid) => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_BASEURL_0}/product_status_update`,
        {
          id: `${id}`,
          product_id: `${productid}`,
          product_status: e.target.value,
        },
        {
          headers: { admin_token: `${token}` },
        }
      )
      .then((response) => {
        setLoading(false);
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

  };
  // PRODUCT STATUS CHANGE API END

  // MAIN PRODUCT LIST API
  const fetchdata = () => {
    let productArry = [];
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BASEURL_0}/home?page=0&per_page=400`,
        {
          product_search: {
            search: [`${searchdata.product_title_name}`],
            price_from: "",
            price_to: "",
            id: "",
            sale_price: "",
            short_by_updated_on: "",
            product_title_name_asc_desc: "",
            category: [`${searchdata.category}`],
            product_status: [`${searchdata.product_status}`],
            is_delete: ["1"],
            colors: [],
            size: [],
            seo_tag: [`${searchdata.tag}`],
            parent_category: [],
            product_type: [],
            // product_title_name: [],
            brand: [`${searchdata.brand}`],
            shop: [`${searchdata.vendor}`],
          },
        },
        {
          headers: { admin_token: `${token}` },
        }
      )
      .then((response) => {
        let v = response.data.results;
        v.forEach(function (item, index) {

          // console.log(item.category)
          // console.log(response.data.category_name[item.category])
          let catname = response.data.category_name[item.category]
          // console.log(catname)
          // console.log(item)

          item.category = catname;
          // console.log("item"+JSON.stringify(item))

          productArry.push(item)
        }
        );
        let response_data = {};
        response_data["results"] = productArry;
        //  console.log("response_data")
        //  console.log(response_data)
        setpdata(response_data)
        setLoading(false);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // const first = "";
    fetchdata();
    getVendorData();
    getCategorydatafilter();
  }, [apicall, variantapicall, Alert]);

  //MAIN PRODUCT LIST API END

  // PRODUCT DELETE ALERT
  // let filtered;
  const handleAlert = (id) => {
    setAlert(true);
    setVariantRemove({ ...variantremove, id: id[0], productid: id[1] });
    setvariantid(id[0]);
    setproductid(id[1]);
  };
  // END PRODUCT DELETE ALERT

  //  json
  var varietyy = VariationJson;

  var categorytype = CategoryJson;
  const OnProductNameClick = (id) => {
    localStorage.setItem("variantid", id[0]);
    localStorage.setItem("productid", id[1]);
    navigate("/productdetail");
  };
  // CATEGORY SELECT SHOW ON PRODUCT ADD
  const categoryFormChange = (e, id) => {
    setIndVal(e.target.value);
    setScategory({ ...scategory, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (indVal === "") {
      setSubCategory("");
      setchildCategory("");
      //   setgrandcCategory("");
      //   setproductdata({
      //     ...productdata,
      //     category: indVal,
      //   });
    } else {
      axios
        .get(`${process.env.REACT_APP_BASEURL_0}/category?category=${indVal}`)
        .then((response) => {
          if (response.data !== []) {
            let cgory = response.data;
            if (indVal === scategory.parent_category) {
              setSubCategory(cgory);
              setproductdata({
                ...productdata,
                parent_category: "0",
                category: indVal,
              });
            } else if (indVal === scategory.sub_category) {
              setchildCategory(cgory);

              setproductdata({
                ...productdata,
                parent_category: cgory[0].all_parent_id,
                category: indVal,
              });
              setlevel(2);
            } else if (indVal === scategory.childcategory) {
              setgrandcCategory(cgory);
              setproductdata({
                ...productdata,
                parent_category: cgory.all_parent_id,
                category: indVal,
              });
              setlevel(3);
            } else if (indVal === scategory.gcategory) {
              setgrandcCategory(cgory);
              setproductdata({
                ...productdata,
                parent_category: cgory[0].all_parent_id,
                category: indVal,
              });
              setlevel(4);
            }
          }
        });
    }
  }, [scategory, indVal]);
  //category name api for filter


  // vendor api for filter
  const getVendorData = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL_0}/vendors`,
          { vendor_id: "all" },
          {
            headers: { admin_token: `${token}` },
          }
        )
        .then((response) => {
          let cgory = response.data;
          const result = cgory.filter(
            (thing, index, self) =>
              index === self.findIndex((t) => t.shop_name === thing.shop_name)
          );
          const result1 = result.filter(
            (item) => item.status === "approved" || item.status === "active"
          );
          setVendorId(result1);
          // setVid("")
        });
    } catch (err) { }
  };
  // end vendor api

  // category api for filter
  const getCategorydatafilter = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASEURL_0}/category?category=all`)
        .then((response) => {
          let cgory = response.data;
          setfiltercategory(cgory);
        });
    } catch (err) { }
  };
  // end category api

  // modal
  const [editparentCategory, seteditparentCategory] = useState("");
  let token = localStorage.getItem("token");
  // ADD AND EDIT PRODUCT MODAL

  const handleShow = (e) => {

    setproductdata(data);
    // vendor
    getVendorData();
    // end vendor api

    // category data
    const getCategorydata = () => {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL_0}/category?category=${indVal}`)
          .then((response) => {
            let cgory = response.data;

            if (indVal === 0) {
              setCategory(cgory);
              setSubCategory("");

              setlevel(0);
            }
          });
      } catch (err) { }
    };
    getCategorydata();
    // end category data

    if (e === "add") {
      setmodalshow(e);
    } else {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/product_details?id=${e}`)
        .then((response) => {
          let data = response.data;
          if (data !== undefined || data !== "" || data !== null) {
            setproductdata(data);
            console.log("BHAVNAA" + JSON.stringify(data))
            // categoryedit

            const arr = data.parent_category.split(",");
            for (let i = 0; i < arr.length; i++) {
              console.log("&&&&&&&&&&" + arr)

              axios
                .get(
                  `${process.env.REACT_APP_BASEURL_0}/category_details?id=${arr[i]}`
                )
                .then((response) => {
                  let data = response.data[0];
                  setCategoryEditData(data);

                  if (i === 0) {
                    axios
                      .get(
                        `${process.env.REACT_APP_BASEURL_0}/category?category=${arr[i]}`
                      )
                      .then((response) => {
                        console.log(
                        );
                        setSubCategory(response.data);
                      });
                    seteditparentCategory(data.category_name);
                    console.log("PPPPPPP-000" + editparentCategory)
                    setCategoryEditparent(data.category_name);
                    console.log("88uuuuuuuuuHHHHH" + categoryeditparent)


                  } else if (i === 1) {
                    axios
                      .get(
                        `${process.env.REACT_APP_BASEURL_0}/category?category=${arr[i]}`
                      )
                      .then((response) => {

                        setchildCategory(response.data);
                      });
                    setCategoryEditparent(data.category_name);

                    setCategoryEditSubparent(data.category_name);
                    setCategoryEditChildparent(data.category_name);
                  } else if (i === 2) {
                    axios
                      .get(
                        `${process.env.REACT_APP_BASEURL_0}/category?category=${arr[i]}`
                      )
                      .then((response) => {

                        setgrandcCategory(response.data);
                      });
                    setCategoryEditSubparent(data.category_name);
                    setCategoryEditChildparent(data.category_name);
                  } else if (i === 3) {
                    setCategoryEditChildparent(data.category_name);
                  }
                  setCategoryEditData(data)
                });
            }
            // end category edit api
          }

          let customdatra = JSON.parse(response.data.add_custom_input);
          setcustomarray(customdatra);
        })
        .catch(function (error) {
          console.log(error);
        });
      setmodalshow(e);
    }
  };
  useEffect(() => {
    handleShow();
  }, []);

  // ONADD PRODUCT INPUT  CHANGE
  const handleInputFieldChange = (e) => {
    setCheckProductType(false);
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
    settaxdata({
      ...taxdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleVendorNameChange = (e) => {
    let arr = e.target.value.split(",");
    setproductdata({
      ...productdata,
      store_name: arr[1],
      vendor_id: arr[0],
      shop: arr[1],
    });
  };

  const handleClose = () => {

    setShow(false)

    setValidated(false);
    setmodalshow(false);
    setCurrentPage("choose-img");
    setIndVal(0);
    setCategoryEditData("");
    setproductdata(data);
    setcustomarray([]);
    setvariantarray(veriantData);
    setvariantmainarray([]);
    setcustomValidated(false);
    setVarietyUnitvalidation("");
    setvarietyValidated(false);
  };
  // END ADD AND EDIT PRODUCT MODAL

  // seotag
  // let tagname;
  // const ontagchange = (e) => {
  //   tagname = e.target.value;
  //   setaddtag(tagname);
  // };

  // const tagRemoveClick = (e) => {
  //   setproductdata({ ...productdata, seo_tag: "" });
  //   // setseoArray(seoarray.filter((item) => item !== e));
  // };
  // const ontagaddclick = (e) => {
  //   if (addtag === "") {
  //     setunitValidated("seotagclick");
  //   } else {
  //     setunitValidated("");
  //     setproductdata({
  //       ...productdata,
  //       seo_tag: addtag,
  //     });
  //   }
  //   setaddtag("");
  // };
  // END SEO TAG ADD
  // IMAGE UPLOAD SECTION
  // const convertToBase64 = (file) => {
  //   console.log("baseeeeeeeeeeeeee");
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     const { name } = file;
  //     fileReader.addEventListener("load", () => {
  //       resolve({ name: name, base64: fileReader.result });
  //     });
  //     fileReader.readAsDataURL(file);
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };
  const onImageSelected = (event) => {
    if (event.target.files[0].name && event.target.files.length > 0) {
      const reader = new FileReader();
      const image_name = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = function () {
        console.log("stage1 ")
        setImage(reader.result);
        setimageName(image_name)
        // onImageSelected({ "dataurl": reader.result, "imageName": image_name });
      };


      setCurrentPage("crop-img");
      // setShow(true)
    }
  };


  // const handleClose=(mclose)=>{
  //    setShow(mclose.false)
  //    console.log("")
  //    console.log(mclose.false)

  // };
  const onCropDone = (imgCroppedArea, product_id, id, vendor_id) => {

    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;

    canvasEle.height = imgCroppedArea.height;
    const context = canvasEle.getContext("2d");
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");

      imguploadchange(dataURL, product_id, id, vendor_id)
      onImgView(id, product_id)

      // console.log("VARIENT IDDD+"+id)
      setimageboxid(imageboxid);
      setCurrentPage("img-cropped");
    };
    setapicall(true)

  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  const imguploadchange = async (dataURL, product_id, id, vendor_id) => {
    setcustomValidated("");
    onImgView(id, product_id);
    setimageboxid(id);
    console.log("IMAGEBOXXXIDDD" + imageboxid)

    // let i

    for (var i = 0; i < imageName.length; i++) {
      var coverimg;

      console.log("ggggggggg" + coverimg)
      if (newImageUrls.length === 0 && i === 0) {
        coverimg = "cover";
      } else {
        coverimg = `cover${i}`;

      }
    }
    //   encoded = await convertToBase64(e.target.files[i]);
    encoded = dataURL;
    const [first, ...rest] = encoded.split(",");
    let imgvalidation = first.split("/").pop();
    if (
      imgvalidation === "jpeg;base64" ||
      imgvalidation === "jpg;base64" ||
      imgvalidation === "png;base64"
    ) {
      const productimg = rest.join("-");
      let imar = {
        product_id: `${product_id}`,
        product_verient_id: `${imageboxid}`,
        vendor_id: `${vendor_id}`,
        product_image_name: `${imageName}${i}${imageboxid}`,
        image_position: coverimg,
        img_64: productimg,
      };


      ImgObj.push(imar);
      axios
        .post(`${process.env.REACT_APP_BASEURL}/product_images`, ImgObj)
        .then((response) => {

          ImgObj = [];
          setcustomValidated("");
          setimageboxid("");

          setapicall(true)
          onImgView(id, product_id);

        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setcustomValidated("imgformat");

    }
    setProductAlert(true);

  };


  const [imageboxid, setimageboxid] = useState(0);

  const onImgView = (id, productid) => {
    setEditButton(false);
    setimageboxid(id);

    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`
      )
      .then((response) => {
        setnewImageUrls(response.data)
        setapicall(true);
        setmodalshow(false);
        setImgAfterCrop("")

      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const onImgCoverEditClick = (imgid, productid, productvariantid) => {

    axios
      .put(`${process.env.REACT_APP_BASEURL}/change_porduct_cover_image`, {
        product_image_id: `${imgid}`,
        product_id: `${productid}`,
        product_verient_id: `${productvariantid}`,
      })
      .then((response) => {
        onImgView(productvariantid, productid);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onImgRemove = (id, name, vendor_id, product_id, product_verient_id) => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/product_image_delete`, {
        product_image_id: `${id}`,
        product_image_name: `${name}`,
        vendor_id: `${vendor_id}`,
      })
      .then((response) => {
        setapicall(true);

        onImgView(product_verient_id, product_id);

      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // ADD AND EDIT  VARIETY SECTION
  const onVariantChange = (e) => {
    // setValidated(true);
    setcustomValidated(false);
    setVarietyUnitvalidation("");
    setvarietyValidated(false);
    setvariantarray({
      ...variantarray,
      [e.target.name]: e.target.value,
    });


  };


  let discountt = (variantarray.mrp * variantarray.discount) / 100;
  let saleprice = variantarray.mrp - discountt;
  let totaltaxpercent =
    Number(taxdata.gst) +
    Number(taxdata.wholesale_sales_tax) +
    Number(taxdata.retails_sales_tax) +
    Number(taxdata.manufacturers_sales_tax) +
    Number(taxdata.value_added_tax);
  let totaltaxx = (saleprice * totaltaxpercent) / 100;

  let product_price = variantarray.sale_price - totaltaxx;
  useEffect(() => {
    // let discountt = (variantarray.mrp * variantarray.discount) / 100;
    // let saleprice = variantarray.mrp - discountt;
    // let totaltaxpercent =
    //   Number(taxdata.gst) +
    //   Number(taxdata.wholesale_sales_tax) +
    //   Number(taxdata.retails_sales_tax) +
    //   Number(taxdata.manufacturers_sales_tax) +
    //   Number(taxdata.value_added_tax);
    // let totaltaxx = (saleprice * totaltaxpercent) / 100;
    settotaltax(totaltaxx);
    // let product_price = saleprice - totaltaxx;
    setvariantarray({
      ...variantarray,
      product_status: "pending",
      product_price: `${product_price}`,
      sale_price: `${saleprice}`,
    });
  }, [variantarray.mrp, variantarray.discount, taxdata]);
  // const handleInputcheckboxChange = (e) => {
  //   setcustomValidated(false);
  //   const target = e.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   setvariantarray({
  //     ...variantarray,
  //     [e.target.name]: value,
  //   });
  // };
  // const handleVarietyChange = (e) => {
  //   setValidated(false);
  //   setcustomValidated(false);
  //   setVarietyUnitvalidation("");
  //   setvarietyValidated(false);
  //   setvariantarray({
  //     ...variantarray,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const getProductVariant = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL_0}/home?page=0&per_page=400`,
        {
          product_search: {
            search: "",
            category: [],
            price_from: "",
            price_to: "",
            id: "",
            product_title_name_asc_desc: "",
            sale_price: "",
            short_by_updated_on: "",
            is_delete: ["1"],
            product_id: [`${id}`],
            product_title_name: [],
          },
        },
        {
          headers: { admin_token: `${token}` },
        }
      )
      .then((response) => {
        setvdata(response.data.results);
        settaxdata(response.data.results[0]);
        setvariantapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // ADD VARIETY MODAL
  const handlevarietyShow = (id, variantid) => {
    console.log("----")
    console.log(variantid)

    // START GET THE SELECTED VARIENT DATA------------------------------------------------------
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/products_pricing?id=${variantid}&product_id=${id}`
      )
      .then((response) => {
        setvariantarray({
          ...variantarray,
          unit: response.data[0].unit,
          product_id: id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    // END GET THE SELECTED VARIENT DATA------------------------------------------------------

    getProductVariant(id);
    onImgView(variantid, id);
    setvariantarray({
      ...variantarray,
      product_id: id,
    });
    setproductID(id);
    setvarietyShow(true);
  };

  const handlevarietyClose = (e) => {
    setChangeUnitProperty(false);
    setvariantarray(veriantData);
    setVarietyUnitvalidation("");
    setcustomValidated(false);
    setvarietyShow(false);
  };
  const onVariantaddclick = (id) => {
    if (id === undefined || id === null || unitValidated === "false") {
      if (
        variantarray.unit === "" ||
        variantarray.unit === null ||
        variantarray.unit === "Select" ||
        variantarray.product_price === "" ||
        variantarray.mrp === "" ||
        variantarray.sale_price === "" ||
        variantarray.manufacturing_date === "" ||
        variantarray.expire_date === "" ||
        variantarray.quantity === ""
        // variantarray.product_price == "" ||
        // variantarray.mrp == "" ||
        // variantarray.sale_price == "" ||
        // variantarray.manufacturing_date == "" ||
        // variantarray.expire_date == "" ||
        // variantarray.quantity == ""
      ) {
        setcustomValidated(true);
        setValidated(true);
      } else if (variantarray.quantity === 0 || variantarray.quantity < 1) {
        setVarietyUnitvalidation("QwanityValidation");
      } else if (variantarray.manufacturing_date > variantarray.expire_date) {
        setVarietyUnitvalidation("ExpireDateValidation");
      } else if (
        vdata[0].product_type === "Cloths" &&
        variantarray.unit === "pcs" &&
        (variantarray.colors === "" ||
          variantarray.size === null ||
          variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&size&color");
      } else if (
        vdata[0].product_type !== "Cloths" &&
        variantarray.unit === "pcs" &&
        variantarray.colors === "" &&
        (variantarray.size === null || variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&color");
      } else if (
        variantarray.unit !== "pcs" &&
        (variantarray.unit_quantity === "" ||
          variantarray.unit_quantity === "null" ||
          variantarray.unit_quantity === null)
      ) {
        setVarietyUnitvalidation("unitQwanity&size&color");
      } else if (Number(variantarray.discount) > 100) {
        setVarietyUnitvalidation("discountmore");
      } else if (
        Number(variantarray.mrp) > 50000 ||
        Number(variantarray.mrp) <= 0
      ) {
        setVarietyUnitvalidation("mrpmore");
      } else {
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/products_varient_add`,
            variantarray
          )
          .then((response) => {
            if ((response.affectedRows = "1")) {
              setProductAlert(true);
              setValidated(false);

              setvariantarray({
                product_status: "",
                colors: "",
                unit_quantity: "",
                size: "",
                product_price: "",
                mrp: "",
                sale_price: "",
                discount: "0",
                special_offer: false,
                featured_product: false,
                manufacturing_date: "",
                expire_date: "",
                quantity: "",
                product_id: productID,
              });
            } else if (response.errno === 1064) {
              alert("Error in add product");
              setProductAlert(false);
            } else {
              setProductAlert(false);
            }

            // formRef.reset();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      if (
        // variantarray.unit == "" ||
        // variantarray.unit == null ||
        // variantarray.unit == "Select" ||
        variantarray.product_price === "" ||
        variantarray.mrp === "" ||
        variantarray.sale_price === "" ||
        variantarray.manufacturing_date === "" ||
        variantarray.expire_date === "" ||
        variantarray.quantity === ""
      ) {
        setcustomValidated(true);
      } else if (variantarray.quantity === 0 || variantarray.quantity < 1) {
        setVarietyUnitvalidation("QwanityValidation");
      } else if (variantarray.manufacturing_date > variantarray.expire_date) {
        setVarietyUnitvalidation("ExpireDateValidation");
      } else if (
        vdata[0].product_type === "Cloths" &&
        variantarray.unit === "pcs" &&
        (variantarray.colors === "" ||
          variantarray.size === null ||
          variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&size&color");
      } else if (
        vdata[0].product_type !== "Cloths" &&
        variantarray.unit === "pcs" &&
        variantarray.colors === "" &&
        (variantarray.size === null || variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&color");
      } else if (
        variantarray.unit !== "pcs" &&
        (variantarray.unit_quantity === "" ||
          variantarray.unit_quantity === "null" ||
          variantarray.unit_quantity === null)
      ) {
        setVarietyUnitvalidation("unitQwanity&size&color");
      } else if (
        Number(variantarray.discount) > 100 ||
        Number(variantarray.discount) < 0
      ) {
        setVarietyUnitvalidation("discountmore");
      } else if (
        Number(variantarray.mrp) > 50000 ||
        Number(variantarray.mrp) <= 0
      ) {
        setVarietyUnitvalidation("mrpmore");
      } else {
        axios
          .put(
            `${process.env.REACT_APP_BASEURL}/products_varient_update`,
            variantarray
          )
          .then((response) => {
            setvariantarray({
              product_status: "",
              // unit: "",
              colors: "",
              unit_quantity: "",
              size: "",
              product_price: "",
              mrp: "",
              sale_price: "",
              discount: "0",
              special_offer: false,
              featured_product: false,
              manufacturing_date: "",
              expire_date: "",
              quantity: "",
              product_id: productID,
            });

            if ((response.affectedRows = "1")) {
              setUpdatetAlert(true);
            } else if (response.error) {
              alert("Error in add product");
              setUpdatetAlert(false);
            } else {
              setUpdatetAlert(false);
            }

            getProductVariant(productID);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
  // addproduct variant
  const VariantAddProduct = () => {

    // console.log("&&&&&"+e)
    setproductdata({
      ...productdata,
      variety: true,
    });
    if (productdata.product_type === "") {

      setCheckProductType(true);
    } else {
      if (
        variantarray.unit === "" ||
        variantarray.unit === undefined ||
        variantarray.unit === null ||
        variantarray.unit === "Select" ||
        variantarray.product_price === "" ||
        variantarray.mrp === "" ||
        variantarray.sale_price === "" ||
        variantarray.manufacturing_date === "" ||
        variantarray.expire_date === "" ||
        variantarray.quantity === ""
      ) {
        setcustomValidated(true);
      } else if (variantarray.quantity === 0 || variantarray.quantity < 1) {
        setVarietyUnitvalidation("QwanityValidation");
      } else if (variantarray.manufacturing_date > variantarray.expire_date) {
        setVarietyUnitvalidation("ExpireDateValidation");
      } else if (
        productdata.product_type === "Cloths" &&
        variantarray.unit === "pcs" &&
        (variantarray.colors === "" ||
          variantarray.size === null ||
          variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&size&color");
      } else if (
        productdata.product_type !== "Cloths" &&
        variantarray.unit === "pcs" &&
        variantarray.colors === "" &&
        (variantarray.size === "" || variantarray.size === null)
      ) {
        setVarietyUnitvalidation("fillUnit&color");
      } else if (
        variantarray.unit !== "pcs" &&
        (variantarray.unit_quantity === "" ||
          variantarray.unit_quantity === "null" ||
          variantarray.unit_quantity === null)
      ) {
        setunitValidated(true);
        setVarietyUnitvalidation("unitQwanity&size&color");
      } else if (Number(variantarray.discount) > 100) {
        setunitValidated(true);
        setVarietyUnitvalidation("discountmore");
      } else if (
        Number(variantarray.mrp) > 50000 ||
        Number(variantarray.mrp) <= 0
      ) {
        setunitValidated(true);
        setVarietyUnitvalidation("mrpmore");
      } else {
        setvariantmainarray((variantmainarray) => [
          ...variantmainarray,
          variantarray,
        ]);
        setVarietyUnitvalidation("");
        setvarietyValidated(false);
        setcustomValidated(false);

        setvariantarray({
          product_status: "pending",
          unit: variantarray.unit,
          colors: "",
          unit_quantity: "",
          size: "",
          product_price: "",
          mrp: "",
          sale_price: "",
          discount: "0",
          special_offer: false,
          featured_product: false,
          manufacturing_date: "",
          expire_date: "",
          quantity: "",
          product_id: productID,
        });
        // setcustomValidated(false);setvariantmainarray
      }
    }
  };
  // addproduct variant end
  const VariantRemoveClick = (id, productid) => {
    setVerityAlert(true);
    setVariantRemove((variantremove) => {
      return { ...variantremove, id: id, productid: productid };
    });
    setvariantarray({
      product_status: "",
      colors: "",
      unit_quantity: "",
      size: "",
      product_price: "",
      mrp: "",
      sale_price: "",
      discount: "0",
      special_offer: false,
      featured_product: false,
      manufacturing_date: "",
      expire_date: "",
      quantity: "",
      product_id: productID,
    });
  };

  const MainVariantRemoveClick = (e) => {
    setvariantmainarray(variantmainarray.filter((item) => item !== e));
  };

  const hideAlert = () => {
    if (vdata.length === 1) {
      setVerityAlert(false);
      setRestoreAlert(false);
      setvarietyShow(false);
      setapicall(true);
    }
    if (vdata.length === 2) {
      setChangeUnitProperty("editvariety");
    }
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete_remove`, {
        varient_id: variantremove.id,
        product_id: variantremove.productid,
        is_delete: "0",
      })
      .then((response) => {
        getProductVariant(variantremove.productid);
      })
      .catch(function (error) {
        console.log(error);
      });

    // variety delete
    setVerityAlert(false);
    setRestoreAlert(false);
  };

  const deleteProductAlert = () => {
    // product delete
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete_remove`, {
        varient_id: variantremove.id,
        product_id: variantremove.productid,
        is_delete: "0",
      })
      .then((response) => {
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    // variety delete
    setAlert(false);
  };

  const closeAlert = () => {
    setAlert(false);
    setVerityAlert(false);
  };

  const closeProductAlert = () => {
    setProductAlert(false);
    setProductDraftAlert(false);
    setunitValidated(false);
    setcustomValidated(false);
    getProductVariant(productID);
    setUpdatetAlert(false);
  };

  const VariantEditClick = (id, productid) => {
    if (vdata.length === 1) {
      setChangeUnitProperty(true);
    }
    setVarietyUnitvalidation("");
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
      product_slug: productdata.product_title_name + "_123",
      price: variantmainarray,
    });
  }, [variantmainarray]);

  // ADD CUSTOM INPUT
  const oncustomheadChange = (e) => {
    setheaderval(e.target.value);
    setAddCustom((AddCustom) => {
      return { ...AddCustom, header: e.target.value };
    });
  };
  const oncustomdescChange = (e) => {
    setdescval(e.target.value);
    setAddCustom((AddCustom) => {
      return { ...AddCustom, description: e.target.value };
    });
  };
  const handleAddClick = (e) => {
    if (headerval !== "" && descval !== "") {
      setcustomarray((customarray) => [...customarray, AddCustom]);
      setheaderval("");
      setdescval("");
      setAddCustom("");
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
  // END ADD CUSTOM INPUT
  useEffect(() => {
    setproductdata({ ...productdata, seo_tag: Docnamearray, })
  }, [Docnamearray])

  // CKEDITOR TEXT BOX
  const handledescription = (event, editor) => {
    setdata1(editor.getData());
    // console.log({ event, editor, data1 });

    let productdesc;
    if (editor.getData() !== undefined) {
      productdesc = editor.getData().replaceAll(/"/g, "'");
    }
    setproductdata({
      ...productdata,
      product_description: productdesc,
    });
  };
  // const handledescription = (event, editor) => {
  //   console.log("00000")
  //   setdata1(editor.getData());

  //   let productdesc;
  //   if (editor.getData() !== undefined) {
  //     productdesc = editor.getData().replaceAll(/"/g, "'");
  //   }
  //   setproductdata({
  //     ...productdata,
  //     product_description: productdesc,
  //   });

  // };
  const OtherDescription = (event, editor) => {
    setotherintro(editor.getData());
    // console.log({ event, editor, otherintro });
    let otherinstrction;
    if (editor.getData() !== undefined) {
      otherinstrction = editor.getData().replaceAll(/"/g, "'");
    }
    setproductdata({
      ...productdata,
      other_introduction: otherinstrction,
    });
  };
  // const OtherDescription = (event, editor) => {
  //   setotherintro(editor.getData());
  //   let otherinstrction;
  //   if (editor.getData() !== undefined) {
  //     otherinstrction = editor.getData().replaceAll(/"/g, "'");
  //   }
  //   setproductdata({
  //     ...productdata,
  //     other_introduction: otherinstrction,
  //   });
  // };
  // END CKEDITOR BOX

  let productdataa = [];
  // let scategoryy = [];

  // ADD PRICES ON ADDPRODUCT BUTTON
  useEffect(() => {
    let discountt = (variantarray.mrp * variantarray.discount) / 100;
    let saleprice = variantarray.mrp - discountt;
    setvariantarray({
      ...variantarray,
      product_price: (
        saleprice -
        (saleprice *
          (Number(productdata.gst) +
            Number(productdata.wholesale_sales_tax) +
            Number(productdata.retails_sales_tax) +
            Number(productdata.manufacturers_sales_tax) +
            Number(productdata.value_added_tax))) /
        100
      ).toFixed(2),
      sale_price: saleprice,
    });
  }, [
    variantarray.mrp,
    variantarray.discount,
    productdata.value_added_tax,
    productdata.gst,
    productdata.wholesale_sales_tax,
    productdata.retails_sales_tax,
    productdata.manufacturers_sales_tax,
  ]);
  // END  ADD PRICES ON ADDPRODUCT BUTTON

  // ADD PRODUCT AND SAVE TO DRAFT
  // const handleSaveDraft = (e) => {
  //   setproductvariantarray({
  //     ...productvariantarray,
  //     product_status: "draft",
  //   });
  //   productdataa.push(productdata);
  //   const form = e.currentTarget;
  //   if (
  //     form.checkValidity() === false ||
  //     productdata.variety === "" ||
  //     variantmainarray.length === 0
  //   ) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     setValidated(true);
  //     setcustomValidated(false);
  //     setvarietyValidated("varietyadd");
  //   } else {
  //     axios
  //       .post(`${process.env.REACT_APP_BASEURL}/products`, productdataa)
  //       .then((response) => {
  //         setProductDraftAlert(true);
  //         setapicall(true);
  //       });
  //   }
  // };
  const handleAddProduct = (e) => {
    productdataa.push(productdata);
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      productdata.variety === "" ||
      variantmainarray.length === 0 ||
      productdata.category === ""
    ) {
      e.stopPropagation();
      e.preventDefault();

      setValidated(true);
      setcustomValidated(false);
      setvarietyValidated("varietyadd");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL_0}/products`,

          productdataa,
          {
            headers: { admin_token: `${token}` },
          }
        )
        .then((response) => {
          localStorage.setItem("productid", productid)
          if (response.data.response === "please fill all input") {
            setcustomValidated("plesefillall");
            setValidated(false);
            setcustomValidated(false);
            setvarietyValidated(false);
            setapicall(true);


          } else {
            setapicall(true);
          }
        });
      e.preventDefault();
      setValidated(false);
      setcustomValidated(true);
      setProductAlert(true);
      setapicall(true);
      handleClose();
    }
  };
  // END ADD PRODUCT AND SAVE TO DRAFT

  // UPDATE PRODUCT COMMON DATA
  const handleUpdateProduct = (e) => {
    productdataa.push(productdata);

    const form = e.currentTarget;
    if (form.checkValidity() === false || variantmainarray.length !== 0) {
      e.stopPropagation();
      e.preventDefault();
      setValidated(true);
    } else {
      axios
        .put(`${process.env.REACT_APP_BASEURL}/products_update`, productdata)
        .then((response) => {
          setapicall(true);
          setmodalshow(false);
          setUpdatetAlert(true);
        })

        .catch(function (error) {
          console.log(error);
        });
      e.preventDefault();
      setValidated(false);
      setcustomValidated(true);
      setProductAlert(true);
      handleClose();
      // formRef.current.reset();

    }
  };
  // END UPDATE PRODUCT COMMON DATA

  // PRODUCT SEARCH , FILTER  AND RESET
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setsearcherror(false);
  };

  const onProductSearchClick = () => {
    if (
      searchdata.product_title_name === "" &&
      searchdata.product_status === "" &&
      searchdata.brand === "" &&
      searchdata.tag === "" &&
      searchdata.category === "" &&
      searchdata.vendor === ""
    ) {
      setsearcherror(true);
    } else {
      setapicall(true);
      setsearcherror(false);
    }
  };

  const OnReset = () => {
    setsearchData({
      product_title_name: "",
      product_status: "",
      vendor: "",
      brand: "",
      tag: "",
      category: "",
    });
    setapicall(true);
    setsearcherror(false);
  };
  // END PRODUCT SEARCH , FILTER  AND RESET

  //-----------------------Download excel sheet code start here---------------------------------------------------

  const header = [
    "product_code",
    "product_title_name",
    "product_slug",
    "store_name",
    "product_description",
    "product_type",
    "brand",
    "category",
    "parent_category",
    "seo_tag",
    "other_introduction",
    "add_custom_input",
    "wholesale_sales_tax",
    "manufacturers_sales_tax",
    "retails_sales_tax",
    "gst",
    "cgst",
    "sgst",
    "value_added_tax",
    "variety",
    "vendor_id",
    "shop",
    "colors",
    "size",
    "mrp",
    "product_price",
    "sale_price",
    "discount",
    "manufacturing_date",
    "expire_date",
    "special_offer",
    "featured_product",
    "unit",
    "unit_quantity",
    "quantity",
    "product_status",
  ];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Product Excel Report -> downloadExcel method",
      sheet: "Product Excel Report",
      tablePayload: {
        header,
        body: [""],
        blankrows: "No record",
      },
    });
  }

  const FileUploadAPI = (e) => {
    const formData = new FormData();

    formData.append("bulk_xls", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_BASEURL}/product_bulk_uploads`, formData)
      .then((response) => {
        if (response.status === 200) {
          setProductAlert(true);
          setapicall(true);
        } else {
          setBulkProductError("Error in adding BulkProducts");
        }
      });

  };
  //-----------------------Download excel sheet code End  here---------------------------------------------------
  // console.log(cat_catname+"pppppppppppppppppppppppppppppppppppppppppppppppp")

  // DATATABLE COLUMN PRODUCT LIST
  const columns = [
    {
      name: "#",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          alt={"apna_organic"}
          src={
            row.all_images
              ? row.all_images
              : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
          }
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight: "100px",
            maxWidth: "100px",
          }}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => (
        <div>
          <p
            className="mb-1"
            onClick={OnProductNameClick.bind(this, [row.id, row.product_id])}
          >
            <b>
              {row.product_title_name}
              <br />
            </b>
            {/* Product ID: {row.product_id} <br /> */}
            <div className="d-flex flex-column ">
              {row.is_featured === 1 ? (
                <span className={"badge bg-warning mt-1"}>
                  {"featured product"}
                </span>
              ) : null}
              {row.is_special_offer === 1 ? (
                <span className={"badge bg-info mt-1"}>{"special offer"}</span>
              ) : null}
              {row.is_promotional === 1 ? (
                <span className={"badge bg-primary mt-1"}>{"promotional"}</span>
              ) : null}
            </div>
          </p>
        </div>
      ),
      sortable: true,
      width: "250px",
    },
    {
      name: "Category",
      //     selector: (row) =>{
      //       // console.log(row.cat_catname)
      //       // console.log(row.category)
      //       console.log(cat_catname[row.category])
      //  return(
      //   <>
      //   {row.cat_catname === undefined ? "null":  cat_catname[row.category]}
      //   </>
      //  )

      //     },
      selector: (row) => row.category,
      sortable: true,
      width: "150px",
    },
    {
      name: "Category Id",
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Vendor",
      selector: (row) => row.shop,
      sortable: true,
      width: "90px",
    },
    {
      name: "Seo_Tag",
      selector: (row) => row.seo_tag,
      sortable: true,
      width: "90px",
    },
    {
      name: "Product Type",
      selector: (row) => row.product_type,
      sortable: true,
      width: "90px",
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
      width: "100px",
    },
    {
      name: "Mrp",
      selector: (row) => (
        <p className="m-0">
          <b>MRP :</b>₹ {Number(row.mrp).toFixed(2)} <br />
          <b>Discount : </b>
          {Number(row.discount).toFixed(2)}%
          {/* {row.discount === "0" ? null : row.discount + "%"}{" "} */}
          <br />
          <b>Product Price:</b>₹ {Number(row.product_price).toFixed(2)} <br />
          <b>Sale Price:</b>₹ {Number(row.sale_price).toFixed(2)} <br />
        </p>
      ),
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Tax",
      selector: (row) => (
        <div className="d-flex flex-column">
          <b>
            Total:
            {Number(row.gst) +
              Number(row.wholesale_sales_tax) +
              Number(row.retails_sales_tax) +
              Number(row.manufacturers_sales_tax) +
              Number(row.value_added_tax) +
              "%"}{" "}
          </b>{" "}
          <div className="d-flex">
            {row.gst === "0" ? null : (
              <p className="mb-0">
                <b>Gst :</b>
                {Number(row.gst).toFixed(1)}%
              </p>
            )}
            {row.cgst === "0" ? null : (
              <p className="mb-0 mx-1">
                <b>Cgst : </b> {Number(row.cgst).toFixed(1)}%{" "}
              </p>
            )}
            {row.sgst === "0" ? null : (
              <p className="mb-0">
                <b>Sgst:</b> {Number(row.sgst).toFixed(1)}%
              </p>
            )}
          </div>
          <div className="d-flex flex-column">
            {row.wholesale_sales_tax === "0" ? null : (
              <p className="mb-0">
                <b>
                  wholesale_sales_tax:
                  {Number(row.wholesale_sales_tax).toFixed(1)}%
                </b>{" "}
              </p>
            )}
            {row.retails_sales_tax === "0" ? null : (
              <p className="mb-0">
                <b>
                  retails_sales_tax:{Number(row.retails_sales_tax).toFixed(1)}%
                </b>{" "}
              </p>
            )}
            {row.value_added_tax === "0" ? null : (
              <p className="mb-0">
                <b>
                  value_added_tax:{Number(row.value_added_tax).toFixed(1)}%{" "}
                </b>
              </p>
            )}
            {row.manufacturers_sales_tax === "0" ? null : (
              <p className="mb-0">
                <b>
                  manufacturers_sales_tax:{" "}
                  {Number(row.manufacturers_sales_tax).toFixed(1)}%
                </b>{" "}
              </p>
            )}
          </div>
        </div>
      ),

      sortable: true,
      width: "250px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "SP",
      selector: (row) => row.sale_price.toFixed(2),
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Qty",
      selector: (row) =>
        row.quantity === "0" || row.quantity === 0 ? (
          <span className="text-danger">Out Of Stock</span>
        ) : (
          row.quantity
        ),
      sortable: true,
      width: "100px",
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
            row.product_status === "pending" || row.product_status === "1"
              ? "badge bg-warning"
              : row.product_status === "approved"
                ? "badge bg-success"
                : // ? "badge bg-info"
                row.product_status === "draft"
                  ? "badge bg-secondary"
                  : "badge bg-secondary"
          }
        >
          {row.product_status === "pending" || row.product_status === "1"
            ? "Pending"
            : row.product_status === "approved"
              ? "Approved"
              : // : row.product_status === ""
              // ? "Status"
              row.product_status === "draft"
                ? "Draft"
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
          className="w-100"
          onChange={(e) => onProductStatusChange(e, row.id, row.product_id)}
          value={row.product_status}
        >
          {/* <option value={""}>Status</option> */}
          {(productstatus.productstatus || []).map((data, i) => {

            return (
              <option value={data} key={i}>
                {" "}
                {data}
              </option>
            );
          })}
        </Form.Select>
      ),
      sortable: true,
    },
    {
      name: "Variety",
      selector: (row) => (
        <Button
          size="sm"
          onClick={handlevarietyShow.bind(this, row.product_id, row.id)}
        >
          Add Variety
        </Button>
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

          <div className="feature_product_dropdown_box adminselectbox ">

            <DropdownButton id="dropdown-basic-button" title="">
              <Dropdown.Item value="">Select</Dropdown.Item>
              <Dropdown.Item
                value="special_offer"
                onClick={(e) =>
                  OnProductOfferClick(
                    "special_offer",
                    row.product_id,
                    row.product_title_name
                  )
                }
              >
                Special Offer
              </Dropdown.Item>
              <Dropdown.Item
                value="featured_offer"
                onClick={(e) =>
                  OnProductOfferClick(
                    "featured_offer",
                    row.product_id,
                    row.product_title_name
                  )
                }
              >
                Featured Offer
              </Dropdown.Item>
              <Dropdown.Item
                value="promotional"
                onClick={(e) =>
                  OnProductOfferClick(
                    "promotional",
                    row.product_id,
                    row.product_title_name
                  )
                }
              >
                Promotional
              </Dropdown.Item>
            </DropdownButton>
          </div>

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
  // END DATATABLE DATA
  return (
    <>

      {loading === true ? <Loader /> : null}
      <div className="App productlist_maindiv">
        <h2>Products</h2>
        <div className="card mt-3 p-3 ">
          {/* search bar */}
          <div className="row">
            <div className="col-md-2 col-sm-6 aos_input">
              <input
                type={"text"}
                placeholder={"Search by product name"}
                onChange={OnSearchChange}
                name="product_title_name"
                value={searchdata.product_title_name}
                className={"form-control"}
              />
              {searcherror === true ? (
                <small className="text-danger">please fill the feild</small>
              ) : null}
            </div>
            <div className="col-md-2 col-sm-6 aos_input">
              <input
                type={"text"}
                placeholder={"Search by seo_tag"}
                onChange={OnSearchChange}
                name="tag"
                value={searchdata.tag}
                className={"form-control"}
              />

            </div>
            <div className="col-md-2 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by status"
                className="adminselectbox"
                placeholder="Search by category"
                onChange={OnSearchChange}
                name="category"
                value={searchdata.category}
              >
                <option value={""}>Select Category</option>
                {(filtervategory || []).map((data, i) => {
                  return (
                    <option value={data.id} key={i}>
                      {" "}
                      {data.category_name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-2 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by status"
                className="adminselectbox"
                placeholder="Search by vendor"
                onChange={OnSearchChange}
                name="vendor"
                value={searchdata.vendor}
              >
                <option value={""}>Select Vendor</option>
                {(vendorid || []).map((data, i) => {
                  return (
                    <option value={data.shop_name} key={i}>
                      {" "}
                      {data.shop_name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-2 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by brand"
                className="adminselectbox"
                placeholder="Search by brand"
                onChange={OnSearchChange}
                name="brand"
                value={searchdata.brand}
              >
                <option value={""}>Select Brand</option>
                {(BrandJson.BrandJson || []).map((data, i) => {
                  return (
                    <option value={data} key={i}>
                      {" "}
                      {data}
                    </option>
                  );
                })}
              </Form.Select>
            </div>

            <div className="col-md-2 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by status"
                className="adminselectbox"
                placeholder="Search by status"
                onChange={OnSearchChange}
                name="product_status"
                value={searchdata.product_status}
              >
                <option value={""}>Select Status</option>
                {(productstatus.productstatus || []).map((data, i) => {
                  return (
                    <option value={data} key={i}>
                      {" "}
                      {data}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-2 col-sm-6  mt-2 aos_input">
              <MainButton
                onClick={onProductSearchClick}
                btntext={"Search"}
                btnclass={"button main_button w-100"}
              />
            </div>
            <div className="col-md-2 col-sm-6  mt-2 aos_input">
              <MainButton
                btntext={"Reset"}
                btnclass={"button main_button w-100"}
                type="reset"
                onClick={OnReset}
              />
            </div>
          </div>

          {/* upload */}

          <div className="product_page_uploadbox my-4">
            <div className="product_page_uploadbox_one">
              <input
                type="file"
                className="product_page_uploadbox_button"
                onChange={(e) => {
                  FileUploadAPI(e);
                }}
              />
              <Iconbutton
                btntext={"Upload"}
                btnclass={"button main_outline_button"}
                Iconname={<AiOutlineCloudUpload />}
              />
            </div>
            {bulkProductError === "" ? (
              ""
            ) : (
              <p className="mt-1 ms-2 text-danger" type="invalid">
                {bulkProductError}
              </p>
            )}
            <MainButton btntext={"Download"} onClick={handleDownloadExcel} />

            <Iconbutton
              btntext={"Add Product"}
              onClick={() => {
                handleShow("add");
              }}
              Iconname={<AiOutlinePlus />}
              btnclass={"button main_button "}
            />
          </div>

          {/* main product datatable */}
          <Modal
            show={modalshow}
            onHide={() => handleClose()}
            dialogClassName="addproductmainmodal"
            aria-labelledby="example-custom-modal-styling-title"
            centered
          >
            <Form
              className="p-2 addproduct_form"
              noValidate
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
                            {/* <span className="text-danger">
                            *
                            {validated===false?
                            <Form.Control.Feedback
                              type="text"
                              className="h6"
                            >
                              Please fill productname
                            </Form.Control.Feedback>:null}
                          </span> */}
                          </Form.Label>
                          <Col sm="12">
                            <Form.Control
                              type="text"
                              placeholder="Product Title/Name"
                              required
                              onChange={(e) => handleInputFieldChange(e)}
                              name={"product_title_name"}
                              value={productdata.product_title_name}
                              maxLength={20}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please Product Name
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          className="mx-3"
                          controlId="validationProductName"
                        >
                          <Form.Label className="inputlabelheading" sm="12">
                            Product Slug<span className="text-danger">* </span>
                          </Form.Label>
                          <Col sm="12">
                            <Form.Control
                              type="text"
                              placeholder="product_slug"
                              required
                              onChange={(e) => handleInputFieldChange(e)}
                              name={"product_slug"}
                              value={productdata.product_slug}
                              maxLength={20}

                            // type="text"
                            // placeholder="Product Slug"
                            // onChange={(e) => handleInputFieldChange1(e)}
                            // name={"product_slug"}
                            // value={
                            //   productdata.product_title_name === "" ||
                            //   productdata.product_title_name === "null" ||
                            //   productdata.product_title_name === null
                            //     ? null
                            //     : productdata.product_title_name + "_123"
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please Product Name
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          className="mx-3"
                          controlId="validationProductslug"
                        >
                          <Form.Label className="inputlabelheading" sm="12">
                            Product Brand{" "}
                            <span className="text-danger">* </span>
                          </Form.Label>
                          <Col sm="12">
                            <Form.Select
                              aria-label="Product Type"
                              className="adminselectbox"
                              name="brand"
                              required
                              onChange={(e) => handleInputFieldChange(e)}
                              value={
                                productdata.brand === null ||
                                  productdata.brand === undefined
                                  ? ""
                                  : productdata.brand
                              }
                            >
                              <option value={""}>Select Brand</option>
                              {(BrandJson.BrandJson || []).map((item, i) => {
                                return <option value={item} key={i}>{item}</option>;
                              })}
                            </Form.Select>
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please Select Product Brand
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          className="mx-3"
                          controlId="validationCustom03"
                        >
                          <Form.Label className="inputlabelheading" sm="12">
                            Store Name
                            {/* <span className="text-danger">
                            *
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please fill storename
                            </Form.Control.Feedback>
                          </span> */}
                          </Form.Label>
                          <Form.Select
                            onChange={handleVendorNameChange}
                            aria-label="store_name"
                            className="adminselectbox"
                            required
                          >
                            {" "}
                            <option value={""}> Select Store Name</option>
                            {(vendorid || []).map((cdata, i) => {
                              return (
                                <option
                                  value={[cdata.id, cdata.shop_name]}
                                  key={i}
                                  selected={
                                    (productdata.vendor_id,
                                      productdata.store_name) ===
                                    (cdata.id, cdata.shop_name)
                                  }
                                >
                                  {cdata.shop_name}
                                  {""}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please Select Store Name
                          </Form.Control.Feedback>
                          {/* <Col sm="12">
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill storename
                          </Form.Control.Feedback>
                        </Col> */}
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
                            />
                          </Col>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                  {/* category */}
                  <div className="my-3 inputsection_box">
                    <h5 className="m-0">Category Info</h5>
                    <div className="productvariety">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom05"
                      >
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

                            {(categorytype.categorytype || []).map((data, i) => {
                              return <option value={data} key={i}>{data}</option>;
                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please select product type
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      {/* category select */}
                      <Form.Group
                        className=" aos_input"
                        controlId="validationCustom06"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Parent Category{" "}
                          <span className="text-danger">* </span>
                        </Form.Label>
                        <Form.Select
                          name={"parent_category"}
                          aria-label="Parent Category"
                          className="adminselectbox"
                          required
                          onChange={(e, id) => categoryFormChange(e, id)}
                        >
                          <option value={""}>Select Parent Category </option>
                          {(category || []).map((cdata, i) => {
                            return (
                              <option
                                value={cdata.id}
                                name="parent_category"
                                key={i}
                                selected={
                                  editparentCategory === cdata.category_name
                                    ? true
                                    : false
                                }
                              >
                                {cdata.category_name} {""}
                              </option>
                            )


                          })}
                        </Form.Select>

                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select Category
                        </Form.Control.Feedback>
                      </Form.Group>

                      {subCategory === "" ||
                        subCategory === null ||
                        subCategory === undefined ? null : (
                        <Form.Group
                          className=" aos_input"
                          controlId="formBasicParentCategory"
                        >
                          <Form.Label>
                            Sub Category <span className="text-danger">* </span>
                          </Form.Label>
                          <Form.Select
                            aria-label="Search by status"
                            className="adminselectbox"
                            onChange={(e, id) => categoryFormChange(e, id)}
                            name={"sub_category"}
                            required
                          >
                            <option value={""}>Select Category </option>
                            {(subCategory || []).map((cdata, i) => {
                              return (
                                <option
                                  value={cdata.id}
                                  key={i}
                                  selected={
                                    categoryeditparent === cdata.category_name
                                      ? true
                                      : false
                                  }
                                >
                                  {cdata.category_name}{" "}
                                </option>
                              )

                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill category
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                      {childCategory[0] === "" ||
                        childCategory[0] === null ||
                        childCategory[0] === undefined ? null : (
                        <Form.Group
                          className=" aos_input"
                          controlId="formBasicParentCategory"
                        >
                          <Form.Label>
                            Child Category{" "}
                            <span className="text-danger">* </span>
                          </Form.Label>{" "}
                          {/* {categoryeditchildparent} */}
                          <Form.Select
                            aria-label="Search by status"
                            className="adminselectbox"
                            onChange={(e, id) => categoryFormChange(e, id)}
                            name={"childcategory"}
                            required
                          >
                            <option value={""}>Select Category </option>
                            {(childCategory || []).map((cdata, i) => {
                              return (
                                <option
                                  value={cdata.id}
                                  key={i}
                                  selected={
                                    categoryeditchildparent
                                      ? true
                                      : false

                                  }
                                >
                                  {cdata.category_name}{" "}
                                </option>

                              )


                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill category
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}

                      {/* {grandcCategory[0] === "" ||
                    grandcCategory[0] === null ||
                    grandcCategory[0] === undefined ? null : (
                      <Form.Group
                        className="mb-3 aos_input"
                        controlId="formBasicParentCategory"
                      >
                        <Form.Label> Inner Category</Form.Label>
                        <Form.Select
                          aria-label="Search by status"
                          className="adminselectbox"
                          onChange={(e, id) => categoryFormChange(e, id)}
                          name={"gcategory"}
                        >
                          <option value={""}>Select Category </option>
                          {grandcCategory.map((cdata, i) => {
                            return (
                              <option
                                value={cdata.id}
                                key={i}
                                selected={
                                  categoryeditchildparent ===
                                  cdata.category_name
                                    ? true
                                    : false
                                }
                              >
                                {cdata.category_name}{" "}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill category
                        </Form.Control.Feedback>
                      </Form.Group>
                    )} */}

                      {/* end category select */}
                    </div>
                  </div>
                  {/* Taxes */}
                  <div className="my-3 inputsection_box">
                    <h5 className="m-0">Taxes</h5>
                    <div className="productvariety mt-0">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Wholesale Sales Tax
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            min={0}
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
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Manufacturers’ Sales Tax
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
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
                      <Form.Group
                        className="m-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Retail Sales Tax
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
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
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Gst<span className="text-danger">* </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={1}
                            placeholder="Gst"
                            name="gst"
                            value={productdata.gst}
                            onChange={(e) => handleInputFieldChange(e)}
                            required
                          />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please Fill Gst
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Sgst<span className="text-danger"> </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
                            placeholder="Sgst"
                            // className={
                            //   customvalidated === true ? "border-danger" : null
                            // }
                            name="sgst"
                            value={productdata.sgst}
                            onChange={(e) => handleInputFieldChange(e)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Cgst<span className="text-danger"></span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
                            placeholder="Cgst"
                            // className={
                            //   customvalidated === true ? "border-danger" : null
                            // }
                            name="cgst"
                            value={productdata.cgst}
                            onChange={(e) => handleInputFieldChange(e)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Value Added Tax
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
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
                    {/* <div className="productvariety mt-0">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Wholesale Sales Tax
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            min={0}
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
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Manufacturers’ Sales Tax
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
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
                      <Form.Group
                        className="m-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Retail Sales Tax
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
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
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Value Added Tax
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
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
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Gst<span className="text-danger">* </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={1}
                            placeholder="Gst"
                            name="gst"
                            value={productdata.gst}
                            onChange={(e) =>
                              setproductdata({
                                ...productdata,
                                gst: e.target.value,
                                cgst: e.target.value / 2,
                                sgst: e.target.value / 2,
                              })
                            }
                            required
                          />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill gst
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Sgst<span className="text-danger"> </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
                            placeholder="Sgst"
                            name="sgst"
                            value={productdata.gst / 2}
                            readOnly={true}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Cgst<span className="text-danger"></span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="number"
                            min={0}
                            placeholder="Cgst"
                            name="cgst"
                            value={productdata.gst / 2}
                            readOnly={true}
                          />
                        </Col>
                      </Form.Group>
                    </div> */}
                  </div>
                  {/*single variety  */}
                  <Form
                    className="p-2 addproduct_form"
                    validated={validated}
                    ref={mainformRef}
                  >
                    {modalshow === "add" ? (
                      <div className="my-3 inputsection_box">
                        <h5 className="m-0">Add Variety</h5>
                        <div className="productvariety_box">
                          {/* <div className="productvariety">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom11"
                          >
                            <Form.Label
                              className="inputlabelheading"
                              sm="12 d-flex align-itmes-center"
                            >
                              {productdata.variety === false ? (
                                <Form.Check
                                  type="radio"
                                  aria-label="radio 1"
                                  className="mx-2"
                                  onChange={handleVarietyChange}
                                  name="variety"
                                  value={false}
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                  aria-label="radio 1"
                                  className="mx-2"
                                  onChange={handleVarietyChange}
                                  name="variety"
                                  value={false}
                                />
                              )}
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
                              {productdata.variety === true ? (
                                <Form.Check
                                  type="radio"
                                  aria-label="radio 2"
                                  className="mx-2"
                                  onChange={handleVarietyChange}
                                  name="variety"
                                  value={true}
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                  aria-label="radio 2"
                                  className="mx-2"
                                  onChange={handleVarietyChange}
                                  name="variety"
                                  value={true}
                                />
                              )}
                              Multiple Variety
                            </Form.Label>
                          </Form.Group>
                        </div> */}
                          <div className="row">
                            <Form.Group className="mx-3">
                              <div className="variation_box my-2">
                                <div className="row">
                                  <div className="col-auto">
                                    <Table
                                      bordered
                                      className="align-middle my-2 aadvariety_table_"
                                    >
                                      <thead className="align-middle">
                                        <tr>
                                          <th>
                                            Variety
                                            <span className="text-danger">
                                              *{" "}
                                            </span>
                                          </th>
                                          <th>Color</th>
                                          <th>Weight/piece/Volume</th>
                                          <th>Size</th>
                                          <th>
                                            Mrp{" "}
                                            <span className="text-danger">
                                              *{""}
                                            </span>
                                          </th>
                                          <th>Discount</th>
                                          <th>Price</th>
                                          <th>
                                            Sale Price{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </th>
                                          {/* <th>Special Offer</th>
                                        <th>Featured Product</th> */}
                                          <th className="manufacture_date">
                                            Mdate
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </th>
                                          <th className="manufacture_date">
                                            Edate{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </th>
                                          <th className="">
                                            Qty{" "}
                                            <span className="text-danger">
                                              *{" "}
                                            </span>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="p-0 text-center">
                                            <div className=" d-flex align-items-center">
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Select
                                                  aria-label="Default select example"
                                                  name="unit"
                                                  required
                                                  value={variantarray.unit}
                                                  onChange={(e) =>
                                                    onVariantChange(e)
                                                  }
                                                  disabled={
                                                    variantmainarray.length ===
                                                      0
                                                      ? false
                                                      : true
                                                  }
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                >
                                                  <option value={""}>
                                                    Select
                                                  </option>
                                                  {(varietyy.variety || []).map(
                                                    (vari, i) => {
                                                      return changeUnitproperty ===
                                                        true ? (
                                                        <option
                                                          value={
                                                            vari === "color"
                                                              ? "pcs"
                                                              : vari ===
                                                                "weight"
                                                                ? "gms"
                                                                : vari ===
                                                                  "volume"
                                                                  ? "ml"
                                                                  : vari === "piece"
                                                                    ? "piece"
                                                                    : ""
                                                          }
                                                          key={i}
                                                        >
                                                          {vari}
                                                        </option>
                                                      ) : productdata.product_type ===
                                                        "Cloths" ||
                                                        productdata.product_type ===
                                                        "Fashion" ? (
                                                        vari === "weight" ||
                                                          vari ===
                                                          "volume" ? null : (
                                                          <option
                                                            value={
                                                              vari === "piece"
                                                                ? "piece"
                                                                : vari ===
                                                                  "color"
                                                                  ? "pcs"
                                                                  : ""
                                                            }
                                                            key={i}
                                                          >
                                                            {vari}
                                                          </option>
                                                        )
                                                      ) : vari ===
                                                        "color" ? null : (
                                                        <option
                                                          value={
                                                            vari === "weight"
                                                              ? "gms"
                                                              : vari ===
                                                                "volume"
                                                                ? "ml"
                                                                : vari === "piece"
                                                                  ? "piece"
                                                                  : ""
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
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Select
                                                  aria-label="Default select example"
                                                  name="colors"
                                                  value={variantarray.colors}
                                                  onChange={(e) =>
                                                    onVariantChange(e)
                                                  }
                                                  disabled={
                                                    variantarray.unit !== "pcs" &&
                                                      variantarray.unit !== ""
                                                      ? true
                                                      : variantarray.unit === ""
                                                        ? false
                                                        : false
                                                  }
                                                  required
                                                >
                                                  {" "}
                                                  <option value={""}>
                                                    {" "}
                                                    Select Color
                                                  </option>
                                                  {(varietyy.color || []).map(
                                                    (vari, i) => {
                                                      return (
                                                        <option
                                                          value={vari}
                                                          key={i}
                                                          selected={
                                                            productdata.color
                                                          }
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
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  type="number"
                                                  sm="9"
                                                  value={
                                                    variantarray.unit_quantity
                                                  }
                                                  disabled={
                                                    variantarray.unit === "pcs"
                                                      ? true
                                                      : false
                                                  }
                                                  onChange={(e) =>
                                                    onVariantChange(e)
                                                  }
                                                  name={"unit_quantity"}
                                                  required
                                                />
                                              </InputGroup>
                                            </div>
                                          </td>

                                          <td className="p-0 text-center">
                                            <div className=" d-flex align-items-center">
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Select
                                                  aria-label="Default select example"
                                                  required
                                                  sm="9"
                                                  name="size"
                                                  value={variantarray.size}
                                                  onChange={(e) =>
                                                    onVariantChange(e)
                                                  }
                                                  disabled={
                                                    variantarray.unit !==
                                                      "pcs" &&
                                                      variantarray.unit !== ""
                                                      ? true
                                                      : variantarray.unit === ""
                                                        ? false
                                                        : false
                                                  }
                                                >
                                                  {" "}
                                                  <option value={""}>
                                                    {" "}
                                                    Select Size
                                                  </option>
                                                  {(varietyy.size || []).map(
                                                    (vari, i) => {
                                                      return (
                                                        <option
                                                          value={vari}
                                                          key={i}
                                                          selected={
                                                            productdata.size
                                                          }
                                                        >
                                                          {vari}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                                </Form.Select>
                                                {/* <Form.Select
                                           aria-label="Default select example"
                                           required
                                           sm="9"
                                           name="size"
                                           value={variantarray.size}
                                           onChange={(e) =>
                                             onVariantChange(e)
                                           }
                                           disabled={
                                            variantarray.unit !== "pcs" &&
                                            variantarray.unit !== ""
                                              ? true
                                              : variantarray.unit == ""
                                              ? false
                                              : false
                                          }
                        >
                          {" "}
                          <option value={""}> Select Size</option>
                          {(varietyy.size||[]).map((vari, i) => {
                            return (
                              <option
                              value={vari}
                              key={i}
                                selected={
                                  (productdata.size)
                                  
                                }
                              >
                                {vari}
                                
                              </option>
                            );
                          })}
                        </Form.Select> */}
                                              </InputGroup>
                                            </div>
                                          </td>
                                          <td className="p-0 text-center">
                                            <div className=" d-flex align-items-center">
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  type="number"
                                                  sm="9"
                                                  maxLength={"5"}
                                                  minLength={"1"}
                                                  min="1"
                                                  max="50000"
                                                  // className={
                                                  //   customvalidated === true
                                                  //     ? "border-danger"
                                                  //     : null
                                                  // }
                                                  name="mrp"
                                                  value={variantarray.mrp}
                                                  onChange={(e) =>
                                                    onVariantChange(e)
                                                  }
                                                  required
                                                />
                                              </InputGroup>
                                            </div>
                                          </td>
                                          <td className="p-0 text-center">
                                            <div className=" d-flex align-items-center">
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  type="number"
                                                  sm="9"
                                                  min={"1"}
                                                  max={"100"}
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
                                            <div className=" d-flex align-items-center">
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  step={"any"}
                                                  type="number"
                                                  sm="9"
                                                  // className={
                                                  //   customvalidated === true
                                                  //     ? "border-danger"
                                                  //     : null
                                                  // }
                                                  // onChange={(e) =>
                                                  //   onVariantChange(e)
                                                  // }
                                                  name={"product_price"}
                                                  value={product_price}
                                                  required
                                                />
                                              </InputGroup>
                                            </div>
                                          </td>

                                          <td className="p-0 text-center">
                                            <div className=" d-flex align-items-center">
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  type="number"
                                                  step={"any"}
                                                  sm="9"
                                                  // className={
                                                  //   customvalidated === true
                                                  //     ? "border-danger"
                                                  //     : null
                                                  // }
                                                  // onChange={(e) =>
                                                  //   onVariantChange(e)
                                                  // }
                                                  name={"sale_price"}
                                                  value={(
                                                    product_price +
                                                    ((product_price *
                                                      productdata.gst) /
                                                      100 +
                                                      (product_price *
                                                        productdata.wholesale_sales_tax) /
                                                      100 +
                                                      (product_price *
                                                        productdata.retails_sales_tax) /
                                                      100 +
                                                      (product_price *
                                                        productdata.value_added_tax) /
                                                      100 +
                                                      (product_price *
                                                        productdata.manufacturers_sales_tax) /
                                                      100)
                                                  ).toFixed(2)}
                                                />
                                              </InputGroup>
                                            </div>
                                          </td>

                                          {/* <td className="p-0 text-center">
                                          <div className="">
                                            <Form.Check
                                              onChange={(e) =>
                                                handleInputcheckboxChange(e)
                                              }
                                              name={"special_offer"}
                                              checked={
                                                variantarray.special_offer ===
                                                  1 ||
                                                variantarray.special_offer ===
                                                  true
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </div>
                                        </td>
                                        <td className="p-0 text-center">
                                          <div className="">
                                            <Form.Check
                                              onChange={(e) =>
                                                handleInputcheckboxChange(e)
                                              }
                                              name={"featured_product"}
                                              checked={
                                                variantarray.featured_product ===
                                                  1 ||
                                                variantarray.featured_product ===
                                                  true
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </div>
                                        </td> */}
                                          <td className="p-0 text-center">
                                            <div className="manufacture_date">
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  type="date"
                                                  sm="9"
                                                  required
                                                  min={moment().format(
                                                    "YYYY-MM-DD"
                                                  )}
                                                  // className={
                                                  //   customvalidated === true
                                                  //     ? "border-danger"
                                                  //     : null
                                                  // }
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
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  type="date"
                                                  sm="9"
                                                  required
                                                  disabled={
                                                    variantarray.manufacturing_date
                                                      ? false
                                                      : true
                                                  }
                                                  min={moment(
                                                    variantarray.manufacturing_date
                                                  )
                                                    .add(1, "day")
                                                    .format("YYYY-MM-DD")}
                                                  onChange={(e) =>
                                                    onVariantChange(e)
                                                  }
                                                  name={"expire_date"}
                                                  value={
                                                    variantarray.expire_date
                                                  }
                                                />
                                              </InputGroup>
                                            </div>
                                          </td>
                                          <td className="p-0">
                                            <div className="">
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  required
                                                  type="number"
                                                  sm="9"
                                                  value={variantarray.quantity}
                                                  onChange={(e) =>
                                                    onVariantChange(e)
                                                  }
                                                  name={"quantity"}
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
                                                onClick={() =>
                                                  VariantAddProduct()
                                                }
                                                size="sm"
                                              >
                                                +
                                              </Button>
                                            </div>
                                          </td>
                                        </tr>
                                        {checkProductType === true ? (
                                          <tr>
                                            <p
                                              className="mt-1 ms-2 text-danger"
                                              type="invalid"
                                            >
                                              Please the select the product type
                                              first....!!!!
                                            </p>
                                          </tr>
                                        ) : checkProductType ===
                                          false ? null : null}

                                        {varietyUnitvalidation ===
                                          "ExpireDateValidation" ? (
                                          <tr>
                                            <p
                                              className="mt-1 ms-2 text-danger"
                                              type="invalid"
                                            >
                                              Please Expire date should be
                                              greater and equal  than Manufacturing date
                                            </p>
                                          </tr>
                                        ) : null}

                                        <tr>
                                          {customvalidated === true ? (
                                            <p
                                              className="mt-1 ms-2 text-danger"
                                              type="invalid"
                                            >
                                              Please fill Required fields
                                            </p>
                                          ) : varietyValidation ===
                                            "varietyadd" ? (
                                            <p
                                              className="mt-1 ms-2 text-danger"
                                              type="invalid"
                                            >
                                              Please Click On Plus Button To Add
                                              Variety
                                            </p>
                                          ) : null}

                                          {varietyUnitvalidation ===
                                            "fillUnit&size&color" ? (
                                            <p
                                              className="mt-1 ms-2 text-danger"
                                              type="invalid"
                                            >
                                              Please fill size and colors
                                            </p>
                                          ) : varietyUnitvalidation ===
                                            "fillUnit&color" ? (
                                            <p
                                              className="mt-1 ms-2 text-danger my-3"
                                              type="invalid"
                                            >
                                              Please fill color
                                            </p>
                                          ) : varietyUnitvalidation ===
                                            "unitQwanity&size&color" ? (
                                            <p
                                              className="mt-1 ms-2 text-danger my-3"
                                              type="invalid"
                                            >
                                              Please fill weight/volume/piece
                                            </p>
                                          ) : varietyUnitvalidation ===
                                            "discountmore" ? (
                                            <p
                                              className="mt-1 ms-2 text-danger my-3"
                                              type="invalid"
                                            >
                                              Discount should be less then 100
                                            </p>
                                          ) : varietyUnitvalidation ===
                                            "QwanityValidation" ? (
                                            <p
                                              className="mt-1 ms-2 text-danger my-3"
                                              type="invalid"
                                            >
                                              Quantity must be greater than 0
                                            </p>
                                          ) : varietyUnitvalidation ===
                                            "mrpmore" ? (
                                            <p
                                              className="mt-1 ms-2 text-danger my-3"
                                              type="invalid"
                                            >
                                              Mrp must be lesser than 50000 and
                                              greater than 0
                                            </p>
                                          ) : varietyUnitvalidation ===
                                            "" ? null : null}
                                        </tr>

                                        {(variantmainarray || []).map(
                                          (variantdata, i) => {
                                            return (
                                              <tr key={i}>
                                                <td className="p-0 text-center ">
                                                  {variantdata.unit === "pcs"
                                                    ? "color"
                                                    : variantdata.unit === "gms"
                                                      ? "weight"
                                                      : variantdata.unit === "ml"
                                                        ? "volume"
                                                        : variantdata.unit ===
                                                          "piece"
                                                          ? "piece"
                                                          : ""}
                                                </td>
                                                <td className="p-0 text-center ">
                                                  {variantdata.colors}
                                                </td>
                                                <td className="p-0 text-center ">
                                                  {variantdata.unit === "gms"
                                                    ? variantdata.unit_quantity
                                                    : variantdata.unit === "ml"
                                                      ? variantdata.unit_quantity
                                                      : variantdata.unit ===
                                                        "piece"
                                                        ? variantdata.unit_quantity
                                                        : null}
                                                </td>
                                                <td className="p-0 text-center ">
                                                  {variantdata.size}
                                                </td>
                                                <td className="p-0 text-center ">
                                                  {variantdata.mrp}
                                                </td>
                                                <td className="p-0 text-center ">
                                                  {variantdata.discount}
                                                </td>
                                                <td className="p-0 text-center ">
                                                  {variantdata.product_price}
                                                </td>

                                                <td className="p-0 text-center ">
                                                  {saleprice}
                                                </td>
                                                {/* <td className="p-0 text-center ">
                                                {`${variantdata.special_offer}`}
                                              </td>
                                              <td className="p-0 text-center ">
                                                {`${variantdata.featured_product}`}
                                              </td> */}
                                                <td className="p-0 text-center ">
                                                  {
                                                    variantdata.manufacturing_date
                                                  }
                                                </td>
                                                <td className="p-0 text-center ">
                                                  {variantdata.expire_date}
                                                </td>
                                                <td className="p-0 text-center">
                                                  {variantdata.quantity}
                                                </td>
                                                <td className="p-0 text-center">
                                                  <Button
                                                    variant="text-danger"
                                                    className="addcategoryicon text-danger"
                                                    onClick={(id) =>
                                                      MainVariantRemoveClick(
                                                        variantdata
                                                      )
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
                                </div>
                              </div>
                            </Form.Group>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Form>
                  {/* </Form> */}
                  {/* Offer */}

                  {/* seo tag */}
                  <div className="my-3 inputsection_box">
                    <h5 className="m-0">Seo Tag</h5>
                    <div className="productvariety">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustomSeo"
                      >
                        {/* <div className=" d-flex align-items-center my-2">
                          <InputGroup className="" size="sm">
                            <Form.Control
                              sm="9"
                              onChange={ontagchange}
                              value={addtag}
                            // onKeyPress={(event) => {
                            //   if (event.key === "Enter") {
                            //     ontagaddclick();
                            //   }
                            // }}
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
                        </div> */}
                        {/* <div className="col-md-6"> */}
                        {/* <Form.Group className="mb-3 aos_input"> */}

                        <InputGroup className="" size="sm">
                          <Form.Control
                            sm="10"
                            onChange={(e) => onDocumentNamechange(e)}
                            value={addtag}
                            placeholder="seo tag"

                            onKeyPress={(event) => {
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
                          {/* {AddtagError === "addTagErorrr" ? (
                          <span className="text-danger">
                            Please Add Document first...!!!
                          </span>
                        ) : null} */}
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
                        {/* </Form.Group>
                  </div> */}
                        {/* <div className="d-flex align-items-center tagselectbox mt-2">
                          {productdata.seo_tag === "" && addtag === "" ? (
                            ""
                          ) : productdata.seo_tag ? (
                            <Badge className="tagselecttitle mb-0" bg="success">
                              {productdata.seo_tag === null ||
                                productdata.seo_tag === undefined
                                ? ""
                                : productdata.seo_tag}
                              <span
                                onClick={() => tagRemoveClick()}
                                className={
                                  "addcategoryicon mx-2 text-light spanCurser "
                                }
                              >
                                {"x"}
                              </span>
                            </Badge>
                          ) : null}

                          {/* )

                        })} 
                        </div> */}
                      </Form.Group>
                    </div>
                  </div>

                  {/* other info */}
                  <div className="col-md-8">
                    <Form.Group
                      className="mx-3"
                      controlId="validationCustom04"
                    >
                      {/* {console.log(
                          "product description-------" +
                            productdata.product_description
                        )} */}
                      <Form.Label className="inputlabelheading" sm="12">
                        Product Description
                      </Form.Label>
                      <Col sm="12">
                        <CKEditor
                          editor={ClassicEditor}
                          data={productdata.product_description}
                          onChange={handledescription}
                          name={"product_description"}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <div className="my-3 inputsection_box">
                    <h5 className="m-0">Other Instruction</h5>
                    <Col sm="12" className="mt-3">
                      <CKEditor
                        editor={ClassicEditor}
                        data={productdata.other_introduction}
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
                          {(customarray || []).map((variantdata, i) => {
                            // const arr = variantdata.split(',')
                            return (
                              <tr className="" key={i}>
                                <td className=" text-center">
                                  <InputGroup className="">
                                    <Form.Control
                                      value={variantdata.header}
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
                                      value={variantdata.description}
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
                          })}
                        </tbody>
                      </Table>
                    </div>
                    {/* );
                })} */}
                    {/* --------------------------------------------- */}
                  </div>
                  {customvalidated === "pleasefillall" ? (
                    <span className="text-danger">
                      Please Fill All Mandatary Fields
                    </span>
                  ) : null}
                </div>
              </Modal.Body>
              <Modal.Footer className="addproductfooter">
                <Iconbutton
                  btntext={" Cancel"}
                  onClick={() => handleClose()}
                  btnclass={"button main_outline_button px-2"}
                // Iconname={<GiCancel /> }
                />
                {/* <MainButton
                btntext={"Save as Draft"}
                onClick={() => handleSaveDraft()}
              /> */}
                <Iconbutton
                  type={"submit"}
                  btntext={
                    modalshow === "add" ? "Add Product" : "Update Product"
                  }
                  btnclass={"button main_button "}
                />
                {/* {modalshow === "add" ? (
                <Iconbutton
                  // type={"submit"}
                  onClick={() => AddMoreVariety()}
                  btntext={"Add and Add More Variety"}
                  btnclass={"button main_button "}
                />
              ) : null} */}
              </Modal.Footer>
            </Form>
          </Modal>

          {/* Variety CRUD Modal */}
          <Modal
            size="lg"
            show={varietyshow}
            onHide={handlevarietyClose}
            dialogClassName="addproductmainmodal"
          >
            <Form ref={formRef}>
              <Modal.Header closeButton>
                <Modal.Title>Add Variety</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  {/* <Form.Group
                  className=""
                > */}
                  <div className="variation_box my-2">
                    <div className="row">
                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Variety
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Select
                                  required
                                  aria-label="Default select example"
                                  name="unit"
                                  onChange={(e) => onVariantChange(e)}
                                  value={variantarray.unit}
                                  disabled={
                                    variantarray.unit &&
                                      changeUnitproperty === false
                                      ? true
                                      : variantarray.unit ||
                                        changeUnitproperty === true
                                        ? false
                                        : true
                                  }
                                >
                                  <option >{variantarray.unit}</option>
                                  {console.log("variantarray.unituuuuuuuuuuuuu" + variantarray.unit)}
                                  {(varietyy.variety || []).map((vari, i) => {
                                    return vdata.length === 0 ? null : vdata[0]
                                      .product_type === "" ? (
                                      <option
                                        value={
                                          vari === "color"
                                            ? "pcs"
                                            : vari === "weight"
                                              ? "gms"
                                              : vari === "volume"
                                                ? "ml"
                                                : vari === "piece"
                                                  ? "piece"
                                                  : ""
                                        }
                                        key={i}
                                      >
                                        {vari}
                                      </option>
                                    ) : vdata.length === 0 ? null : vdata[0]
                                      .product_type === "Cloths" ||
                                      vdata.length === 0 ? null : vdata[0]
                                        .product_type === "Fashion" ? (
                                      vari === "weight" ||
                                        vari === "volume" ? null : (
                                        <option
                                          value={
                                            vari === "piece"
                                              ? "piece"
                                              : vari === "color"
                                                ? "pcs"
                                                : ""
                                          }
                                          key={i}
                                        >
                                          {vari}
                                        </option>
                                      )
                                    ) : vari === "color" ? null : (
                                      <option
                                        value={
                                          vari === "weight"
                                            ? "gms"
                                            : vari === "volume"
                                              ? "ml"
                                              : vari === "piece"
                                                ? "piece"
                                                : vari === "color"
                                                  ? "pcs"
                                                  : ""
                                        }
                                        key={i}
                                      >
                                        {vari}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">

                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Color
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              {/* <InputGroup className="">
                                <Form.Select
                                  aria-label="Default select example"
                                  name="colors"
                                  value={variantarray.colors}
                                  onChange={(e) => onVariantChange(e)}
                                  required
                                >
                                  
                                  Color
                                  <span className="text-danger">*</span>
                                </Form.Select>
                                </InputGroup> */}
                            </Col>
                            {/* </Form.Label> */}
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Select
                                  aria-label="Default select example"
                                  name="colors"
                                  value={variantarray.colors}
                                  onChange={(e) =>
                                    onVariantChange(e)
                                  }
                                  disabled={
                                    variantarray.unit !== "pcs" &&
                                      variantarray.unit !== ""
                                      ? true
                                      : variantarray.unit === ""
                                        ? false
                                        : false
                                  }
                                  required
                                >
                                  {" "}
                                  <option value={""}>
                                    {" "}
                                    Select Color
                                  </option>
                                  {(varietyy.color || []).map(
                                    (vari, i) => {
                                      return (
                                        <option
                                          value={vari}
                                          key={i}
                                          selected={
                                            productdata.color
                                          }
                                        >
                                          {vari}
                                        </option>
                                      );
                                    }
                                  )}
                                </Form.Select>

                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>

                      </div>

                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Weight/Piece/Volume
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="" size="sm">
                                <Form.Control
                                  type="number"
                                  sm="9"
                                  value={variantarray.unit_quantity}
                                  disabled={
                                    variantarray.unit === "pcs" ? true : false
                                  }
                                  onChange={(e) => onVariantChange(e)}
                                  name={"unit_quantity"}
                                  required
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Size
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Select
                                  aria-label="Default select example"
                                  required
                                  sm="9"
                                  name="size"
                                  value={variantarray.size}
                                  onChange={(e) => onVariantChange(e)}
                                  disabled={
                                    variantarray.unit !== "pcs" &&
                                      variantarray.unit !== ""
                                      ? true
                                      : variantarray.unit === ""
                                        ? false
                                        : false
                                  }
                                >
                                  <option value={""}>Select</option>
                                  {(varietyy.size || []).map((vari, i) => {
                                    return (
                                      <option value={vari} key={i}>
                                        {vari}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Mrp
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="" size="sm">
                                <Form.Control
                                  type="number"
                                  sm="9"
                                  maxLength={"5"}
                                  minLength={"1"}
                                  min="1"
                                  max="50000"
                                  // className={
                                  //   customvalidated === true
                                  //     ? "border-danger"
                                  //     : null
                                  // }
                                  name="mrp"
                                  value={variantarray.mrp}
                                  onChange={(e) => onVariantChange(e)}
                                  required
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Discount
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Control
                                  type="number"
                                  sm="9"
                                  min={"1"}
                                  max={"100"}
                                  onChange={(e) => onVariantChange(e)}
                                  name={"discount"}
                                  value={variantarray.discount}
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Original Price
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Control
                                  min={1}
                                  step={0.01}
                                  type="number"
                                  sm="9"
                                  name={"product_price"}
                                  value={Number(
                                    variantarray.product_price
                                  ).toFixed(2)}
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Tax
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Control
                                  step={0.01}
                                  type="number"
                                  sm="9"
                                  min={1}
                                  name={"totaltax"}
                                  value={Number(totaltax).toFixed(2)}
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Sale Price
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Control
                                  min={1}
                                  step={0.01}
                                  type="number"
                                  sm="9"
                                  name={"sale_price"}
                                  value={Number(variantarray.sale_price)}
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>

                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="manufacture_date addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Manufacturing Date
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="" size="sm">
                                <Form.Control
                                  type="date"
                                  sm="9"
                                  required
                                  min={moment().format("YYYY-MM-DD")}
                                  // className={
                                  //   customvalidated === true
                                  //     ? "border-danger"
                                  //     : null
                                  // }
                                  onChange={(e) => onVariantChange(e)}
                                  name={"manufacturing_date"}
                                  value={variantarray.manufacturing_date}
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="manufacture_date addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Expire Date
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Control
                                  type="date"
                                  sm="9"
                                  min={moment(
                                    variantarray.manufacturing_date
                                  ).format("YYYY-MM-DD")}
                                  disabled={
                                    variantarray.manufacturing_date
                                      ? false
                                      : true
                                  }
                                  onChange={(e) => onVariantChange(e)}
                                  name={"expire_date"}
                                  value={moment(
                                    variantarray.expire_date
                                  ).format("YYYY-MM-DD")}
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4 p-2">
                        <div className="manufacture_date addvariety_inputbox">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              className="text-start inputlabelheading"
                              sm="12"
                            >
                              Quantity
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Col sm="12">
                              <InputGroup className="">
                                <Form.Control
                                  name={"quantity"}
                                  type="number"
                                  value={variantarray.quantity}
                                  sm="9"
                                  min={"1"}
                                  onChange={(e) => onVariantChange(e)}
                                  onKeyUp={(event) => {
                                    if (event.key === "Enter") {
                                      onVariantaddclick();
                                    }
                                  }}
                                />
                              </InputGroup>
                            </Col>
                          </Form.Group>
                        </div>
                      </div>


                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        <div className="manufacture_date addvariety_inputbox">
                          <Button
                            variant="outline-success"
                            className="addcategoryicon w-100"
                            // type="submit"
                            onClick={() =>
                              onVariantaddclick(
                                variantarray.id,
                                variantarray.product_id
                              )
                            }
                          >
                            Save Variety
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-4 p-2 text-center">
                        {varietyUnitvalidation === "ExpireDateValidation" ? (
                          <tr>
                            <p className="mt-1 ms-2 text-danger" type="invalid">
                              Please Expire date should be greater or equal than
                              Manufacturing date
                            </p>
                          </tr>
                        ) : null}
                        <tr>
                          {customvalidated === true ? (
                            <p className="mt-1 ms-2 text-danger" type="invalid">
                              Please fill Required fields
                            </p>
                          ) : null}

                          {varietyUnitvalidation === "fillUnit&size&color" ? (
                            <p className="mt-1 ms-2 text-danger" type="invalid">
                              Please Fill size and colors
                            </p>
                          ) : varietyUnitvalidation === "fillUnit&color" ? (
                            <p
                              className="mt-1 ms-2 text-danger my-3"
                              type="invalid"
                            >
                              Please fill color
                            </p>
                          ) : varietyUnitvalidation ===
                            "unitQwanity&size&color" ? (
                            <p
                              className="mt-1 ms-2 text-danger my-3"
                              type="invalid"
                            >
                              Please fill weight/volume/piece
                            </p>
                          ) : varietyUnitvalidation === "discountmore" ? (
                            <p
                              className="mt-1 ms-2 text-danger my-3"
                              type="invalid"
                            >
                              Discount should be less then 100
                            </p>
                          ) : varietyUnitvalidation === "QwanityValidation" ? (
                            <p
                              className="mt-1 ms-2 text-danger my-3"
                              type="invalid"
                            >
                              Quantity must be greater than 0
                            </p>
                          ) : varietyUnitvalidation === "mrpmore" ? (
                            <p
                              className="mt-1 ms-2 text-danger my-3"
                              type="invalid"
                            >
                              Mrp must be lesser than 50000 and greater than 0
                            </p>
                          ) : varietyUnitvalidation === "" ? null : null}
                        </tr>
                      </div>

                      <div className="col-12">
                        {/* <Accordion defaultActiveKey="variantimgbox149"> */}


                        <Table bordered className="align-middle my-2">
                          <thead className="align-middle">
                            <tr>
                              <th>
                                Variety <span className="text-danger">*</span>
                              </th>

                              <th>Color</th>
                              <th>Weight/piece/Volume </th>
                              <th>Size </th>
                              <th>
                                Mrp <span className="text-danger">*</span>
                              </th>
                              <th>Discount</th>
                              <th>
                                Price<span className="text-danger">*</span>
                              </th>
                              <th>
                                Total Tax
                                <span className="text-danger">*</span>
                              </th>
                              <th>
                                Sale Price
                                <span className="text-danger">*</span>
                              </th>
                              <th className="manufacture_date">
                                Mdate <span className="text-danger">*</span>
                              </th>
                              <th className="manufacture_date">
                                Edate <span className="text-danger">*</span>
                              </th>
                              <th className="manufacture_date">
                                Quantity<span className="text-danger">*</span>
                              </th>
                              <th className="manufacture_date">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vdata === "" ||
                              vdata === null ||
                              vdata === undefined
                              ? null
                              : (vdata || []).map((variantdata, i) => {
                                return variantdata.is_delete ===
                                  "0" ? null : (
                                  <>
                                    {/* <Accordion.Item eventKey="0"> */}
                                    <tr
                                      className="add_variety_list_box"
                                      key={i}
                                    >
                                      <td className="p-0 py-3 text-center ">
                                        {variantdata.unit === "pcs"
                                          ? "color"
                                          : variantdata.unit === "piece"
                                            ? "piece"
                                            : variantdata.unit === "gms"
                                              ? "weight"
                                              : variantdata.unit === "ml"
                                                ? "volume"
                                                : ""}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {variantdata.colors}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {variantdata.unit === "gms"
                                          ? variantdata.unit_quantity
                                          : variantdata.unit === "ml"
                                            ? variantdata.unit_quantity
                                            : variantdata.unit === "piece"
                                              ? variantdata.unit_quantity
                                              : ""}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {variantdata.size}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {Number(variantdata.mrp).toFixed(2)}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {Number(variantdata.discount).toFixed(
                                          2
                                        )}
                                      </td>

                                      <td className="p-0 py-3 text-center ">
                                        {Number(
                                          variantdata.product_price
                                        ).toFixed(2)}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {Number(
                                          (variantdata.sale_price *
                                            (Number(taxdata.gst) +
                                              Number(
                                                taxdata.wholesale_sales_tax
                                              ) +
                                              Number(
                                                taxdata.retails_sales_tax
                                              ) +
                                              Number(
                                                taxdata.manufacturers_sales_tax
                                              ) +
                                              Number(
                                                taxdata.value_added_tax
                                              ))) /
                                          100
                                        ).toFixed(2)}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {variantdata.sale_price.toFixed(2)}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {moment(
                                          variantdata.manufacturing_date
                                        ).format("YYYY-MM-DD")}
                                      </td>
                                      <td className="p-0 py-3 text-center ">
                                        {moment(
                                          variantdata.expire_date
                                        ).format("YYYY-MM-DD")}
                                      </td>
                                      <td className="p-0 py-3 text-center manufacture_date">
                                        {variantdata.quantity}
                                      </td>

                                      <td className="p-0 py-3 text-center action_btn_box">
                                        <RiImageAddLine
                                          type="button"
                                          className="variety_edit_action_btn  text-success"
                                          eventKey={i}
                                          onClick={(_id) =>
                                            onImgView(
                                              variantdata.id,
                                              variantdata.product_id,
                                              console.log("variantdata.iddddddddddd" + variantdata.id)


                                            )
                                          }

                                          aria-controls={
                                            "variantimgbox" + variantdata.id

                                          }
                                          aria-expanded={open}
                                        />

                                        <BiEdit
                                          className="variety_edit_action_btn text-primary mx-2"
                                          onClick={(id) =>
                                            VariantEditClick(
                                              variantdata.id,
                                              variantdata.product_id
                                            )
                                          }
                                        />
                                        <BsTrash
                                          className="variety_edit_action_btn text-danger"
                                          onClick={(id) =>
                                            VariantRemoveClick(
                                              variantdata.id,
                                              variantdata.product_id
                                            )
                                          }
                                        />
                                      </td>
                                    </tr>
                                    {/* <Accordion.Body eventKey={i}> */}
                                    {newImageUrls ? (
                                      console.log("viewwwww-----==========-------" + variantdata.id),
                                      console.log("imageboxid-----++++++--------------------" + imageboxid),

                                      <tr

                                        className={
                                          variantdata.id === imageboxid

                                            ? "img_preview_boxx show"
                                            : "img_preview_boxx hide"
                                        }

                                        id={"variantimgbox" + variantdata.id}
                                      >
                                        <td colSpan="13">
                                          <div className="image_box">
                                            {(newImageUrls || []).map((imgg, i) => {
                                              return `${variantdata.id}` ===
                                                imgg.product_verient_id ? (
                                                <div
                                                  className="imgprivew_box"
                                                  key={i}
                                                >
                                                  {/* {console.log("imgg.image_position"+imgg.image_position)} */}
                                                  {imgg.image_position ===
                                                    "cover" ? (
                                                    <span className="cover_img">
                                                      Cover
                                                    </span>
                                                  ) : null}
                                                  <img
                                                    src={
                                                      imgg.product_image_path
                                                    }
                                                    key={i}
                                                    alt="apna_organic"
                                                    height={120}
                                                  />
                                                  <span
                                                    className="cover_icon"
                                                    onClick={(id) =>
                                                      onImgCoverEditClick(
                                                        imgg.product_image_id,
                                                        imgg.product_id,
                                                        imgg.product_verient_id
                                                      )
                                                    }
                                                  >
                                                    Set Cover
                                                  </span>
                                                  <button
                                                    className="cross_icon"
                                                    onClick={() =>
                                                      onImgRemove(
                                                        imgg.product_image_id,
                                                        imgg.product_image_name,
                                                        imgg.vendor_id,
                                                        imgg.product_id,
                                                        imgg.product_verient_id
                                                      )
                                                    }
                                                  >
                                                    &times;
                                                  </button>
                                                </div>
                                              ) : null;
                                            })}
                                            <div className="imgprivew_box">
                                              {currentPage === "choose-img" ? (

                                                <FileInput setImage={setImage} onImageSelected={onImageSelected} setimageName={setimageName} />
                                              ) : currentPage === "crop-img" ? (
                                                <ImageCropper
                                                  handleClose={handleClose}
                                                  // show={show}
                                                  image={image}
                                                  imageNamee={imageName}
                                                  modalShow={true}
                                                  onCropDone={(imgCroppedArea) => onCropDone(
                                                    imgCroppedArea,
                                                    variantdata.product_id,
                                                    variantdata.id,
                                                    variantdata.vendor_id,
                                                    console.log("variantdata.id ----onmageupdaload" + variantdata.id)



                                                  )
                                                  }
                                                  onCropCancel={onCropCancel}
                                                />
                                              ) : (
                                                <div>
                                                  <div>
                                                    <FileInput setImage={setImage} onImageSelected={onImageSelected} setimageName={setimageName} />
                                                  </div>
                                                  {/* {<FileInput/> === <ImageCropper /> ? (
                                                      <>
                                                        <button
                                                          onClick={() => {
                                                            setCurrentPage("crop-img");
                                                          }}
                                                          className="btn"
                                                        >
                                                          Crop
                                                        </button>

                                                        <button
                                                          onClick={() => {
                                                            setCurrentPage("choose-img");
                                                            setImage("");
                                                          }}
                                                          className="btn"
                                                        >
                                                          New Image
                                                        </button>
                                                      </>
                                                    ) : ""} */}
                                                </div>
                                              )}





                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    ) : null}
                                    {/* </Accordion.Body> */}
                                    {/* </Accordion.Item> */}
                                    <tr>
                                      <td colSpan={"12"}>
                                        {customvalidated === "imgformat" ? (
                                          <span
                                            className="mt-2   text-center fs-6 text-danger"
                                            type="invalid"
                                          >
                                            Image Format should be in jpg,
                                            jpeg or png
                                          </span>
                                        ) : null}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            {changeUnitproperty === "editvariety" ? (
                              <tr>
                                <td
                                  className="text-primary text-center mx-5"
                                  colSpan={12}
                                >
                                  Now You can edit vareity type
                                </td>
                              </tr>
                            ) : null}
                          </tbody>
                        </Table>
                        {/* </Accordion> */}
                        {/* </Col>
                      </Form.Group> */}

                      </div>
                    </div>
                  </div>
                  {/* </Form.Group> */}
                </div>



              </Modal.Body>

              <Modal.Footer>
                <button
                  className="button main_outline_button"
                  onClick={handlevarietyClose}
                >
                  Close
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

          <SAlert
            show={VerityAlert}
            title="Product Name"
            text="Are you Sure you want to delete"
            onConfirm={hideAlert}
            showCancelButton={true}
            onCancel={closeAlert}
          />

          <SAlert
            show={Alert}
            title="Product Name"
            text="Are you Sure you want to delete"
            onConfirm={deleteProductAlert}
            showCancelButton={true}
            onCancel={closeAlert}
          />

          <SAlert
            show={ProductAlert}
            title="Added Successfully"
            text={"Product Added"}
            onConfirm={closeProductAlert}
          />

          <SAlert
            show={ProductDraftAlert}
            title="Added Successfully "
            text=" Product Added To Draft"
            onConfirm={closeProductAlert}
          />

          <SAlert
            show={UpdatetAlert}
            title="Updated Successfully "
            text=" Product Updated"
            onConfirm={closeProductAlert}
          />

          {/* feature product modal */}

          <Modal show={featureshow} onHide={featureModalClose}>
            <Form className="" novalidate validated={validated} ref={formRef} onSubmit={OnOfferProductAdd}>
              <Modal.Header closeButton>
                <Modal.Title>Add Offer Product</Modal.Title>
              </Modal.Header>
              {error === false ? (
                <p
                  className="mt-2 ms-2 text-danger text-center fs-6"
                  type="invalid"
                >
                  Already Added In Offred Product List!!!
                </p>
              ) : null}

              <Modal.Body className="p-3">
                <div className="d-flex justify-content-center align-items-center p-0 m-0">
                  <div className="">
                    <div className="">
                      <div className="row px-3">
                        <div className="col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextName"
                          >
                            <Form.Label className="" column sm="12">
                              Product Name
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Name"
                              value={productname}
                              name={"productname"}

                            />
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextName"
                          >
                            <Form.Label className="" column sm="12">
                              Product Id
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Name"
                              value={featuredata.product_id}
                              name={"product_id"}
                              required
                            />
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextName"
                          >
                            <Form.Label className="" column sm="12">
                              Offer Type
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Name"
                              value={featuredata.fetured_type}
                              name={"fetured_type"}
                              required
                            />
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextName"
                          >
                            <Form.Label className="" column sm="12">
                              Start Date
                            </Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="Name"
                              onChange={(e) => OnFeatureDateChaneg(e)}
                              value={featuredata.start_date}
                              name={"start_date"}
                              required
                              min={moment().format("YYYY-MM-DD")}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please fill start date
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextName"
                          >
                            <Form.Label className="" column sm="12">
                              End Date
                            </Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="Name"
                              onChange={(e) => OnFeatureDateChaneg(e)}
                              value={featuredata.end_date}
                              disabled={featuredata.start_date ? false : true}
                              name={"end_date"}
                              required
                              min={moment(featuredata.start_date).format(
                                "YYYY-MM-DD"
                              )}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please fill end date
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="">
                <Iconbutton
                  type={"button"}
                  btntext={"Cancel"}
                  onClick={featureModalClose}
                  btnclass={"button main_outline_button "}
                />
                <Iconbutton
                  // onClick={OnOfferProductAdd}
                  btntext={"Added"}
                  btnclass={"button main_button "}
                />
              </Modal.Footer>
            </Form>
          </Modal>
          <SAlert
            show={RestoreAlert}
            title={productname}
            onConfirm={() => setRestoreAlert(false)}
          />
        </div>
      </div>
    </>
  );
}

export default Product;
