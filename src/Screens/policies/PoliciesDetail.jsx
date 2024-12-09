import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import {
  GetBookdetail,
  Getchaptersdetail,
  GetchaptersDelete,
  Getpagedetail,
  pageDelete,
  getpolicedetail,
  GetpolicyDelete,
} from "../../api";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { SelectBox } from "../../Components/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomInput from "../../Components/CustomInput";

import {
  faEdit,
  faEllipsisV,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { ordersManagement } from "../../Config/Data";
import { Dropdown } from "react-bootstrap";

export const PoliciesDetails = (props) => {
  const { id, reload, setReload } = props;
  const Bookstatus = [
    {
      key: "0",
      name: "Free",
    },
    {
      key: "1",
      name: "Paid",
    },
  ];
  // const { id } = useParams();

  const [chapterdata, setChapterData] = useState([]);

  const base_url = process.env.REACT_APP_BASE_URL;
  const [Bookdetail, setBookdetail] = useState({});
  const [Policydetail, setPolicydetail] = useState({});
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

  const policydetail = async () => {
    try {
      const response = await getpolicedetail(id);

      setPolicydetail(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  useEffect(() => {
    policydetail();
  }, [id]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.title = "Ann | Policy Detail";
  }, []);

  const editDetailData = () => {};
  const handleEdit = (e) => {};
  const policydelete = async (id) => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const response = await GetpolicyDelete(id);
      console.log("response", response);
      console.log({ id });

      if (response?.status == true) {
        document.querySelector(".loaderBox").classList.add("d-none");
        setReload(!reload);
        // policiesList();
      }
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  return (
    <>
      {/* <DashboardLayout> */}
      <div className=" mb-4">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <h2 className="mainTitle">
              {/* <BackButton /> */}
              Privacy Policy Details
            </h2>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <div className="col-md-11 mb-4">
                <p className="secondaryText">Title</p>
                <p>{Policydetail.title}</p>
              </div>
              <div className="col">
                <Dropdown className="tableDropdown">
                  <Dropdown.Toggle
                    variant="transparent"
                    className="notButton classicToggle"
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="tableDropdownMenu">
                    <Link
                      to={`/policies-management/edit-policies/${Policydetail?.id}`}
                      className="tableAction"
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="tableActionIcon"
                      />
                      Edit
                    </Link>

                    <button
                      type="button"
                      className="bg-transparent border-0 ps-lg-3 pt-1"
                      onClick={() => {
                        policydelete(Policydetail?.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete
                    </button>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="col-md-12 mb-4">
                <p className="secondaryText">Description</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: Policydetail.description,
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
      {/* </DashboardLayout> */}
    </>
  );
};
