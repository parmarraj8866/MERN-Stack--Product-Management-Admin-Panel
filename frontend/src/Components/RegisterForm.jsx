import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const URL = import.meta.env.VITE_USER_AUTH;
  const redirect = useNavigate();

  async function signup(data) {
    try {
      const res = await axios.post(`${URL}/signup`, data, {
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
        redirect("/verifyotp");
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
      className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-0"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="w-100" style={{ maxWidth: "480px" }}>
        <div className="text-center">
          <div
            className="mx-auto mb-1 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: "#28a745",
              fontSize: "35px",
            }}
          >
            📝
          </div>
          <h1 className="fw-bold text-dark mb-3" style={{ fontSize: "28px" }}>
            Create Account
          </h1>
        </div>

        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "12px" }}
        >
          <div className="card-body p-4 p-md-5">
            <form onSubmit={handleSubmit(signup)}>
              <div className="mb-2">
                <label
                  className="form-label fw-600 text-dark mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Full Name
                </label>
                <div
                  className="input-group"
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <span
                    className="input-group-text bg-white border-end-0"
                    style={{ borderColor: "#e0e0e0" }}
                  >
                    👤
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="John Doe"
                    {...register("name", { required: true })}
                    style={{
                      borderColor: "#e0e0e0",
                      fontSize: "14px",
                      padding: "10px 12px",
                    }}
                  />
                </div>
              </div>

              <div className="mb-2">
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

              <div className="mb-2">
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

              <div className="mb-2">
                <label
                  className="form-label fw-600 text-dark mb-2"
                  style={{ fontSize: "14px" }}
                >
                  Mobile Number
                </label>
                <div
                  className="input-group"
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <span
                    className="input-group-text bg-white border-end-0"
                    style={{ borderColor: "#e0e0e0" }}
                  >
                    📱
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="+1 (555) 000-0000"
                    {...register("mobile", { required: true })}
                    style={{
                      borderColor: "#e0e0e0",
                      fontSize: "14px",
                      padding: "10px 12px",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn w-100 fw-600 text-white mb-1"
                style={{
                  backgroundColor: "#28a745",
                  padding: "10px 0",
                  fontSize: "15px",
                  borderRadius: "8px",
                  border: "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#218838")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#28a745")
                }
              >
                Create Account
              </button>

              <div className="d-flex align-items-center">
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
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className="text-decoration-none fw-600"
                    style={{ color: "#28a745" }}
                  >
                    Sign In
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
