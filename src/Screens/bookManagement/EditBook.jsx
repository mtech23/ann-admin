import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { Addbook, Editbook, GetBookdetail } from "../../api";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import AddBook from "./AddBook";
import { getEntity } from "../../utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
export const EditBook = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cover: "",
  });
  const [categories, setCategories] = useState([]);
 

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

  const bookdetail = async () => {
    try {
      const response = await GetBookdetail(id);
      setFormData(response?.book);
    } catch (error) {
      console.error("Error in logging in:", error);
    }
  };

  const getCategory = async () => {
    const resp = await getEntity("category");
    const formattedCategoriesData = resp.data.map((item) => ({
      key: item.id,
      name: item.title,
    }));
    setCategories(formattedCategoriesData);
  };

  useEffect(() => {
    getCategory();
    bookdetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formData", formData);

    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }
    // formDataMethod.delete("category");

    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const response = await Addbook(formDataMethod);
      console.log("resposne ", response);

      if (response?.status === true) {
        navigate("/book-management");
      } else {
        console.error("Failed to update book:", response);
      }
    } catch (error) {
      console.error("Error in updating book:", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  useEffect(() => {
    document.title = "Ann | Edit Book";
  }, []);

  console.log("frodataaaa", formData);
  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value
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
                Edit Book
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
                      {/* <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          label="Select Book Type"
                          placeholder="Select Book Type"
                          
                          name="type"
                          value={formData.type}
                          option={Booktype}
                          onChange={handleChange}
                        />
                      </div> */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Audiobook Duration"
                          
                          id="schedule_interview"
                          type="number"
                          placeholder="Enter Audiobook Duration"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="audiobook_duration"
                          value={formData.audiobook_duration}
                          onChange={handleChange}
                        />
                      </div> */}
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="CategoryId"
                          label="Select Book Category"
                          placeholder="Select Book Category"
                          
                          value={formData.CategoryId}
                          option={categories}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="E-Book Price"
                          
                          id="info"
                          type="number"
                          placeholder="EBook Price"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="eBookprice"
                          value={formData.eBookprice}
                          onChange={handleChange}
                        />
                      </div> */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Audio Book Price"
                          
                          id="info"
                          type="number"
                          placeholder="AudioBook Price"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="audioBookprice"
                          value={formData.audioBookprice}
                          onChange={handleChange}
                        />
                      </div> */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Trailer"
                          
                          id="info"
                          type="number"
                          placeholder="Trailer"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="trailer"
                          value={formData.trailer}
                          onChange={handleChange}
                        />
                      </div> */}
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Video Trailer"
                          
                          id="resume"
                          type="file"
                          placeholder="video trailer"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="video_trailer"
                          accept=".mp4,.mp3"
                          onChange={(e) => filehandleChange(e, "video_trailer")}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Book Cover"
                          
                          id="resume"
                          type="file"
                          placeholder="Book Cover"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="cover"
                          onChange={(e) => filehandleChange(e, "cover")}
                        />
                      </div>
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Upload Book"
                          
                          id="resume"
                          type="file"
                          placeholder="Book File"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="book"
                          onChange={(e) => filehandleChange(e, "book")}
                        />
                      </div> */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Book Language"
                          
                          id="info"
                          type="text"
                          placeholder="Enter Book Language"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="lang"
                          value={formData.lang}
                          onChange={handleChange}
                        />
                      </div> */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Amazon Link"
                          
                          id="amazon_link"
                          type="url"
                          placeholder="Enter Amazon Link"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="amazon_link"
                          value={formData.amazon_link}
                          onChange={handleChange}
                        />
                      </div>{" "} */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Kdp Link"
                          
                          id="kdp_link"
                          type="url"
                          placeholder="Enter Kdp Link"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="kdp_link"
                          value={formData.kdp_link}
                          onChange={handleChange}
                        />
                      </div>{" "} */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Hardcover Link"
                          
                          id="hardcover_link"
                          type="url"
                          placeholder="Enter Hardcover Link"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="hardcover_link"
                          value={formData.hardcover_link}
                          onChange={handleChange}
                        />
                      </div>{" "} */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Paperback Link"
                          
                          id="paperback_linkk"
                          type="url"
                          placeholder="Paperback Link"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="paperback_link"
                          value={formData.paperback_link}
                          onChange={handleChange}
                        />
                      </div> */}
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
          close={() => {
            setShowModal(false);
          }}
          success
          heading="Book added Successfully."
        />
      </DashboardLayout>
    </>
  );
};
