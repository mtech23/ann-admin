import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";
import {
  Getbookslist,
  GetUserlist,
  suspendUser,
} from "../../api";

import "./style.css";
import CustomButton from "../../Components/CustomButton";

export const UsersManagement = () => {
  const base_url = process.env.REACT_APP_BASE_URL;

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [books, setBooklists] = useState([]);
  const [orders, setOrderslists] = useState([]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();
  const hanldeRoute = () => {
    navigate("/orders-management/add-order");
  };

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

  const orderlist = async () => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const response = await GetUserlist();
      console.log("response", response);

      document.querySelector(".loaderBox").classList.add("d-none");
      setOrderslists(response?.user);
      setData(response?.user);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };





  useEffect(() => {
    orderlist();
  }, []);


  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    document.title = "Ann | Order Management";
  }, []);
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
  const maleHeaders = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "image",
      title: "Image",
    },
    {
      key: "name",
      title: "name",
    },
    {
      key: "Email",
      title: "Email",
    },

    {
      key: "status",
      title: "status",
    },
    {
      key: "Action",
      title: "Action",
    },
  ];

  console.log("currentItems", currentItems);

  const handleUserStatusChange = async ({ id, active }) => {
    try {
      const resp = await suspendUser(id, !active);

      console.log("response", resp);
    } catch (error) {
      console.log("error", error);
    } finally {
      orderlist();
    }
  };
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Users Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      {/* <CustomButton
                        text="Add New Order"
                        variant="primaryButton"
                        onClick={hanldeRoute}
                      /> */}
                      {/* <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {/* {currentItems?.map((item, index) => ( */}
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <td>{item?.id}</td>
                            <td>
                              {" "}
                              <img
                                src={'https://custom3.mystagingserver.site/ann-api' + item.image}
                                width={50}
                                height={50}
                                className="rounded-3"
                              />{" "}
                            </td>
                            <td>{item?.username}</td>
                            <td>{item?.email}</td>

                            <td className={item.active == 1 ? 'greenColor' : "redColor"}>{item.active == 1 ? 'Active' : "Inactive"}</td>


                            <td>
                              {item.active == 1 ? <CustomButton
                                text="Deactivate"
                                variant="primaryButton"
                                onClick={() => handleUserStatusChange(item)}
                              /> : <CustomButton
                                text="Activate"
                                variant="primaryButton"
                                onClick={() => handleUserStatusChange(item)}
                              />}
                            </td>
                            {/* <td>{item?.audiobook_duration}</td> */}
                            {/* <td className={item.status == 1 ? 'greenColor' : "redColor"}>{item.status == 1 ? 'Active' : "Inactive"}</td> */}
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      showing={currentItems.length}
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
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
