import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import { getEntity } from "../../utils";


export const UserQueryDetail = () => {
  const { id } = useParams();
  const [Bookdetail, setBookdetail] = useState({});
  const bookdetail = async () => {
    try {
      const response = await getEntity(`query?id=${id}`);
      setBookdetail(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);
    }
  };

  useEffect(() => {
    bookdetail();
  }, [id]);
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Query Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row">



                <div className="col-md-6 mb-4">
                  <p className="secondaryText">User Name</p>
                  <p>{Bookdetail?.name}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">User Email</p>
                  <p>{Bookdetail?.email}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Subject</p>
                  <p>
                    {Bookdetail?.subject}
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Message</p>
                  <p>
                    {Bookdetail?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </DashboardLayout>
    </>
  );
};
