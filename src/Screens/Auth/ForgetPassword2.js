import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

const ForgetPassword2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    document.title = "Ann | Password Recovery";
  }, []);

  // const handleClick = (e) => {
  //     e.preventDefault()
  //     navigate('/forget-password3')
  // }

  const [otp, setotp] = useState("");

  const [timer, setTimer] = useState(5);
  const [canResend, setCanResend] = useState(false);
  const [canContinue, setCanContinue] = useState(true);
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
      setCanContinue(false); // Disable the "Continue" button after 1 minute
    }
  }, [timer]);

  const handleResend = async () => {
    if (canResend) {
      const formDataMethod = new FormData();
      formDataMethod.append("email", localStorage.getItem("email"));
      document.querySelector(".loaderBox").classList.remove("d-none");

      const apiUrl =
        "https://custom3.mystagingserver.site/julieanna-api/public/api/forgot_password";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formDataMethod,
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("responseData", responseData);
          document.querySelector(".loaderBox").classList.add("d-none");
          navigate("/forget-password2");
        } else {
          document.querySelector(".loaderBox").classList.add("d-none");
          alert("Invalid Credentials");
          console.error("Resend failed");
        }
      } catch (error) {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.error("Error:", error);
      }

      setTimer(50);
      setCanResend(false);
      setCanContinue(true); // Re-enable the "Continue" button
    }
  };

  // const handleClick = async (event) => {
  //     event.preventDefault();

  //     const formDataMethod = new FormData();
  //     formDataMethod.append('email', localStorage.getItem('email'));
  //     formDataMethod.append('otp', formData.password);
  //     localStorage.setItem('otp', formData.password);

  //     document.querySelector('.loaderBox').classList.remove("d-none");

  //     const apiUrl = 'https://custom3.mystagingserver.site/julieanna-api/public/api/otp_verification';

  //     try {
  //         const response = await fetch(apiUrl, {
  //             method: 'POST',
  //             body: formDataMethod
  //         });

  //         if (response.ok) {
  //             const responseData = await response.json();
  //             console.log("responseData", responseData);
  //             localStorage.setItem('login', responseData.token);
  //             console.log('Login Response:', responseData);
  //             document.querySelector('.loaderBox').classList.add("d-none");

  //             if (responseData.status === true) {
  //                 navigate('/forget-password3');
  //             } else {
  //                 // alert('Invalid Credentials');
  //                 setotp(responseData.message)
  //                 console.error('Login failed');
  //             }
  //         } else {
  //             // setotp(responseData.message)
  //             // alert('Invalid Credentials');
  //             console.error('Login failed');
  //         }
  //     } catch (error) {
  //         document.querySelector('.loaderBox').classList.add("d-none");
  //         console.error('Error:', error);
  //     } finally {
  //         document.querySelector('.loaderBox').classList.add("d-none");
  //     }
  // };

  const handleClick = async (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();
    formDataMethod.append("email", localStorage.getItem("email"));
    formDataMethod.append("otp", formData.password);
    localStorage.setItem("otp", formData.password);

    document.querySelector(".loaderBox").classList.remove("d-none");

    const apiUrl =
      "https://custom3.mystagingserver.site/julieanna-api/public/api/otp_verification";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataMethod,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData", responseData);
        localStorage.setItem("login", responseData.token);
        console.log("Login Response:", responseData);
        document.querySelector(".loaderBox").classList.add("d-none");

        if (responseData.status === true) {
          navigate("/forget-password3");
        } else {
          setotp(responseData?.message);
          console.error("Login failed");
        }
      } else {
        alert("Invalid Credentials");
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  return (
    <>
      <AuthLayout
        authTitle="Verification Code"
        authPara="Please Check Your Email For Verification Code."
        subauthPara="Your Cod is 4 digit in Length"
        backOption={true}
      >
        <form>
          <div class="inputWrapper">
            <label for="verificationCode" class="mainLabel">
              Verification Code<span>*</span>
            </label>
          </div>
          {/* <div className='verification-box justify-content-between'> */}
          {/* <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, code: event.target.value })
                        }} />
                        <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, code: event.target.value })
                        }} />
                        <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, code: event.target.value })
                        }} />
                        <CustomInput
                            required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                                setFormData({ ...formData, code: event.target.value })
                            }} />


                        <CustomInput required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, code: event.target.value })
                        }} /> */}
          <CustomInput
            required
            id="userEmail"
            type="text"
            placeholder="Verification Code"
            labelClass="mainLabel"
            inputClass="mainInput"
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
          />{" "}
          <p className="otpclass">{otp}</p>
          {/* </div> */}
          <div className="d-flex align-items-baseline justify-content-between mt-1">
            <p className="text-danger fw-bold">
              {canResend
                ? "You can resend the code now."
                : `Resending in 00:${timer < 10 ? `0${timer}` : timer}`}
            </p>{" "}
            <button
              type="button"
              className={`notButton primaryColor fw-bold text-decoration-underline ${
                !canResend && "disabled"
              }`}
              onClick={handleResend}
              disabled={!canResend}
            >
              Resend Code
            </button>
          </div>
          <div className="mt-4 text-center">
            <CustomButton
              type="button"
              variant="primaryButton"
              text="Continue"
              onClick={handleClick}
              disabled={!canContinue}
            />
          </div>
        </form>
      </AuthLayout>
    </>
  );
};
export default ForgetPassword2;
