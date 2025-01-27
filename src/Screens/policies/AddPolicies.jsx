import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { Addpolicy } from "../../api";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AddPolicies = () => {
  const [formData, setFormData] = useState({type:"privacy"});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }
    formDataMethod.append("contentkey", "privacy");

    try {
      const response = await Addpolicy(formDataMethod);
      if (true) {
        navigate("/policies-management");
      } else {
        document.querySelector(".loaderBox").classList.remove("d-none");

        // Handle error or show notification
      }
    } catch (error) {
      document.querySelector(".loaderBox").classList.remove("d-none");

      console.error("Error in adding policy:", error);
    }
  };

  useEffect(() => {
    document.title = "Ann | Add Policy";
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add Privacy Policy
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <CustomInput
                          label="Title"
                          required
                          id="name"
                          type="text"
                          placeholder="Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData?.title}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-12  mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="content">Content</label>
                            <ReactQuill
                              value={formData?.content}
                              onChange={handleQuillChange}
                              className="form-control shadow border-0"
                              id="content"
                            />
                          </div>
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
          success
          heading="Policy added successfully."
        />
      </DashboardLayout>
    </>
  );
};
