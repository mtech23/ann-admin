import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheck,
  faTimes,
  faFilter,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export const NoteDateil = () => {
  const { id } = useParams();

  const base_url = process.env.REACT_APP_API_URL;

  const [data, setData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false);

  console.log("datadetil", data);
  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const notedetail = () => {
    const LogoutData = localStorage.getItem("login");
    console.log("LogoutData", LogoutData);
    document.title = "Julieanna Admin | Note Detail";
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}api/story-view/${id}`, {
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

        setData(data.data[0]);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  const navigate = useNavigate();
  useEffect(() => {
    notedetail();
  }, [id]);
  const EditQuiz = (id) => {
    navigate(`/quiz-management/edit-quiz/${id}`);
  };
  const DeleteQuiz = (catId) => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}api/questions/${catId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector(".loaderBox").classList.add("d-none");
        notedetail();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  console.log("datasssss", data);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Story Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row">
                <div className=" col-md-6">
                  <p className="secondaryText"> Content</p>
                  <p>{data?.content}</p>
                </div>

                <div className=" col-md-6">
                  <p className="secondaryText"> likes</p>
                  <p>{data?.likes_count}</p>
                </div>
                <div className=" col-md-6">
                  <p className="secondaryText"> comments</p>
                  <div className="d-flex flex-column gap-2">
                    {data.story_comment?.length > 0
                      ? data.story_comment.map((item) => (
                          <div className="d-flex flex-column justify-content-start align-items-start w-100 gap-2 text-secondary bg-light p-2 rounded">
                            <div className="d-flex justify-content-start gap-3 align-items-center">
                              <img
                                src={`${process.env.REACT_APP_BASE_URL}/${item.user.image}`}
                                class="rounded-circle "
                                style={{ width: "40px", height: "40px" }}
                                alt="Avatar"
                              />
                              <h6 className="h6 text-dark fw-bold m-auto">
                                {item.user.name}
                              </h6>
                            </div>
                            <div>{item.content}</div>
                          </div>
                        ))
                      : "no comments"}
                  </div>
                </div>
              </div>
            </div>
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
      </DashboardLayout>
    </>
  );
};
