import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomButton from "../../Components/CustomButton";
import CategoryCard from "../../Components/CategoryCard/index";
import CustomModal from "../../Components/CustomModal";
import { addcategory } from "../../api";
import CustomInput from "../../Components/CustomInput";

export const CategoryManagement = () => {
  const [feedback, setFeedback] = useState({
    modalHeading: "Add New Category",
    feedbackModalHeading: "",
    feedbackMessage: "",
    success: true, // true for success modal, false for error modal
    btnText: "Add",
  });

  const [edit, setEdit] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ title: "", parts_count: "" });

  const LogoutData = localStorage.getItem("login");
  const { id } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleDropdownToggle = (userId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const base_url = process.env.REACT_APP_BASE_URL;

  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const hanldeRoute = (id) => {
    if (id) {
      navigate(`/category-management/category-details/${id}`);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const CategoryData = () => {
    const url = `https://custom3.mystagingserver.site:5010/api/category`;
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        setData(data);
      })
      .catch((error) => {
        setData([]);
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  useEffect(() => {
    CategoryData();
  }, [location.pathname]);

  const handleDelete = (categoryId) => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    const url = `https://custom3.mystagingserver.site:5010/api/category?id=${categoryId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");

        if (data.status) {
          setFeedback({
            modalHeading: "Success",
            feedbackModalHeading: "Category Deleted Successfully",
            feedbackMessage: "The category has been removed successfully.",
            success: true,
          });
          setShowModal(true);
          setShowModal(false);
          CategoryData();
        } else {
          setFeedback({
            modalHeading: "Error",
            feedbackModalHeading: "Category Deletion Failed",
            feedbackMessage: "Failed to delete the category. Please try again.",
            success: false,
          });
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        setFeedback({
          modalHeading: "Error",
          feedbackModalHeading: "Error",
          feedbackMessage: "Something went wrong. Please try again.",
          success: false,
        });
        setShowModal(true);
      }).finally(  CategoryData());

    
  };

  const handleSeriesAddEdit = async (e) => {
    e.preventDefault();
    try {
      document.querySelector(".loaderBox").classList.remove("d-none");
      await addcategory(currentFaq);
      setShowModal(false);
      setCurrentFaq({ title: "", parts_count: "" });
      document.querySelector(".loaderBox").classList.add("d-none");
      setEdit(false)
      setFeedback({
        modalHeading: "Success",
        feedbackModalHeading: edit ? "Category Updated" : "Category Added",
        feedbackMessage: edit
          ? "The category has been updated successfully."
          : "A new category has been added successfully.",
        success: true,
      });

      
      CategoryData();
    } catch (error) {
      console.error("Error adding/updating category:", error);
      setFeedback({
        modalHeading: "Error",
        feedbackModalHeading: edit ? "Update Failed" : "Addition Failed",
        feedbackMessage: "An error occurred. Please try again.",
        success: false,
      });
      setShowModal(true);
    }
    document.querySelector(".loaderBox").classList.add("d-none");
  };

  const handleEdit = (item) => {
    setFeedback({
      modalHeading: "Update Category",
      feedbackModalHeading: "Category Updated successfully",
      btnText: "Update",
      feedbackMessage: "",
    });
    console.log('ddddddd',item);
    
    setCurrentFaq(item,);
    setEdit(true);
  };

  const filehandleChange = (event, name) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file;
      setCurrentFaq((prevData) => ({
        ...prevData,
        [name]: fileName
      }));
    }
  };
console.log('aaaaaaa',data);

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h1 className="mainTitle text-uppercase">
                      Category Management
                    </h1>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="addUser">
                      <CustomButton
                        text="Add New Category"
                        variant="primaryButton"
                        onClick={() => {
                          setFeedback({
                            modalHeading: "Add New Category",
                            feedbackModalHeading: "Category added successfully",
                            btnText: "Add",
                            feedbackMessage: "",
                          });
                          setCurrentFaq({});
                          setEdit(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashCard">
            <CategoryCard
              data={data.data}
              hanldeRoute={hanldeRoute}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
        <CustomModal
          show={edit}
          close={() => setEdit(false)}
          heading={feedback.modalHeading}
        >
          <div className="col-md-12 mb-4 text-capitalize">
            <CustomInput
              label="Title"
              required
              id="question"
              type="text"
              placeholder="Enter title"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="title"
              value={currentFaq.title}
              onChange={(e) =>
                setCurrentFaq({ ...currentFaq, title: e.target.value })
              }
            />
          </div>
          <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Image"
                          required
                          id="Image"
                          type="file"
                          placeholder="Image"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="image"
                          
                          onChange={(e) => filehandleChange(e, "image")}
                        />
                      </div>

          <CustomButton
            variant="primaryButton"
            text={'Submit'}
            className="me-2"
            type="submit"
            onClick={handleSeriesAddEdit}
          />
        </CustomModal>
        {/* <CustomModal
          show={showModal}
          close={() => setShowModal(false)}
          success={feedback.success}
          heading={feedback.feedbackMessage}
        >
        </CustomModal> */}
      </DashboardLayout>
    </>
  );
};

export default CategoryManagement;
