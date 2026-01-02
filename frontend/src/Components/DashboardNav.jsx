import React from "react";
import { FaBars } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import auth from "../../firestore";
import Swal from "sweetalert2";

export default function Dashboard(props) {
  let redirect = useNavigate();

  function logOutUser() {
    try {
      const user = auth.currentUser;
      deleteUser(user);
      redirect("/");
      Swal.fire({
        title: "👋 Logged Out!",
        text: "You have been logged out successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        title: "⚠️ Logout Failed!",
        text: "Something went wrong while logging out.",
        icon: "error",
        confirmButtonColor: "#d33",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  }
  return (
    <>
      <section>
        <div
          className="d-flex justify-content-between"
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            borderBottom: "1px solid rgba(92, 99, 109, 0.95)",
          }}
        >
          <div
            className="d-flex align-items-center mx-4"
            style={{ paddingTop: "17px", paddingBottom: "17px" }}
          >
            <NavLink to="/DashboardView">
              {" "}
              <FaBars className="text-secondary  mx-3 mt- fs-45" />
            </NavLink>
            <NavLink
              to="/DashboardView"
              className="py-1 fs-5 text-secondary text-decoration-none"
            >
              Dashboard
            </NavLink>
          </div>

          <div className="d-flex justify-content-center align-items-center gap-3 mx-4">
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
            <button className="btn btn-danger" onClick={logOutUser}>
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
