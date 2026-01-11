import React from "react";
import { SiSecurityscorecard } from "react-icons/si";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const SideMenuBar = () => {
  return (
    <>
      <div className="position-fixed sidebarmenu top-0 start-0 text-white">
        <div
          className="d-flex align-items-center  py-3 px-4 text-light fs-5"
          style={{ borderBottom: "1px solid rgba(92, 99, 109, 0.95)" }}
        >
          <NavLink to="/DashboardView" className="text-white me-1">
            <SiSecurityscorecard className=" sidebaricon" />
          </NavLink>
          <NavLink
            to="/DashboardView"
            className="fw-normal text-decoration-none sidebartitle"
            style={{
              color: "rgba(72, 93, 196, 0.95) ",
            }}
          >
          DASHBOARD
          </NavLink>
        </div>

        <div className="px-2">
          <NavLink
            className="dashboard mb-3 py-3 px-3 text-decoration-none fw-semibold text-white rounded mt-2 d-flex gap-2"
            to="/DashboardView"
          >
            <AiOutlineDashboard
              className="fs-5 text-secondary "
              style={{ marginTop: "1.5px" }}
            />{" "}
            Dashboard
          </NavLink>
        </div>
        <p className="text-secondary text-uppercase mb-3 mx-4 mt-4 fw-bold ">
          Components
        </p>

        <div className="accordion px-2" id="accordionExample">
          <div className="accordion-item bg-transparent border-0">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button  rounded collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <BiCategory className="fs-5 text-secondary fw-semibold " />
                <span className="mx-2  fw-semibold">Category</span>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className="submenu-link" to="/categoryadd">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="submenu-link" to="/categoryView">
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="accordion-item bg-transparent border-0 mt-2">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button   rounded collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <BiCategory className="fs-5 text-secondary  fw-semibold" />
                <span className="mx-2  fw-semibold">SubCategory</span>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className="submenu-link" to="/subcategory">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="submenu-link" to="/subcategoryView">
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="accordion-item bg-transparent border-0 mt-2">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button  rounded  collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <BiCategory className="fs-5 text-secondary  fw-semibold" />
                <span className="mx-2 fw-semibold">Product </span>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className="submenu-link" to="/productAdd">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="submenu-link" to="/productView">
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenuBar;
