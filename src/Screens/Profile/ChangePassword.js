import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";

import "./style.css";
import api from "../../services/api";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Ann | Change Password";
    // Assuming you get the email from current user or other means
    setFormData((prev) => ({ ...prev, email: JSON.parse(localStorage.getItem('user')).email }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    const { email, password, confirmPassword } = formData;

    // Input validation
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/auth/resetPassword", { email, password, confirmPassword });

      if (response.status === 200) {
        setShowModal(true);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data?.message || "Failed to update password.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <h2 className="mainTitle">
                <BackButton />
                <span className="px-2">Change Password</span>
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-xl-4 col-lg-4">
              <form>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomInput
                      label="Email"
                      labelClass="mainLabel"
                      required
                      name="email"
                      type="text"
                      placeholder="Enter email"
                      inputClass="mainInput"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomInput
                      label="New Password"
                      labelClass="mainLabel"
                      required
                      name="password"
                      type="password"
                      placeholder="Enter New Password"
                      inputClass="mainInput"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomInput
                      label="Confirm New Password"
                      labelClass="mainLabel"
                      required
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      inputClass="mainInput"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <CustomButton
                      type="button"
                      variant="primaryButton"
                      className="me-3 mb-2"
                      text="Update"
                      onClick={handleChangePassword}
                    />
                  </div>
                  <div className="col-6">
                    <CustomButton
                      type="button"

                      variant="secondaryButton"
                      text="Cancel"
                      onClick={() => navigate(-1)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
            navigate("/dashboard"); // Redirect after success
          }}
          success
          heading="Your Password is Successfully Updated!"
        />
      </DashboardLayout>
    </>
  );
};

export default ChangePassword;
