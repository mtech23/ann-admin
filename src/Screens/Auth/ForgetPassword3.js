import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";

import "./style.css";

const ForgetPassword3 = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "Julieanna | Password Recovery";
  }, []);

  // const handleClick = () => {
  //     setShowModal(true)
  // }

  const handleClick = async (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();
    formDataMethod.append("email", localStorage.getItem("email"));
    formDataMethod.append("otp", localStorage.getItem("otp"));
    formDataMethod.append("password", formData.password);
    formDataMethod.append(
      "password_confirmation",
      formData.password_confirmation
    );
    document.querySelector(".loaderBox").classList.remove("d-none");

    const apiUrl =
      "https://custom3.mystagingserver.site/julieanna-api/public/api/reset_password";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataMethod,
      });

      if (response.ok === true) {
        const responseData = await response.json();
        console.log("responseData", responseData);
        localStorage.setItem("login", responseData.token);
        console.log("Login Response:", responseData);
        document.querySelector(".loaderBox").classList.add("d-none");
        setShowModal(true);
        // navigate('/dashboard')
      } else {
        document.querySelector(".loaderBox").classList.add("d-none");
        alert("Invalid Credentials");

        console.error("Login failed");
      }
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");
      console.error("Error:", error);
    }
  };

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <>
      <AuthLayout
        authTitle="Password Recovery"
        authPara="Enter a new password."
        backOption={true}
      >
        <form>
          <CustomInput
            label="New Password"
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
            required
            id="pass"
            type="password"
            placeholder="Enter New Password"
            labelClass="mainLabel"
            inputClass="mainInput"
          />
          <CustomInput
            onChange={(event) => {
              setFormData({
                ...formData,
                password_confirmation: event.target.value,
              });
            }}
            label="Confirm Password"
            required
            id="cPass"
            type="password"
            placeholder="Confirm Password"
            labelClass="mainLabel"
            inputClass="mainInput"
          />

          <div className="mt-4 text-center">
            <CustomButton
              type="button"
              variant="primaryButton"
              text="Update"
              onClick={handleClick}
            />
          </div>
        </form>
      </AuthLayout>

      <CustomModal
        show={showModal}
        success
        heading="Password updated successfully. Please login to continue"
        close={redirectHome}
        btnTxt="Continue"
      />
    </>
  );
};

export default ForgetPassword3;
