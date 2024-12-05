import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const PricingCard = ({ plan, planDuration, onEdit, onDelete }) => {
  const {
    boost_limit,
    messages_limit,
    name,
    platinum_percent,
    points,
    posts_limit,
    requests,
    sales_percent,
    tips_percent,
    pricing_options,
  } = plan;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="custom-tooltip">
      {props.message}
    </Tooltip>
  );

  return (
    <div className="wow fadeInUp mt-3 d-flex justify-content-center custom-width">
      <div className="pricing_design">
        <div className="single-pricing">
          <div className="price-head text-capitalize">
            <h3>{name}</h3>
            {planDuration === "monthly" ? (
              <>
                <h1>${pricing_options?.monthly}</h1>
                <span>/month</span>
              </>
            ) : (
              <>
                <h1>${pricing_options?.yearly}</h1>
                <span>/year</span>
              </>
            )}
          </div>
          <ul>
            {boost_limit !== undefined && (
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({
                  message: `${boost_limit.text}`,
                })}
                offset={[0, 1]} // Adjust the offset
              >
                <li>
                  Boost Limit <b>{boost_limit.value}</b>
                </li>
              </OverlayTrigger>
            )}
            {messages_limit !== undefined && (
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({
                  message: `${messages_limit.text}`,
                })}
                offset={[0, 1]} // Adjust the offset
              >
                <li>
                  Messages Limit <b>{messages_limit.value}</b>
                </li>
              </OverlayTrigger>
            )}
            {platinum_percent !== undefined && (
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({
                  message: `${platinum_percent.text}%`,
                })}
                offset={[0, 1]} // Adjust the offset
              >
                <li>
                  Platinum Percent <b>{platinum_percent.value}%</b>
                </li>
              </OverlayTrigger>
            )}
            {points !== undefined && (
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({
                  message: `${points}`,
                })}
                offset={[0, 1]} // Adjust the offset
              >
                <li className="too">
                  Points <b>{points}</b>
                </li>
              </OverlayTrigger>
            )}
            {posts_limit !== undefined && (
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({
                  message: `${posts_limit.text}`,
                })}
                offset={[0, 1]} // Adjust the offset
              >
                <li>
                  Posts Limit <b>{posts_limit.value}</b>
                </li>
              </OverlayTrigger>
            )}
            {requests !== undefined && (
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({
                  message: `${requests.text}`,
                })}
                offset={[0, 1]} // Adjust the offset
              >
                <li>
                  Requests <b>{requests.value}</b>
                </li>
              </OverlayTrigger>
            )}
            {sales_percent !== undefined && (
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({
                  message: `${sales_percent.text}%`,
                })}
                offset={[0, 1]} // Adjust the offset
              >
                <li>
                  Sales Percent <b>{sales_percent.value}%</b>
                </li>
              </OverlayTrigger>
            )}
            {tips_percent !== undefined && (
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({
                  message: `${tips_percent.text}%`,
                })}
                offset={[0, 1]} // Adjust the offset
              >
                <li>
                  Tips Percent <b>{tips_percent.value}%</b>
                </li>
              </OverlayTrigger>
            )}
          </ul>

          <div className="pricing-price"></div>

          <p className="d-flex flex-row gap-3 justify-content-center">
            <FontAwesomeIcon icon={faEdit} onClick={onEdit} />{" "}
            <FontAwesomeIcon icon={faTrashCan} onClick={onDelete} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
