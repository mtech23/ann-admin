import { useState } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../Components/CustomModal";

export const AddNote = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setmodalText] = useState("");
  const [success, setsuccess] = useState(false);
  const [formData, setFormData] = useState({ content: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_BASE_URL;
    const logoutData = localStorage.getItem("login");

    // Show loader
    document.querySelector(".loaderBox").classList.remove("d-none");

    // Create FormData and append the content
    const formDataMethod = new FormData();
    formDataMethod.append("content", formData.content);

    fetch(`${apiUrl}api/add-story`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${logoutData}`
      },
      body: formDataMethod
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setsuccess(true);
        setmodalText(response.message);
        setShowModal(true);
        return response.json();
      })
      .then((data) => {
        // Hide loader
        document.querySelector(".loaderBox").classList.add("d-none");

        if (data?.status === true) {
          setsuccess(true);
          setmodalText(data.message);
          setShowModal(true);
          setTimeout(() => {
            navigate("/story-management");
          }, 1000);
        } else {
          setsuccess(false);
          setmodalText(data.message);
          setShowModal(true);
          console.error("Error in response:", data);
        }
      })
      .catch((error) => {
        // Hide loader
        document.querySelector(".loaderBox").classList.add("d-none");
        console.error("Error:", error);
      });
  };

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="dashCard">
                  <div className="row mb-3 justify-content-between">
                    <div className="col-md-6 mb-2">
                      <h2 className="mainTitle">
                        <BackButton /> Create a Story
                      </h2>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="Add content"
                        required
                        id="content"
                        type="text"
                        placeholder="Add content"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <CustomButton
                    variant="primaryButton"
                    text="Create Now"
                    type="submit"
                  />
                </div>
              </form>
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
        </div>
      </DashboardLayout>
    </>
  );
};
