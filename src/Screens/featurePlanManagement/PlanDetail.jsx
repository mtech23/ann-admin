import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";


// Getchaptersdetailbyidbyid

export const PlanDetail = () => {
  const Bookstatus = [
    {
      key: "0",
      name: "free"
    },
    {
      key: "1",
      name: "paid"
    }
  ];
  const { id } = useParams();

  const base_url = process.env.REACT_APP_BASE_URL;
  const [Bookdetail, setBookdetail] = useState({});
 




 





  const bookdetail = async () => {
    try {
      const token = localStorage.getItem("login");
      const url = `${process.env.REACT_APP_BASE_URL}`;
      const response = await fetch(
        `${url}featureplan?id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const resp=await response.json()


      setBookdetail(resp?.data);
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
                Plan Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row">
                {/* <div className="col-md-6 mb-4">
                  <div className="productImage">
                  <p className="secondaryText">Book Cover</p>
                    <img src={'https://custom3.mystagingserver.site/ann-api' + Bookdetail?.cover} />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="productImage">
                  <p className="secondaryText">Video</p>
                    {Bookdetail?.video? (
                      <div className="productVideo mt-3">
                        <video
                          controls
                          style={{ width: '100%' }}
                        >
                          <source
                            src={'https://custom3.mystagingserver.site/ann-api' + Bookdetail?.video}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ): <span>
                      Video Not Available 
                    </span> }
                  </div>
                </div> */}


                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Title</p>
                  <p>{Bookdetail?.title}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Description</p>
                  <p>{Bookdetail?.description}</p>
                </div>



                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Amount</p>
                  <p>
                    {Bookdetail?.amount}
                  </p>
                </div>

                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Duration</p>
                  <p>
                    {Bookdetail?.duration}
                  </p>
                </div>
                {/* <div className="col-md-6 mb-4">
                  <p className="secondaryText">Description</p>
                  <p dangerouslySetInnerHTML={{ __html: Bookdetail?.description }}></p>
                </div> */}
              </div>

           
            </div>
          </div>
        </div>

        

     

        

        

     
      </DashboardLayout>
    </>
  );
};
