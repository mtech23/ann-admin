import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    document.title = "Julieanna | Password Recovery";
  }, []);

  // const handleClick = (e) => {
  //     e.preventDefault()
  //     navigate('/forget-password2')
  // }

  const handleClick = async (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();
    formDataMethod.append("email", formData.email);
    // formDataMethod.append('password', formData.password);
    localStorage.setItem("email", formData.email);
    document.querySelector(".loaderBox").classList.remove("d-none");

    const apiUrl =
      "https://custom3.mystagingserver.site/julieanna-api/public/api/forgot_password";

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
        navigate("/forget-password2");
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

  return (
    <>
      <AuthLayout
        authTitle="Password Recovery"
        authPara="Enter your email address to receive a verification code."
        backOption={true}
      >
        <form>
          <CustomInput
            label="Email Address"
            required
            id="userEmail"
            type="email"
            placeholder="Enter Your Email Address"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
          <div className="mt-4 text-center">
            <CustomButton
              type="button"
              variant="primaryButton"
              text="Continue"
              onClick={handleClick}
            />
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default ForgetPassword;
