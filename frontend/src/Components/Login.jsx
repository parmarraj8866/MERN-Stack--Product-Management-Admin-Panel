import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const URL = import.meta.env.VITE_USER_AUTH;
  const redirect = useNavigate();

  async function login(data) {
    try {
      const res = await axios.post(`${URL}/signin`, data, {
        withCredentials: true,
      });

      console.log(res);
      if (!res.data.success) {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        redirect("/DashboardView");
        reset();
      }
    } catch (error) {
      toast.error(error.message, {
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
    <div
      className="min-vh-100 shadow-lg d-flex align-items-center justify-content-center p-3 p-md-0"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="text-center mb-2">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: "#007bff",
              fontSize: "35px",
            }}
          >
            🔐
          </div>
          <h1 className="fw-bold text-dark mb-2" style={{ fontSize: "28px" }}>
            Welcome Back
          </h1>
          <p className="text-muted" style={{ fontSize: "14px" }}>
            Sign in to your account
          </p>
        </div>

        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "12px" }}
        >
          <div className="card-body p-4 p-md-5">
            <form onSubmit={handleSubmit(login)}>
              <div className="mb-4">
                <label
                  className="form-label fw-600 text-dark mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Email Address
                </label>
                <div
                  className="input-group"
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <span
                    className="input-group-text bg-white border-end-0"
                    style={{ borderColor: "#e0e0e0" }}
                  >
                    ✉️
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0"
                    placeholder="your@email.com"
                    {...register("email", { required: true })}
                    style={{
                      borderColor: "#e0e0e0",
                      fontSize: "14px",
                      padding: "10px 12px",
                    }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="form-label fw-600 text-dark mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Password
                </label>
                <div
                  className="input-group"
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <span
                    className="input-group-text bg-white border-end-0"
                    style={{ borderColor: "#e0e0e0" }}
                  >
                    🔑
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0"
                    placeholder="••••••••"
                    {...register("password", { required: true })}
                    style={{
                      borderColor: "#e0e0e0",
                      fontSize: "14px",
                      padding: "10px 12px",
                    }}
                  />
                </div>
              </div>

              {/* <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    style={{ borderColor: "#007bff", cursor: "pointer" }}
                  />
                  <label
                    className="form-check-label text-muted"
                    htmlFor="rememberMe"
                    style={{ fontSize: "13px", cursor: "pointer" }}
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ fontSize: "13px", color: "#007bff" }}
                >
                  Forgot password?
                </a>
              </div> */}

              <button
                type="submit"
                className="btn w-100 fw-600 text-white mb-1"
                style={{
                  backgroundColor: "#007bff",
                  padding: "10px 0",
                  fontSize: "15px",
                  borderRadius: "8px",
                  border: "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#007bff")
                }
              >
                Sign In{" "}
              </button>

              <div className="d-flex align-items-center mb-0">
                <hr
                  className="flex-grow-1"
                  style={{ borderColor: "#e0e0e0" }}
                />
                <span className="px-2 text-muted" style={{ fontSize: "12px" }}>
                  OR
                </span>
                <hr
                  className="flex-grow-1"
                  style={{ borderColor: "#e0e0e0" }}
                />
              </div>

              <div className="text-center">
                <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                  Don't have an account?{" "}
                  <NavLink
                    to="/"
                    className="text-decoration-none fw-600"
                    style={{ color: "#007bff" }}
                  >
                    Sign Up
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
