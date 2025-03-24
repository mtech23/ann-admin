import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { Addbook } from "../../api";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router";
import { getEntity, toastAlert } from "../../utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const AddPlan = () => {
  const navigate = useNavigate();
  const [modalText, setmodalText] = useState("");
  const [success, setsuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});



  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name == "availability") {
      const val =
        value == "out of stock" ? false : value == "available" ? true : "";
      setFormData((prevData) => ({
        ...prevData,
        [name]: val,
      }));
    }  else{
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const filehandleChange = (event, name) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file;
      setFormData((prevData) => ({
        ...prevData,
        [name]: fileName,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   

    // Show loader
    document.querySelector(".loaderBox").classList.remove("d-none");

    // Create FormData and append all fields
    const formDataMethod = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => {
          formDataMethod.append(key, item);
        });
      } else {
        formDataMethod.append(key, formData[key]);
      }
    }

    try {
      // Get token from local storage
      const token = localStorage.getItem("login"); // Replace "login" with the key storing your token if different.
      const url = `${process.env.REACT_APP_BASE_URL}`;

      // Make fetch request with token in Authorization header
      const response = await fetch(
        `${url}featureplan`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          },
          body: formDataMethod, // FormData for file uploads
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Handle response
      if (result?.status === true) {
        setsuccess(true);
        setmodalText(result.message);
        toastAlert(result.message)
        setShowModal(true);
        setTimeout(() => {
          navigate("/plan-management");
        }, 1000);
      } else {
        setsuccess(false);
        setmodalText(result.message || "Something went wrong.");
        setShowModal(true);
        console.error("Failed to add book:", result);
      }
    } catch (error) {
      // Handle errors
      setsuccess(false);
      setmodalText(error.message || "An unexpected error occurred.");
      setShowModal(true);
      console.error("Error in adding book:", error);
    } finally {
      // Hide loader and navigate
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  const handleDurationChange = (event) => {
    const { value } = event.target;
    const durationInDays = value * 30; // Convert months to days (1 month = 30 days)
    setFormData((prevData) => ({
      ...prevData,
      duration: durationInDays,
    }));
  };

 
  // const handleQuillChange = (value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     description: value,
  //   }));
  // };
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
         Create new plan 
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                  
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Title"
                          required
                          id="jobID"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Description"
                          required
                          id="jobID"
                          type="textarea"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Price"
                          required
                          id="jobID"
                           type="number"
                          placeholder="Enter Price"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                        />
                      </div>
                    
                      <div className="col-md-6 mb-4">
                        <div className="inputWrapper">
                          <label className="mainLabel">Duration (Months)</label>
                          <select
                            className="mainInput"
                            name="duration"
                            onChange={handleDurationChange}
                            value={formData.duration / 30} // Convert days back to months for display
                          >
                            <option value="">Select Duration</option>
                            {[...Array(12)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1} Month{index + 1 > 1 ? "s" : ""} (
                                {(index + 1) * 30} days)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      

                      <div className="col-md-12">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="submit"
                        />
                      </div>
                    </div>
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
          }}
          success={success}
          heading={modalText}
        />
      </DashboardLayout>
    </>
  );
};

export default AddPlan;
