import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { Addbook, Editbook, GetBookdetail } from "../../api";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";

import { getEntity, toastAlert } from "../../utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

export const EditPlan = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cover: "",
  });

  const [feedback, setFeedback] = useState({
    modalHeading: "Add New Category",
    feedbackModalHeading: "",
    feedbackMessage: "",
    success: false, // true for success modal, false for error modal
    btnText: "Add",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == "availability") {
      const val =
        value == "out of stock" ? false : value == "available" ? true : "";
      setFormData((prevData) => ({
        ...prevData,
        [name]: val,
      }));
    } else {
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

  const plandetail = async () => {
    try {
  const url = `${process.env.REACT_APP_BASE_URL}`;

  
      await fetch(`${url}featureplan?id=${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setFormData(result?.data||[]);
          
        })
        .catch((error) => console.error(error))
        .finally(() => {
          document.querySelector(".loaderBox").classList.add("d-none");
        });
    
    } catch (error) {
      console.error("Error in logging in:", error);
    }
  };


  useEffect(() => {
    
    plandetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }
    // formDataMethod.delete("category");

    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const token = localStorage.getItem("login");
      const url = `${process.env.REACT_APP_BASE_URL}`;

      const response = await fetch(
        `${url}featureplan?id=${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          body: formDataMethod,
        }
      );
      const resp=await response.json()


      if (resp?.status) {
        // setFeedback({
        //   modalHeading: "Success",
        //   feedbackModalHeading: "Plan Updated",
        //   feedbackMessage: resp.message,
        //   success: resp.success,
        // });
        toast.success(resp?.message);
        navigate("/plan-management");
      }
    } catch (error) {
      // setFeedback({
      //   modalHeading: "Error",
      //   feedbackModalHeading: "Update Failed",
      //   feedbackMessage: error.message,
      //   success: error.success,
      // });
      console.error("Error in updating book:", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  useEffect(() => {
    document.title = "Ann | Edit Book";
  }, []);

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

   const handleDurationChange = (event) => {
    const { value } = event.target;
    const durationInDays = value * 30; // Convert months to days (1 month = 30 days)
    setFormData((prevData) => ({
      ...prevData,
      duration: durationInDays,
    }));
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Book +++
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="ISBN"
                          
                          id="ISBN"
                          type="text"
                          placeholder="Enter ISBN"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="ISBN"
                          value={formData.ISBN}
                          onChange={handleChange}
                        />
                      </div> */}
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
                        <CustomInput
                          label="Duration"
                          required
                          id="jobID"
                          type="number"
                          placeholder="Enter Duration of this plan"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="col-md-12 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="description">Description</label>
                            <ReactQuill
                              style={{ height: 200, marginBottom: 50 }}
                              value={formData?.description}
                              onChange={handleQuillChange}
                            />
                          </div>
                        </div>
                      </div> */}
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
          close={() => setShowModal(false)}
          success={feedback.success}
          heading={feedback.feedbackMessage}
        ></CustomModal>
      </DashboardLayout>
    </>
  );
};
