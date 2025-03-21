import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faBook,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

export const Sidebar = props => {
  const location = useLocation();
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes("/dashboard")
              ? "active"
              : ""}`}
            to="/dashboard"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>

        
        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/book-management"
            )
              ? "active"
              : ""}`}
            to="/book-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <span className="sideLinkText">Book Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/category-management"
            )
              ? "active"
              : ""}`}
            to="/category-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <span className="sideLinkText">Category Management</span>
          </Link>
        </li>
        {/* <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/orders-management"
            )
              ? "active"
              : ""}`}
            to="/orders-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <span className="sideLinkText">Orders Management</span>
          </Link>
        </li> */}
        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/users-management"
            )
              ? "active"
              : ""}`}
            to="/users-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <span className="sideLinkText">Users Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/plan-management"
            )
              ? "active"
              : ""}`}
            to="/plan-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <span className="sideLinkText">Plan Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/Feature-book"
            )
              ? "active"
              : ""}`}
            to="/Feature-book"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <span className="sideLinkText">Feature Books</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/policies-management"
            )
              ? "active"
              : ""}`}
            to="/policies-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <span className="sideLinkText">Privacy Policy</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/query-management"
            )
              ? "active"
              : ""}`}
            to="/query-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faQuestion} />
            </span>
            <span className="sideLinkText">User Query</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${location.pathname.includes(
              "/terms-condition-management"
            )
              ? "active"
              : ""}`}
            to="/terms-condition-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <span className="sideLinkText">Terms & Conditions</span>
          </Link>
        </li>

      </ul>
    </div>
  );
};
