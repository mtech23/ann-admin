import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faEdit,
  faTrash,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";
import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { Getbookslist, GetbooksDelete, Editbook, handlePin } from "../../api";

import "./style.css";
import BackButton from "../../Components/BackButton";

export const FeatureBooks = () => {
  const { id } = useParams();
  const url = `${process.env.REACT_APP_BASE_URL}`;

  const [data, setData] = useState([]);
  const [totalItems, settotalItems] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [dropdown, setdropdown] = useState(0);

  const [books, setBooklists] = useState([]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    booklist(null, pageNumber);
  };

  const navigate = useNavigate();
  const hanldeRoute = () => {
    navigate("/plan-management/Create-plan");
  };

  const booklist = async (search, page) => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      await fetch(`${url}featureBanner`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {

          setData(result?.data || []);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          document.querySelector(".loaderBox").classList.add("d-none");
        });

      // settotalItems(response.totalBooks);
      // setCurrentPage(response.currentPage);
      // setBooklists(response?.data || []);
      // setData(response?.data || []);
    } catch (error) {
      console.error("Error in fetching books:", error);
    }
  };

  const plandelete = async (id) => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      await fetch(`${url}featureplan?id=${id}`, {
        method: "Delete",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {

          setData(result?.data || []);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          document.querySelector(".loaderBox").classList.add("d-none");
        });
      booklist();
    } catch (error) {
      console.error("Error in deleting book:", error);
    }
  };

  useEffect(() => {
    if (inputValue) {
      booklist(inputValue);
    } else if (inputValue == "") {
      booklist(null);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filteredBooks = books
    ?.filter((book) => {
      if (typeof id === "string") {
        return book.category.title === id;
      }
      return true;
    })
    .sort((a, b) => b.pin - a.pin);

  const filterData = filteredBooks?.filter((item) =>
    item?.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    document.title = "Ann | Feature books";
  }, []);

  const maleHeaders = [
    { key: "id", title: "S.No" },
    { key: "Image", title: "Image" },
    { key: "BookName", title: "Book name" },
    { key: "AuthorName", title: "Author name" },
    { key: "PlanId", title: "plan Id" },
    { key: "startDate", title: "Start Date" },
    { key: "EndDate", title: "End Date" },
    { key: "transactionId", title: "transactionId" },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    {id ? (
                      <div className="col-12 mb-2">
                        <h2 className="mainTitle">
                          <BackButton />
                          {id}
                        </h2>
                      </div>
                    ) : (
                      <h2 className="mainTitle">Feature Books</h2>
                    )}
                  </div>
                
                </div>
                <div className="row mb-3">
                  <div className="col-12 ">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td><img src={`https://custom3.mystagingserver.site/ann-api/${item?.Book?.cover}`} class="avatarIcon  rounded-3 ml-5" width="10px" height="10px" /></td>
                            <td className="text-capitalize">{item?.Book?.title}</td>
                            <td className="text-capitalize">{item?.User?.username}</td>
                            <td >{item?.planId}</td>
                            <td >
                              {item?.start_date}
                            </td>
                            <td>{item?.end_date}</td>
                            <td>{item?.transactionId}</td>

                            {/* <td>
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
                                    to={`/plan-management/plan-details/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <Link
                                    to={`/plan-management/edit-plan/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="tableActionIcon"
                                    />
                                    Edit
                                  </Link>
                                  <Link
                                    onClick={() => {
                                      plandelete(item?.id);
                                    }}
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
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    {!inputValue && (
                      <CustomPagination
                        showing={data.length}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                      />
                    )}
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
            action={() => {
              setShowModal2(true);
            }}
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
            action={() => {
              setShowModal4(true);
            }}
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
