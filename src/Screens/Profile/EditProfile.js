import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { country, currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import CustomModal from "../../Components/CustomModal";

import "./style.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [userNewData, setUserNewData] = useState({});
  const [optionData, setOptionData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleClickPopup = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);

    navigate("/profile");
  };

  useEffect(() => {
    document.title = "Julieanna | Edit Profile";
    setOptionData(country);
    setUserData(currentUser);
  });

  const baseurl = process.env.REACT_APP_BASE_URL;

  const userprofile = () => {
    const LogoutData = localStorage.getItem("login");

    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}api/aboutAuthor`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setUserNewData(data.data);
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
    document.querySelector(".loaderBox").classList.remove("d-none");

    const formDataMethod = new FormData();

    for (const key in userNewData) {
      formDataMethod.append(key, userNewData[key]);
    }

    fetch(`${apiUrl}api/addAuthorDetails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${logoutData}`,
      },
      body: formDataMethod,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("datas", data.data);
        document.querySelector(".loaderBox").classList.add("d-none");

        if (data?.status == true) {
          setShowModal(true);
        } else {
        }
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.error("Error:", error);
      });
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
                              : baseurl + userNewData?.image
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
                      </div>
                      <div className="row">
                        <div className="col-12 mb-3">
                          {/* <h4 className="secondaryLabel">Email Address</h4>
                                                    <p className="secondaryText">{userData.email}</p> */}
                          <CustomInput
                            label="Email"
                            labelClass="mainLabel"
                            required
                            type="email"
                            placeholder="Phone Number"
                            inputClass="mainInput"
                            value={userNewData?.email}
                            onChange={(event) => {
                              setUserNewData({
                                ...userNewData,
                                email: event.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      {/* <div className="row">
                                                <div className="col-12 mb-3">
                                                    <CustomInput label="Phone Number" labelClass="mainLabel" required type="number" placeholder="Phone Number" inputClass="mainInput" onChange={(event) => { setUserNewData({ ...userNewData, name: event.target.value }) }} />
                                                </div>
                                            </div> */}

                      <div className="inputWrapper col-md-8">
                        <div className="form-controls">
                          <label className=" mb-2" htmlFor="">
                            Discripction
                          </label>
                          <textarea
                            name="content"
                            className="form-control shadow border-0"
                            id="description"
                            cols="30"
                            rows="10"
                            // value={formData?.content}
                            // onChange={handleChange}

                            value={userNewData?.description}
                            onChange={(event) => {
                              setUserNewData({
                                ...userNewData,
                                description: event.target.value,
                              });
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <CustomButton
                        type="submit"
                        variant="primaryButton"
                        className="me-3 mb-2"
                        text="Save"
                        onClick={handleClickPopup}
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
          close={handleClose}
          success
          heading="Your profile is Successfully Updated! Continue"
        />
      </DashboardLayout>
    </>
  );
};

export default EditProfile;
