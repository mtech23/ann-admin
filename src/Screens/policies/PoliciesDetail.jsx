import { useState, useEffect } from "react";
import CustomModal from "../../Components/CustomModal";


export const PoliciesDetails = (props) => {
  const { data } = props;


  const [showModal, setShowModal] = useState(false);
  const [pageModal, setpageModal] = useState(false);


  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);


  const [pagesdetail, setPagesdetail] = useState();
  const [formData, setFormData] = useState({});


  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };



  useEffect(() => {
    document.title = "Ann | Policy Detail";
  }, []);

  return (
    <>
      {/* <DashboardLayout> */}
      <div className=" mb-4">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <h2 className="mainTitle">
              Privacy Policy Details
            </h2>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <div className="row">
              <div className="col-md-11 mb-4">
                <p className="secondaryText">Title</p>
                <p>{data.title}</p>
              </div>


              <div className="col-md-12 mb-4">
                <p className="secondaryText">Description</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.content,
                  }}
                ></p>
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



      <CustomModal
        show={pageModal}
        close={() => {
          setpageModal(false);
        }}
        heading="Page Content"
      >
        <div className="col-md-6 mb-4">
          <p className="secondaryText"> Content </p>
          <p>{pagesdetail?.content}</p>
        </div>

      </CustomModal>

      <CustomModal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        success
        heading="Chapter Added Successfully."
      />
    </>
  );
};
