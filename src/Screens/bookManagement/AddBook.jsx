import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { Addbook } from "../../api";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router";
import { getEntity } from "../../utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const AddBook = () => {
  const navigate = useNavigate();
  const [modalText, setmodalText] = useState("");
  const [success, setsuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cover: ""
  });
  const [BookCategories, setBookCategories] = useState();

  const getCategory = async (first) => {
    try {
      const respo = await getEntity("categories");
      const myCategories = respo.data.map((item) => ({
        id: item.id,
        name: item.title
      }));
      setBookCategories(myCategories);
      console.log("respo", myCategories);
    } catch (error) {}
  };
  const Booktype = [
    {
      key: "0",
      name: "eBook"
    },
    {
      key: "1",
      name: "AudioBook"
    },
    {
      key: "2",
      name: "Both"
    }
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == "availability") {
      const val =
        value == "out of stock" ? false : value == "available" ? true : "";
      setFormData((prevData) => ({
        ...prevData,
        [name]: val
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const filehandleChange = (event, name) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file;
      setFormData((prevData) => ({
        ...prevData,
        [name]: fileName
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formData", formData);

    document.querySelector(".loaderBox").classList.remove("d-none");
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    try {
      const response = await Addbook(formDataMethod);

      if (response?.status === true) {
        setsuccess(true);
        setmodalText(response.message);
        setShowModal(true);
      } else {
        setsuccess(false);
        setmodalText(response.message);
        setShowModal(true);
        console.error("Failed to add book:", response);
      }
    } catch (error) {
      setsuccess(false);

      setmodalText(error.message);
      setShowModal(true);
      console.error("Error in adding book:", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
      setTimeout(() => {
        navigate("/book-management");
      }, 1000);
    }
  };
  console.log("formdata", formData);
  useEffect(() => {
    getCategory();
  }, []);
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
                Add New Book
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
                          required
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
                      {/* <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          label="Select Book Type"
                          placeholder="Select Book Type"
                          required
                          name="type"
                          value={formData.type}
                          option={Booktype}
                          onChange={handleChange}
                        />
                      </div> */}
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Audiobook Duration"
                          required
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
                          name="book_category_id"
                          label="Select Book Category"
                          placeholder="Select Book Category"
                          required
                          value={formData.book_category_id}
                          option={BookCategories}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="E-Book Price"
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
          success={success}
          heading={modalText}
        />
      </DashboardLayout>
    </>
  );
};

export default AddBook;
