import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { country, currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";

import "./style.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [userNewData, setUserNewData] = useState({});
  const [optionData, setOptionData] = useState({});
  const [showModal, setShowModal] = useState(false);


  const [feedback, setFeedback] = useState({
    modalHeading: "Add New Category",
    feedbackModalHeading: "",
    feedbackMessage: "",
    success: false, // true for success modal, false for error modal
    btnText: "Add",
  });

  // const handleClickPopup = () => {
  //   setShowModal(true);
  // };

  const handleClose = () => {
    setShowModal(false);

    navigate("/profile");
  };

  useEffect(() => {
    document.title = "Ann | Edit Profile";
    setOptionData(country);
    setUserData(currentUser);
  });

  const baseurl = process.env.REACT_APP_BASE_URL;

  const userprofile = () => {
    const LogoutData = localStorage.getItem("login");

    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('qqqqqqqqqqqq', data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setUserNewData(data.user);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });

  };

  const handlefile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file;
      setUserNewData((prevData) => ({
        ...prevData,
        image: fileName,
      }));
    }
  };
  useEffect(() => {
    userprofile();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_BASE_URL;
    console.log("API URL:", apiUrl);

    const logoutData = localStorage.getItem("login");


    const formDataMethod = new FormData();

    for (const key in userNewData) {
      formDataMethod.append(key, userNewData[key]);
    }
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${apiUrl}profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${logoutData}`,
      },
      body: formDataMethod,
    })
      .then((response) => {

        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setFeedback({
            modalHeading: "Success",
            feedbackModalHeading: "Profile Updated",
            feedbackMessage: data.message,
            success: data.success,
          })
          setShowModal(true)
        }

        userprofile();

      })
      .catch((error) => {
        console.error("Error:", error);
        setFeedback({
          modalHeading: "Error",
          feedbackModalHeading: "Update Failed",
          feedbackMessage: error.message,
          success: error.success,
        });

        setShowModal(true)
      });

    document.querySelector(".loaderBox").classList.add("d-none");
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <h2 className="mainTitle">
                <BackButton />
                Edit Profile
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            {userData ? (
              <div className="col-12">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-lg-4 order-2 order-lg-1 mb-3">
                      <div className="profileImage">
                        <img
                          src={
                            userNewData?.image instanceof File
                              ? URL.createObjectURL(userNewData?.image)
                              : 'https://custom3.mystagingserver.site/ann-api' + userNewData?.image
                          }
                        />

                        <input
                          type="file"
                          accept="img/*"
                          className="d-none"
                          id="profileImage"
                          onChange={handlefile}
                        />
                        <label
                          htmlFor="profileImage"
                          className="imageUploadButton"
                        >
                          <FontAwesomeIcon icon={faCamera} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <CustomInput
                            label="Name"
                            labelClass="mainLabel"
                            required
                            type="text"
                            placeholder="Enter Name"
                            inputClass="mainInput"
                            value={userNewData?.name}
                            onChange={(event) => {
                              setUserNewData({
                                ...userNewData,
                                name: event.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <CustomInput
                            label="Phone No"
                            labelClass="mainLabel"
                            required
                            type="number"
                            placeholder="Enter Phone Number"
                            inputClass="mainInput"
                            value={userNewData?.phoneNo}
                            onChange={(event) => {
                              setUserNewData({
                                ...userNewData,
                                phoneNo: event.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="col-12">
                      <CustomButton
                        type="submit"
                        variant="primaryButton"
                        className="me-3 mb-2"
                        text="Save"
                      />
                      <CustomButton
                        type="button"
                        variant="secondaryButton"
                        className="me-3 mb-2"
                        text="Cancel"
                        onClick={() => {
                          navigate("/profile");
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <CustomModal
          show={showModal}
          close={() => setShowModal(false)}
          success={feedback.success}
          heading={feedback.feedbackMessage}
        >
        </CustomModal>
      </DashboardLayout>
    </>
  );
};

export default EditProfile;
