import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import { Editpolicy, getpolicedetail } from "../../api";
import CustomButton from "../../Components/CustomButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styling

export const EditTermsAndCondition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value, // Store the Quill editor's content in description
    }));
  };

  const policedetail = async () => {
    try {
      const response = await getpolicedetail(id);
      setFormData(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);
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
    formDataMethod.append("contentkey", "terms");
    formDataMethod.append("id", id);

    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const response = await Editpolicy(formDataMethod);

      if (response?.status === true) {
        navigate("/terms-condition-management");
      }
    } catch (error) {
      console.error("Error in adding model post:", error);
    }
  };

  useEffect(() => {
    document.title = "Julieanna | Edit Terms & Condition";
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Terms and Condition
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

                      <div className="col-md-12 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="">Description</label>
                            <ReactQuill
                              value={formData?.description}
                              onChange={handleDescriptionChange}
                              modules={{
                                toolbar: [
                                  [{ 'header': '1' }, { 'header': '2' }],
                                  ['bold', 'italic', 'underline'],
                                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                  ['link', 'image'],
                                ],
                              }}
                              formats={[
                                'header', 'bold', 'italic', 'underline',
                                'list', 'bullet', 'link', 'image'
                              ]}
                              className="form-control shadow border-0"
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
          heading="Terms and Condition updated successfully."
        />
      </DashboardLayout>
    </>
  );
};
