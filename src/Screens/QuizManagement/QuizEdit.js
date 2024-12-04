import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import { Getbookslist, Addquestions } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
export const QuizEdit = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [inputValue, setInputValue] = useState("");
  const [questionType, setQuestionType] = useState("1");

  const [formData, setFormData] = useState({});

  console.log("formData", formData);
  const base_url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const hanldeRoute = () => {
    navigate("/add-product");
  };
  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;

  useEffect(() => {
    // document.title = "Certifires | Edit Quiz";
    document.title = "Julieanna Admin | Edit Quiz";
    // UserData()
  }, []);

  const maleHeaders = [
    {
      key: 1,
      title: "ID",
    },

    {
      key: 2,
      title: "Category Name",
    },

    {
      key: 3,
      title: "Status",
    },
    {
      key: 4,
      title: "Total Question",
    },
    {
      key: 5,
      title: "Opration",
    },
  ];

  const initialCategories = [
    { id: 1, name: "Engine" },
    { id: 2, name: "Brakes" },
    { id: 3, name: "Lights" },
    { id: 4, name: "Tires" },
  ];
  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
  };

  const [books, setBooklists] = useState([]);

  const booklist = async () => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const response = await Getbookslist();
      console.log("response", response);

      document.querySelector(".loaderBox").classList.add("d-none");
      setBooklists(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  console.log("books", books);
  useEffect(() => {
    booklist();
  }, []);

  const { id } = useParams();

  const quizdetail = () => {
    const LogoutData = localStorage.getItem("login");
    console.log("LogoutData", LogoutData);
    document.title = "Julieanna | Book Detail";
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}api/questions/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(data);

        setFormData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  useEffect(() => {
    quizdetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    document.querySelector(".loaderBox").classList.remove("d-none");
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request

    try {
      const response = await Addquestions(formDataMethod);

      if (response?.status == true) {
        navigate("/quiz-management");
      } else {
      }
    } catch (error) {
      console.error("Error in adding model post:", error);
    }
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
                      <h2 className="mainTitle">Edit Question</h2>
                    </div>
                    {/* <div className="col-md-6 mb-2">
                                <div className="addUser">
                                    <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                                </div>
                            </div> */}
                  </div>
                  <div class="row align-items-center"></div>
                  <div className="row mb-3">
                    <div class="col-md-6 col-sm-12 ">
                      <SelectBox
                        selectClass="mainInput"
                        name="book_id"
                        labelClass="mainLabel"
                        label="Select Book"
                        required
                        //  option={books?.title}
                        option={books?.map((book) => ({
                          id: book.id,
                          name: book.title,
                        }))}
                        value={formData?.book_id}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <CustomInput
                        label="Question"
                        required
                        id="userEmail"
                        name="question"
                        type="text"
                        placeholder="Enter Question"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        value={formData?.question}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <label className="mainLabel">Options</label>
                  <div className="row mb-3 mt-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className={`col-md-6 col-sm-12 ${
                          questionType === "2" && index > 1 ? "hidden" : ""
                        }`}
                      >
                        <div className="d-flex gap-3 ">
                          <label className="mainLabel mr-2">
                            {String.fromCharCode(65 + index)}
                          </label>

                          <CustomInput
                            id={`userEmail${index}`}
                            type="text"
                            inputClass="mainInput"
                            name={`option_${String.fromCharCode(97 + index)}`}
                            value={
                              formData[
                                `option_${String.fromCharCode(97 + index)}`
                              ] || ""
                            }
                            // name={String.fromCharCode(`opction_${index}`)}
                            onChange={handleChange}
                          />
                          {/* <input name="correct_option"
                                                        type="radio" onChange={handleChange} /> */}
                          <input
                            name="correct_option"
                            type="radio"
                            value={String.fromCharCode(97 + index)}
                            checked={
                              formData.correct_option ===
                              String.fromCharCode(97 + index)
                            }
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <CustomButton
                    variant="primaryButton"
                    text="Edit"
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
            action={inActive}
            heading="Are you sure you want to mark this user as inactive?"
          />
          <CustomModal
            show={showModal2}
            close={() => {
              setShowModal2(false);
            }}
            success
            heading="Marked as Inactive"
          />
          <CustomModal
            show={showModal3}
            close={() => {
              setShowModal3(false);
            }}
            action={ActiveMale}
            heading="Are you sure you want to mark this user as Active?"
          />
          <CustomModal
            show={showModal4}
            close={() => {
              setShowModal4(false);
            }}
            success
            heading="Marked as Active"
          />
        </div>
      </DashboardLayout>
    </>
  );
};
