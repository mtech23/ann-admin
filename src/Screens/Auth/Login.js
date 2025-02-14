import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    document.title = "Ann | Login";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();
    formDataMethod.append("email", formData.email);
    formDataMethod.append("password", formData.password);
    console.log(formData);
    document.querySelector(".loaderBox").classList.remove("d-none");

    const apiUrl =
      "https://custom3.mystagingserver.site:5010/api/auth/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataMethod,
      });

      if (response.ok === true) {
        const responseData = await response.json();
        console.log("responseData", responseData);
        localStorage.setItem("login", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        console.log("Login Response:", responseData);
        document.querySelector(".loaderBox").classList.add("d-none");
        navigate("/dashboard");
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
      <AuthLayout authTitle="Login" authPara="Login into your Account">
        <form onSubmit={handleSubmit}>
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
              console.log(event.target.value);
            }}
          />
          <CustomInput
            label="Password"
            required
            id="pass"
            type="password"
            placeholder="Enter Password"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
              console.log(event.target.value);
            }}
          />
          <div className="d-flex align-items-baseline justify-content-between mt-1">
            <div className="checkBox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="me-1"
              />
              <label htmlFor="rememberMe" className="fw-semibold">
                Remember Me
              </label>
            </div>
            <Link
              to={"/forget-password"}
              className="text-decoration-underline text-light"
            >
              Forget Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <CustomButton variant="primaryButton" text="Login" type="submit" />
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default AdminLogin;
