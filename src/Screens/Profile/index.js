import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomButton from "../../Components/CustomButton";

import "./style.css";

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

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
        setUserData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Julieanna | My Profile";
    userprofile();
    // setUserData(currentUser);
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <h2 className="mainTitle">My Profile</h2>
            </div>
          </div>
          <div className="row mb-3">
            {userData ? (
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-lg-4 order-2 order-lg-1 mb-3">
                    <div className="profileImage">
                      <img src={baseurl + userData?.image} alt="User" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row mb-4">
                      <div className="col-lg-3 mb-3">
                        <h4 className="secondaryLabel">Full Name</h4>
                        <p className="secondaryText">{userData.name}</p>
                      </div>
                      <div className="col-lg-9 mb-3">
                        <h4 className="secondaryLabel">Discripction</h4>
                        <p
                          className="secondaryText"
                          dangerouslySetInnerHTML={{
                            __html: userData.description,
                          }}
                        ></p>

                      </div>
                      <div className="col-lg-6 mb-3">
                        <h4 className="secondaryLabel">Email</h4>
                        <p className="secondaryText">{userData.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <CustomButton
                      type="button"
                      variant="primaryButton"
                      className="me-3 mb-2"
                      text="Edit Profile"
                      onClick={() => {
                        navigate("/profile/edit-profile");
                      }}
                    />
                    <CustomButton
                      type="button"
                      variant="secondaryButton"
                      className="me-3 mb-2"
                      text="Change Password"
                      onClick={() => {
                        navigate("/profile/change-password");
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;
