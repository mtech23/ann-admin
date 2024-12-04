import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheck,
  faTimes,
  faFilter,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import {
  Getbookslist,
  GetpolicyDelete,
  Getterms,
  GettermsDelete
} from "../../api";

import { ordersManagement } from "../../Config/Data";

import "./style.css";
import { TermsAndConditionDetails } from "./TermAndConditionDetail";

export const TermsAndConditionManagement = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");
  const [reload, setReload] = useState(false);

  const [books, setBooklists] = useState([]);
  const [policies, setPolicieslists] = useState([]);
  console.log("policies", policies);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();
  const hanldeRoute = () => {
    navigate("/terms-condition-management/add-terms-condition");
  };

  const booklist = async () => {
    document.querySelector(".loaderBox")?.classList.remove("d-none");
    try {
      const response = await Getbookslist();
      console.log("response", response);

      document.querySelector(".loaderBox")?.classList.add("d-none");
      setBooklists(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  const policiesList = async () => {
    document.querySelector(".loaderBox")?.classList.remove("d-none");
    try {
      const response = await Getterms();
      console.log("terms", response);

      document.querySelector(".loaderBox")?.classList.add("d-none");
      setPolicieslists(response?.data);
      setData(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  const policydelete = async (id) => {
    document.querySelector(".loaderBox")?.classList.remove("d-none");
    try {
      const response = await GettermsDelete(id);
      console.log("response", response);

      if (response?.status == true) {
        document.querySelector(".loaderBox")?.classList.add("d-none");
        policiesList();
      }
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  const handleclick = () => {
    navigate("/profile-page");
  };
  useEffect(() => {
    booklist();
  }, []);
  useEffect(() => {
    policiesList();
  }, [reload]);
  useEffect(() => {
    policiesList();
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

  const filterData = books?.filter((item) =>
    item?.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    document.title = "Julieanna | Term & Condition Management";
  }, []);

  const policiesData = [
    {
      id: 1,
      title: "Policies",
      privacy_policy:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      terms_conditions:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
    },
    {
      id: 2,
      title: "Policies",
      privacy_policy:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      terms_conditions:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
    }
  ];

  const maleHeaders = [
    {
      key: "id",
      title: "S.No"
    },
    {
      key: "policies_title",
      title: "Title"
    },

    {
      key: "action  ",
      title: "action  "
    }
  ];

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">

                  {policies.length === 0 &&
                    <div className="col-md-12 mb-2">
                      <div className="addUser">
                        <CustomButton
                          text="Add Terms And Condition"
                          variant="primaryButton"
                          onClick={hanldeRoute}
                        />
                      </div>
                    </div>
                  }
                </div>
                {policies.length !== 0 &&
                  <TermsAndConditionDetails id={policies[0]?.id} reload={reload} setReload={setReload} />
                }
                {/* <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>

                        {policies?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{item?.title}</td>

                            <td>
                              <Dropdown className="tableDropdown">
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

                                    to={`/terms-condition-management/terms-condition-details/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <Link
                                    to={`/terms-condition-management/edit-terms-condition/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="tableActionIcon"
                                    />
                                    Edit
                                  </Link>

                                  <button
                                    type="button"
                                    className="bg-transparent border-0 ps-lg-3 pt-1"
                                    onClick={() => {
                                      policydelete(item?.id);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                    ></FontAwesomeIcon>{" "}
                                    Delete
                                  </button>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div> */}
              </div >
            </div >
          </div >

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
        </div >
      </DashboardLayout >
    </>
  );
};
