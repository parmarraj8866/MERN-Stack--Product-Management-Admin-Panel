import React from "react";
import { FaBars } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "../utils/axiosConfig";

export default function Dashboard(props) {
  const redirect = useNavigate();
  const Logout_URL = import.meta.env.VITE_USER_AUTH;

  async function logout() {
    const res = await axios.get(`${Logout_URL}/logout`, {
      withCredentials: true,
    });
    if (res.data.success) {
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      redirect("/");
    } else {
      toast.error(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
  return (
    <>
      <section>
        <div
          className="d-flex justify-content-between align-items-center flex-wrap pb-2"
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            borderBottom: "1px solid rgba(92, 99, 109, 0.95)",
          }}
        >
          <div
            className="d-flex align-items-center"
            style={{ paddingTop: "17px", paddingBottom: "17px" }}
          >
            <NavLink to="/DashboardView">
              {" "}
              <FaBars className="text-secondary  mx-2 mt- fs-45" />
            </NavLink>
            <NavLink
              to="/DashboardView"
              className="py-1 fs-5 text-secondary text-decoration-none"
            >
              Dashboard
            </NavLink>
          </div>

          <div className="d-flex justify-content-center align-items-center gap-3 mx-1">
            <div
              style={{
                width: "1.5px",
                height: "35px",
                backgroundColor: "rgba(48, 62, 80, 0.95)",
              }}
            ></div>
            <BsMoon
              className="fs-4 "
              style={{ color: "rgba(202, 205, 209, 0.95)" }}
            />
            <div
              style={{
                width: "1.5px",
                height: "35px",
                backgroundColor: "rgba(48, 62, 80, 0.95)",
              }}
            ></div>
            <button className="btn btn-danger" onClick={() => logout()}>
              Logout
            </button>
          </div>
        </div>
        <div
          className="d-flex justify-content-start align-items-center px-3 py-3 text-white"
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            borderBottom: "1px solid rgba(92, 99, 109, 0.95)",
          }}
        >
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/DashboardView">Home</a>
              </li>
              <li
                className="breadcrumb-item active text-secondary fw-semibold"
                aria-current="page"
              >
                {props.title}
              </li>
            </ol>
          </nav>
        </div>
      </section>
    </>
  );
}
