import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { Editpolicy, getpolicedetail } from "../../api";
import CustomButton from "../../Components/CustomButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const EditPolicies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ description: "" });
  const [showModal, setShowModal] = useState(false);

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
      description: value,
    }));
  };

  const policedetail = async () => {
    try {
      const response = await getpolicedetail(id);
      setFormData(response?.data);
    } catch (error) {
      console.error("Error in fetching policy detail:", error);
    }
  };

  useEffect(() => {
    policedetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }
    formDataMethod.append("contentkey", "privacy");
    formDataMethod.append("id", id);

    try {
      const response = await Editpolicy(formDataMethod);
      if (response?.status === true) {
        navigate("/policies-management");
      }
    } catch (error) {
      console.error("Error in editing policy:", error);
    }
  };

  useEffect(() => {
    document.title = "Ann | Edit Policy";
  }, []);

  return (
    <DashboardLayout>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <h2 className="mainTitle">
              <BackButton />
              Edit Policies
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
                        id="title"
                        type="text"
                        placeholder="Title"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="title"
                        value={formData?.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-12 mb-4">
                      <div className="inputWrapper">
                        <div className="form-controls">
                          <label htmlFor="description">Description</label>
                          <ReactQuill
                            value={formData?.description}
                            onChange={handleQuillChange}
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
        close={() => setShowModal(false)}
        success
        heading="Policy updated Successfully."
      />
    </DashboardLayout>
  );
};
