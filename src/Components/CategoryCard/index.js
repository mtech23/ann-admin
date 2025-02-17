import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.css"; // Updated CSS import to match the new component name
import { Link } from "react-router-dom";

const SeriesCard = ({ data = [], handleDelete, hanldeRoute, handleEdit }) => {
  return (
    <section id="advertisers" className="advertisers-service-sec pt-5 ">
      <div className="container">
        <div className="row">
          <div className="section-header text-center">
            <h4 className="fw-bold category-heading-1">
              <span className=" category-heading"> Categories</span>
            </h4>
          </div>
        </div>

        <div className="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">
          {data?.map(({ title, id, image }, index) => (
            <div className="col" key={index}>
              <div className="service-card" 
                // style={{
                  // backgroundImage: `url(https://custom3.mystagingserver.site/ann-api${image})`, // Dynamically set the background image
                  // backgroundSize: "cover",         // Optional: ensures the image covers the div
                  // backgroundPosition: "center",  
                  // filter:"blur(2px)",  // Optional: centers the image
                // }}
              >
                <div className="service-card-content">
                  <h3 style={{zIndex:"9999"}}  >{title}</h3>
                  <p>
                    {/* <FontAwesomeIcon
                      icon={faEye}
                      className="tableActionIcon"
                      onClick={() => hanldeRoute(title)}
                    /> */}
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="tableActionIcon"
                      onClick={() => handleEdit({ title, id })}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(id)}
                    />
                  </p>
                  {/* <p>Books count : {countOfBooks}</p> */}
                </div>
                <div className="service-card-img" style={{
                  backgroundImage: `url(https://custom3.mystagingserver.site/ann-api${image})`
                }}>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeriesCard;
