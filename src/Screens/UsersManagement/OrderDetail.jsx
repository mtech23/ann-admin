import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import {
  GetBookdetail,
  GetOrderdetail,
  Getchaptersdetail,
  GetchaptersDelete,
  Getpagedetail,
  pageDelete
} from "../../api";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { SelectBox } from "../../Components/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomInput from "../../Components/CustomInput";

import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import { ordersManagement } from "../../Config/Data";

export const OrdersDetails = () => {
  const Bookstatus = [
    {
      key: "0",
      name: "Free"
    },
    {
      key: "1",
      name: "Paid"
    }
  ];
  const { id } = useParams();
  const [chapterdata, setChapterData] = useState([]);

  const base_url = process.env.REACT_APP_BASE_URL;
  const [Bookdetail, setBookdetail] = useState({});
  const [Orderdetail, setOrderdetail] = useState({});
  const [isChapter, setIsChapter] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [pageModal, setpageModal] = useState(false);

  const [addpageModal, setaddpageModal] = useState(false);

  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false);

  const [pagesadd, setPagesadd] = useState();

  const [pagesdetail, setPagesdetail] = useState();
  const [formData, setFormData] = useState({});

  const [data, setData] = useState({});

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const orderdetail = async () => {
    try {
      const response = await GetOrderdetail(id);
      console.log("response", response);

      setOrderdetail(response?.detail);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  useEffect(() => {
    orderdetail();
  }, [id]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    document.title = "Julieanna | Order Detail";
  }, []);

  const editDetailData = () => {};
  const handleEdit = (e) => {};
  console.log("order", Orderdetail?.country?.name);
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Order Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">User Name</p>
                  <p>{Orderdetail?.user?.name}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Order Code</p>
                  <p>{Orderdetail?.order_code}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Total Amount</p>
                  <p>{Orderdetail?.total_amount}</p>
                </div>
                {/* <div className="col-md-6 mb-4">
                  <p className="secondaryText">Last Name</p>
                  <p>{Orderdetail?.last_name}</p>
                </div> */}
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Address</p>
                  <p>{Orderdetail?.address1}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Phone</p>
                  <p>{Orderdetail?.phone}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Email</p>
                  <p>{Orderdetail?.email}</p>
                </div>

                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Country</p>
                  <p>{Orderdetail?.country?.name}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">State</p>
                  <p>{Orderdetail?.state?.name}</p>
                </div>
                {Orderdetail?.data?.map((item, index) => (
                  // <div className="row" key={index}>
                  <>
                    <div className="col-md-6 mb-4">
                      <p className="secondaryText">Price</p>
                      <p>{item?.price}</p>
                    </div>
                    <div className="col-md-6 mb-4">
                      <p className="secondaryText">Book Title</p>
                      <p>{item?.book?.title}</p>
                    </div>
                    <div className="col-md-6 mb-4">
                      <p className="secondaryText">Chapter Title</p>
                      <p>{item?.chapter?.title || "N/A"}</p>
                    </div>
                  </>
                ))}
              </div>
              {/* ))} */}
            </div>
          </div>
        </div>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          action={inActive}
          heading="Are you sure you want to mark this user as inactive?"
        />
        <CustomModal
          show={showModal2}
          close={() => {
            setShowModal2(false);
          }}
          success
          heading="Marked as Inactive"
        />

        <CustomModal
          show={showModal3}
          close={() => {
            setShowModal3(false);
          }}
          action={Active}
          heading="Are you sure you want to mark this user as Active?"
        />
        <CustomModal
          show={showModal4}
          close={() => {
            setShowModal4(false);
          }}
          success
          heading="Marked as Active"
        />

        <CustomModal
          show={editModal}
          close={() => {
            setEditModal(false);
          }}
          heading="Edit Book Chapters"
        >
          <CustomInput
            label="Chapter Title"
            required
            id="title"
            type="text"
            placeholder="Enter Chapter Title"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <CustomInput
            label="Chapter price"
            required
            id="title"
            type="text"
            placeholder="Enter Chapter price"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="price"
            value={formData?.price}
            onChange={handleChange}
          />

          <CustomInput
            label="Chapter Audio"
            required
            id="audio_file"
            type="file"
            placeholder="Upload Chapter Audio"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="audio_file"
            onChange={handleChange}
          />

          <CustomButton
            variant="primaryButton"
            text="Edit"
            type="button"
            onClick={handleEdit}
          />
        </CustomModal>

        <CustomModal
          show={pageModal}
          close={() => {
            setpageModal(false);
          }}
          heading="Page Content"
        >
          <div className="col-md-6 mb-4">
            <p className="secondaryText"> Content </p>
            <p>{pagesdetail?.content}</p>
          </div>

          {/* <CustomButton variant='primaryButton' text='Page Content ' type='button' onClick={handleEdit} /> */}
        </CustomModal>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          success
          heading="Chapter Added Successfully."
        />
      </DashboardLayout>
    </>
  );
};
