import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import Swal from "sweetalert2";

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
        redirect("/verifyotp");
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
        <div className="col-md-6">
          <div className="card shadow">
            <div className="text-dark pt-4 text-center">
              <h4>Register Account</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit(signup)}>
                <div className="mb-3">
                  <label className="fw-bold ">Name : </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name..."
                    {...register("name")}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold ">Email : </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email..."
                    {...register("email")}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold ">Password : </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password..."
                    {...register("password")}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold ">Mobile : </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Mobile..."
                    {...register("mobile")}
                  />
                </div>

                <div className=" d-flex justify-content- align-items-center">
                  <button type="submit" className="btn  btn-primary w-25 me-3">
                    Register
                  </button>
                  <NavLink to={"/login"} className="">
                    Login
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
