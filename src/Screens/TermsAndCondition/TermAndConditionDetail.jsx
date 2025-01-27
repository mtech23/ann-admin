import { useState, useEffect } from "react";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import {
  GettermsDelete,
} from "../../api";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { SelectBox } from "../../Components/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomInput from "../../Components/CustomInput";

import {
  faEdit,
  faEllipsisV,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { Dropdown } from "react-bootstrap";

export const TermsAndConditionDetails = (props) => {
  const { id, reload, setReload, data } = props;
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [pageModal, setpageModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [pagesdetail, setPagesdetail] = useState();
  const [formData, setFormData] = useState({});
  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  useEffect(() => {
    document.title = "Ann | Terms & Condition Detail";
  }, []);

 
  return (
    <>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <h2 className="mainTitle">Terms And Conditions Details</h2>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <div className="col-md-10 mb-4">
                <p className="secondaryText">Title</p>
                <p>{data.title}</p>
              </div>
            

              <div className="col-md-12 mb-4">
                <p className="secondaryText">Description</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.content,
                  }}
                ></p>
              </div>
            </div>
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

      </CustomModal>

      <CustomModal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        success
        heading="Chapter Added Successfully."
      />
    </>
  );
};
