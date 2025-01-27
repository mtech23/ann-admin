import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import {
  GetBookdetail,
  Getchaptersdetailbyid,
  Addchapter,
  addPages
} from "../../api";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { SelectBox } from "../../Components/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomInput from "../../Components/CustomInput";

import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

// Getchaptersdetailbyidbyid

export const BookDetails = () => {
  const Bookstatus = [
    {
      key: "0",
      name: "free"
    },
    {
      key: "1",
      name: "paid"
    }
  ];
  const { id } = useParams();
  const [chapterdata, setChapterData] = useState([]);
  const base_url = process.env.REACT_APP_BASE_URL;
  const [Bookdetail, setBookdetail] = useState({});
  const [chapterdetailbyid, setChapterdetailbyid] = useState({});

  const [isChapter, setIsChapter] = useState(false);

  const [showModalchapter, setShowModalChapter] = useState(false);
  const [showeditchapter, setEditChapter] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [pageModal, setpageModal] = useState(false);

  const [addpageModal, setaddpageModal] = useState(false);

  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false);

  const [chapterpageid, setchapterpageid] = useState();
  const [chapterpageidpage, setchapterpageidpage] = useState();

  const [addpage, setAddpage] = useState(false);

  const [pagesadd, setPagesadd] = useState({});

  const [pagealreadyexist, setpagealreadyexist] = useState("");

  const [formData, setFormData] = useState({
    bookId: id
  });

  const [data, setData] = useState({});

  const inActive = () => {
    // setShowModal(false)
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const bookdetail = async () => {
    try {
      const response = await GetBookdetail(id);

      setBookdetail(response?.book);
    } catch (error) {
      console.error("Error in logging in:", error);
    }
  };

 



  useEffect(() => {
    bookdetail();
  }, [id]);
  const [shapterstatus, setChapterstatus] = useState();
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name == "status") {
      setChapterstatus(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlechapterfile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file;
      setFormData((prevData) => ({
        ...prevData,
        audio_file: fileName
      }));
    }
  };

  const handlepageChange = (event) => {
    const { name, value } = event.target;

    setPagesadd((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const chapterData = async () => {
    document.title = "Ann | Book Chapters Detail";
    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const response = await Getchaptersdetailbyid(id); // Make sure bookid is passed correctly
      document.querySelector(".loaderBox").classList.add("d-none");

      setChapterData(response?.data);
      setFormData(response?.data);
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };



  const [Viewpage, setViewpage] = useState(false);


  const handleSubmitchapter = async (e) => {
    e.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");

    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    try {
      const response = await Addchapter(formDataMethod);
      document.querySelector(".loaderBox").classList.remove("d-none");

      if (response?.success) {
        setShowModalChapter(true);
        chapterData();
        setEditModal(false);
        setIsChapter(!isChapter);
        setpagealreadyexist(" ");
      } else if (!response?.success) {
        document.querySelector(".loaderBox").classList.add("d-none");
        setpagealreadyexist(response?.message);
      } else {
        setpagealreadyexist(" ");
      }

      bookdetail()
    } catch (error) {
      console.error("Error in adding model post:", error);
    }
  };

  const handlepageadd = async (e) => {
    e.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");

    const formDataMethod = new FormData();
    for (const key in pagesadd) {
      formDataMethod.append(key, pagesadd[key]);
    }

    formDataMethod.append("chapter_id", chapterpageid);

    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const response = await addPages(formDataMethod);
      document.querySelector(".loaderBox").classList.remove("d-none");

      if (response?.status == true) {
        document.querySelector(".loaderBox").classList.add("d-none");
        setAddpage(false);
        chapterData();
        setpagealreadyexist();
        setPagesadd(" ");
      } else if (response?.status == false) {
        document.querySelector(".loaderBox").classList.add("d-none");
        setpagealreadyexist(response?.message);
      } else {
        setpagealreadyexist(" ");
      }
    } catch (error) {
      console.error("Error in adding model post:", error);
      setpagealreadyexist(" ");
    }
  };

  const [Editpage, setEditpage] = useState(false);

  const handlepageedit = async (e) => {
    e.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");

    const formDataMethod = new FormData();
    for (const key in pagesadd) {
      formDataMethod.append(key, pagesadd[key]);
    }

    formDataMethod.append("chapter_id", chapterpageid);

    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const response = await addPages(formDataMethod);
      document.querySelector(".loaderBox").classList.remove("d-none");

      if (response?.status == true) {
        document.querySelector(".loaderBox").classList.add("d-none");
        setEditpage(false);
        chapterData();
        setpagealreadyexist(" ");
        setPagesadd("");
      } else if (response?.status == false) {
        document.querySelector(".loaderBox").classList.add("d-none");
        setpagealreadyexist(response?.message);
      } else {
      }
    } catch (error) {
      console.error("Error in adding model post:", error);
    }
  };

  const handlechapterEdit = async (e) => {
    e.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");

    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }

    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request

    try {
      const response = await Addchapter(formDataMethod);
      document.querySelector(".loaderBox").classList.remove("d-none");

      if (response?.status == true) {
        document.querySelector(".loaderBox").classList.add("d-none");
        setEditModal(false);

        chapterData();
        setEditChapter(true);
        setpagealreadyexist(" ");
      } else if (response?.status == false) {
        document.querySelector(".loaderBox").classList.add("d-none");
        setpagealreadyexist(response?.message);
        document.querySelector(".loaderBox").classList.remove("d-none");
      } else {
      }
    } catch (error) {
      console.error("Error in adding model post:", error);
    }
  };

  useEffect(() => {
    chapterData();
  }, [id]);
  const filehandleChange = (event, name) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file;
      setFormData((prevData) => ({
        ...prevData,
        pdf: fileName
      }));
    }
  };
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Book Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="productImage">
                  <p className="secondaryText">Book Cover</p>
                    <img src={'https://custom3.mystagingserver.site/ann-api' + Bookdetail?.cover} />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productImage">
                  <p className="secondaryText">Video</p>
                    {Bookdetail?.video? (
                      <div className="productVideo mt-3">
                        <video
                          controls
                          style={{ width: '100%' }}
                        >
                          <source
                            src={'https://custom3.mystagingserver.site/ann-api' + Bookdetail?.video}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ): <span>
                      Video Not Available 
                    </span> }
                  </div>
                </div>


                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Title</p>
                  <p>{Bookdetail?.title}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Category</p>
                  <p>{Bookdetail?.category?.title}</p>
                </div>



                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Rating</p>
                  <p>
                    {Bookdetail?.averageRating}
                  </p>
                </div>

                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Reviews</p>
                  <p>
                    {Bookdetail?.totalReviews}
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Description</p>
                  <p dangerouslySetInnerHTML={{ __html: Bookdetail.description }}></p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between">
                    <h2 className="mainTitle mb-4">Book Chapter</h2>
                    <div className="addChapter">
                      <CustomButton
                        text="Add Chapter"
                        variant="primaryButton"
                        onClick={() => {
                          setIsChapter(!isChapter);
                        }}
                      ></CustomButton>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey={"index"}>
                      <Accordion.Header>{`Chapter`}</Accordion.Header>
                      <Accordion.Body>
                        <div className="chapeditz d-flex">
                          {Bookdetail?.chapter?.pdf ? (
                            <>
                              {/* Display PDF Link */}
                              <a
                                href={'https://custom3.mystagingserver.site/ann-api' + Bookdetail.chapter.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary me-3"
                              >
                                View PDF
                              </a>

                              {/* Download PDF Button */}
                              <a
                                href={'https://custom3.mystagingserver.site/ann-api' + Bookdetail.chapter.pdf}
                                download
                                className="btn btn-secondary"
                              >
                                Download PDF
                              </a>
                            </>
                          ) : (
                            <p>No chapter PDF available.</p>
                          )}
                        </div>







                        {/* <p> {item?.pages}</p> */}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                {isChapter && (
                  <div className="col-md-12 my-5 bg-light">
                    <div className="chapterAdditionForom">
                      <div className="titleBox mb-4">
                        <h3 className="mainTitle">Add New Chapter</h3>
                      </div>
                      <div className="ChapterForm col-md-6 mb-4">
                        <CustomInput
                          label="Chapter pdf"
                          required
                          id="pdf"
                          type="file"
                          accept=".pdf"
                          placeholder="Enter Chapter pdf"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="pdf"
                          // value={formData?.pdf}
                          onChange={filehandleChange}
                        />
                      </div>



                      <div className="addNewChapter">
                        <CustomButton
                          text="Add  "
                          variant="primaryButton"
                          onClick={handleSubmitchapter}
                        ></CustomButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <CustomModal
          // show={showModal}
          close={() => {
            // setShowModal(false);
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
          action={Active}
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

        <CustomModal
          show={editModal}
          close={() => {
            setEditModal(false);
          }}
          heading="Edit Chapter"
        >
          <CustomInput
            label="Chapter No"
            required
            id="title"
            type="number"
            placeholder="Enter Chapter Title"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="chapter_number"
            value={formData?.chapter_number}
            onChange={handleChange}
          />
          <p className="pagecss">{pagealreadyexist}</p>
          <CustomInput
            label="Chapter Title"
            required
            id="title"
            type="text"
            placeholder="Enter Chapter Title"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="title"
            value={formData?.title}
            onChange={handleChange}
          />

          {Bookdetail?.type == "eBook" ? (
            " "
          ) : (
            <div className="ChapterForm col-md-6 mb-4">
              <CustomInput
                label="Chapter Audio"
                required
                id="audio_file"
                type="file"
                placeholder="Upload Chapter Audio"
                labelClass="mainLabel"
                inputClass="mainInput"
                name="audio_file"
                accept=".mp4,.mp3"
                onChange={handlechapterfile}
              />
            </div>
          )}



          {formData?.status === "paid" && (
            <CustomInput
              label="Chapter price"
              required
              id="title"
              type="text"
              placeholder="Enter Chapter price"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="price"
              value={formData?.price}
              onChange={handleChange}
            />
          )}

          <CustomButton
            variant="primaryButton"
            text="Edit"
            type="button"
            onClick={handlechapterEdit}
          />
        </CustomModal>

        <CustomModal
          show={addpage}
          close={() => {
            setAddpage(false);
          }}
          heading="Add Page"
        >
          <CustomInput
            label="  Page Number"
            required
            id="title"
            type="number"
            placeholder="Enter Page Number"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="page_number"
            value={addpage?.page_number}
            onChange={handlepageChange}
          />
          <p className="pagecss">{pagealreadyexist}</p>
          {/* <CustomInput
            label="Page Audio"
            required
            id="audio_file"
            type="file"
            placeholder="Upload Chapter Audio"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="audio_file"
            accept=".mp4,.mp3"
            onChange={handlepageChange}
          /> */}

          <div className="inputWrapper">
            <div className="form-controls">
              <label htmlFor="">Content</label>
              <textarea
                name="content"
                className="form-control shadow border-0"
                id="description"
                cols="30"
                rows="10"
                value={addpage?.content}
                onChange={handlepageChange}
              ></textarea>
            </div>
          </div>

          <CustomButton
            variant="primaryButton"
            text="Add"
            type="button"
            onClick={handlepageadd}
          />
        </CustomModal>

        <CustomModal
          show={Editpage}
          close={() => {
            setEditpage(false);
          }}
          heading="Edit Page"
        >
          <CustomInput
            label="  Page Number"
            required
            id="title"
            type="number"
            placeholder="Enter Page Number"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="page_number"
            value={pagesadd?.page_number}
            onChange={handlepageChange}
          />
          <p className="pagecss">{pagealreadyexist}</p>
          {/* <CustomInput
            label="Page Audio"
            required
            id="audio_file"
            type="file"
            placeholder="Upload Chapter Audio"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="audio_file"
            accept=".mp4,.mp3"
            onChange={handlechapterfile}
          /> */}

          <div className="inputWrapper">
            <div className="form-controls">
              <label htmlFor="">Content</label>
              <textarea
                name="content"
                className="form-control shadow border-0"
                id="description"
                cols="30"
                rows="10"
                value={pagesadd?.content}
                onChange={handlepageChange}
              ></textarea>
            </div>
          </div>

          <CustomButton
            variant="primaryButton"
            text="Edit"
            type="button"
            onClick={handlepageedit}
          />
        </CustomModal>

        <CustomModal
          show={Viewpage}
          close={() => {
            setViewpage(false);
          }}
          heading="Page Detail"
        >
          <div className="col-md-6 mb-4">
            <p className="secondaryText">Page No</p>
            <p>{pagesadd?.page_number}</p>
          </div>
          <div className="col-md-12 mb-4">
            <p className="secondaryText">Content </p>
            <p>{pagesadd?.content}</p>
          </div>
        </CustomModal>

        <CustomModal
          show={showModalchapter}
          close={() => {
            setShowModalChapter(false);
          }}
          success
          heading="Chapter Added Successfully."
        />
        <CustomModal
          show={showeditchapter}
          close={() => {
            setEditChapter(false);
          }}
          success
          heading="Chapter Edit Successfully."
        />
      </DashboardLayout>
    </>
  );
};
