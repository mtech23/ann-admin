import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,

} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";
import { GetbooksDelete, } from "../../api";

import "./style.css";
import BackButton from "../../Components/BackButton";
import { getEntity } from "../../utils";

export const UserQuery = () => {
  const { id } = useParams();
  console.log("dddddd", id);

  const [data, setData] = useState([]);
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
      const response = await getEntity('query');
      console.log('aaaaaaaaaaa', response);

      document.querySelector(".loaderBox").classList.add("d-none");
      setBooklists(response?.data || []);
      setData(response?.data || []);
    } catch (error) {
      console.error("Error in fetching books:", error);
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
    item?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    document.title = "Ann | Query";
  }, []);

  const maleHeaders = [
    { key: "id", title: "Id" },
    { key: "Cover", title: "Name" },
    { key: "Title", title: "Email" },
    { key: "category", title: "Subject" },

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
                      <h2 className="mainTitle">{"Query Management"}</h2>
                    )}
                  </div>

                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td className="text-capitalize">{item?.name}</td>
                            <td>{item?.email || "N/A"}</td>
                            <td>{item?.subject || "N/A"}</td>

                            <td>
                              <Link
                                to={`/query-management/query-detail/${item?.id}`}
                                className=""
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="tableActionIcon"
                                />
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>

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
