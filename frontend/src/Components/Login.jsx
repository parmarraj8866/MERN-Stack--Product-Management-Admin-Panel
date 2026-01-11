import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const URL = import.meta.env.VITE_USER_AUTH;
  const redirect = useNavigate();

  async function login(data) {
    try {
      const res = await axios.post(`${URL}/signin`, data);
      if (!res.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
        redirect("/DashboardView");
        reset();
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: error.message,
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="text-dark pt-4 text-center">
              <h4>Login Account</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit(login)}>
                <div className="mb-3">
                  <label className="fw-bold">Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email..."
                    {...register("email")}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Password :</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password..."
                    {...register("password")}
                  />
                </div>

                <div className="d-flex align-items-center">
                  <button type="submit" className="btn btn-primary w-25 me-3">
                    Login
                  </button>

                  <NavLink to={"/"} className="">
                    Create Account
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
