import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomModal from "../../Components/CustomModal";

import CustomButton from "../../Components/CustomButton";
import {
  Getbookslist,
  Getterms,
} from "../../api";

import "./style.css";
import { TermsAndConditionDetails } from "./TermAndConditionDetail";

export const TermsAndConditionManagement = () => {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);

  const [books, setBooklists] = useState([]);
  const [policies, setPolicieslists] = useState();
  console.log("policies", policies);


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
      setPolicieslists(response);
      setData(response);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
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

 

 

  useEffect(() => {
    document.title = "Ann | Term & Condition Management";
  }, []);

 
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">

                  {policies &&
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
                {policies &&
                  <TermsAndConditionDetails data={policies} id={policies.id} reload={reload} setReload={setReload} />
                }

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
