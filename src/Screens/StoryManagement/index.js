import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheck,
  faTimes,
  faFilter,
  faEdit,
  faTrash,
  faThumbtack,
  faCommenting,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import "./style.css";

export const NoteList = () => {
  const base_url = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);

  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");
  const [dropdown, setdropdown] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setmodalText] = useState("");
  const [success, setsuccess] = useState(false);

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterData = data?.filter((item) =>
    item?.title?.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  const NoteList = () => {
    const datas = process.env.REACT_APP_API_URL;
    console.log("datas", datas);
    const LogoutData = localStorage.getItem("login");

    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}api/story-list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        document.querySelector(".loaderBox").classList.add("d-none");
        setData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Ann Admin | Note Management";
    NoteList();
  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No"
    },

    {
      key: " Status",
      title: "content"
    },
    {
      key: " likes",
      title: "likes"
    },
    {
      key: " comments",
      title: "comments"
    },

    {
      key: " Actions",
      title: "Actions"
    }
  ];

  const DeleteNotes = (catId) => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}api/delete-story/${catId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("then", data);
        setsuccess(true);
        setmodalText(data.message);
        setShowModal(true);
        document.querySelector(".loaderBox").classList.add("d-none");
        NoteList();
      })
      .catch((error) => {
        setsuccess(false);
        setmodalText(error.message);
        setShowModal(true);
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log("catch", error);
      });
  };
  const hanldeRoute = () => {
    navigate("/story-management/add-story");
  };


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-4 mb-2">
                    <h2 className="mainTitle">Story Management</h2>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="addUser d-flex  mx-auto ">
                      <CustomButton
                        text="Add Story"
                        variant="primaryButton"
                        onClick={hanldeRoute}
                      />
                      {/* <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                        className=" w-auto "
                      /> */}
                    </div>
                  </div>
                </div>

                <Row className="g-4 ">
                  {data?.map((item, index) => {
                    return (
                      <Col md={4} key={index}>
                        <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '100%' }}>
                          <Card.Body>
                            <Card.Text>
                              {item?.content?.split(" ").slice(0, 20).join(" ")}
                            </Card.Text>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div>
                                {item.likes}<FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faThumbsUp} />
                              </div>
                              <div>
                                {item.comments}{" "}{" "}
                                <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faCommenting} />{" "}
                              </div>
                              <div>
                                <Dropdown
                                  className="tableDropdown"
                                  show={item.id === dropdown}
                                  onToggle={() =>
                                    setdropdown(dropdown === 0 ? item.id : 0)
                                  }
                                >
                                  <Dropdown.Toggle
                                    variant="transparent"
                                    className="notButton classicToggle"
                                  >
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu
                                    align="end"
                                    className="tableDropdownMenu"
                                  >
                                    <Link
                                      to={`/story-management/story-detail/${item?.id}`}
                                      className="tableAction"
                                    >
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        className="tableActionIcon"
                                      />
                                      View
                                    </Link>
                                    <Link
                                      to={`/story-management/edit-story/${item?.id}`}
                                      className="tableAction"
                                    >
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        className="tableActionIcon"
                                      />
                                      Edit
                                    </Link>
                                    <Link
                                      onClick={() => DeleteNotes(item.id)}
                                      className="tableAction"
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="tableActionIcon"
                                      />
                                      Delete
                                    </Link>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>


                {/* <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>
                              {item?.content?.split(" ").slice(0, 10).join(" ")}
                              ...
                            </td>

                            <td>
                              {item.likes} <FontAwesomeIcon icon={faThumbsUp} />{" "}
                            </td>
                          
                            <td>
                              {item.comments}{" "}
                              <FontAwesomeIcon icon={faCommenting} />{" "}
                            </td>
                            <td>
                              <Dropdown
                                className="tableDropdown"
                                show={item.id === dropdown}
                                onToggle={() =>
                                  setdropdown(dropdown === 0 ? item.id : 0)
                                }
                              >
                                <Dropdown.Toggle
                                  variant="transparent"
                                  className="notButton classicToggle"
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                  align="end"
                                  className="tableDropdownMenu"
                                >
                                  <Link
                                    to={`/story-management/story-detail/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <Link
                                    to={`/story-management/edit-story/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="tableActionIcon"
                                    />
                                    Edit
                                  </Link>
                                  <Link
                                    onClick={() => DeleteNotes(item.id)}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="tableActionIcon"
                                    />
                                    Delete
                                  </Link>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data?.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div> */}
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
        </div>
      </DashboardLayout>
    </>
  );
};
