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

export const BookManagement = () => {
  const { id } = useParams();
  console.log("dddddd", id);

  const [data, setData] = useState([]);
  const [totalItems, settotalItems] = useState()
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
    console.log('sssssss', pageNumber);

    setCurrentPage(pageNumber);
    booklist(null, pageNumber);
  };

  const navigate = useNavigate();
  const hanldeRoute = () => {
    navigate("/book-management/add-book");
  };

  const booklist = async (search, page) => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const response = await Getbookslist(search, page);
      console.log('aaaaaaaaaaa', response);

      document.querySelector(".loaderBox").classList.add("d-none");
      settotalItems(response.totalBooks)
      setCurrentPage(response.currentPage)
      setBooklists(response?.data || []);
      setData(response?.data || []);
    } catch (error) {
      console.error("Error in fetching books:", error);
    }
  };

  const bookdelete = async (id) => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const response = await GetbooksDelete(id);

      document.querySelector(".loaderBox").classList.add("d-none");
      booklist();

    } catch (error) {
      console.error("Error in deleting book:", error);
    }
  };

  useEffect(() => {
    if (inputValue) {
      booklist(inputValue);
    }
    else if (inputValue == '') {
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
    document.title = "Ann | Book Management";
  }, []);

  const maleHeaders = [
    { key: "id", title: "S.No" },
    { key: "Cover", title: "Cover" },
    { key: "Title", title: "Title" },
    { key: "category", title: "category" },

    { key: "action", title: "Action" },
  ];


  console.log("filterData", currentItems);
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
                      <h2 className="mainTitle">{"Book Management"}</h2>
                    )}
                  </div>
                  {!id && (
                    <div className="col-md-6 mb-2">
                      <div className="addUser">
                        <CustomButton
                          text="Add New Book"
                          variant="primaryButton"
                          onClick={hanldeRoute}
                        />
                        <CustomInput
                          type="text"
                          placeholder="Search Here..."
                          value={inputValue}
                          inputClass="mainInput"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td><img src={`https://custom3.mystagingserver.site/ann-api/${item.cover}`} class="avatarIcon  rounded-3 ml-5" width="10px" height="10px" /></td>
                            <td className="text-capitalize">{item?.title}</td>
                            <td>{item?.category?.title || "N/A"}</td>

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
                                    to={`/book-management/book-details/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <Link
                                    to={`/book-management/edit-book/${item?.id}`}
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
                                      bookdelete(item?.id);
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    {!inputValue && <CustomPagination
                      showing={data.length}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />}
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
