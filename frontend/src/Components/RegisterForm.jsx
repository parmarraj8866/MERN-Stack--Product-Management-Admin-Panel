import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let redirect = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "🎉 Registered Successfully!",
        text: "Your account has been created successfully.",
        icon: "success",
        
        confirmButtonColor: "#3085d6",
        timer: 2000,
        showConfirmButton: false,
      });

      redirect("/DashboardView");
    } catch {
      Swal.fire({
        title: "❌ Registration Failed!",
        text: "Something went wrong while creating your account.",
        icon: "error",
        confirmButtonColor: "#d33",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  }

  return (
    <div
      className=" d-flex justify-content-center align-items-center w-75"
      style={{ height: "100vh" }}
    >
      <form
        className=" p-5 rounded-2 w-50"
        style={{ backgroundColor: "rgba(13, 27, 48, 0.95)" }}
        onSubmit={registerUser}
      >
        <h2 className="text-white mb-3 text-center">Register </h2>
        <div className=" mb-2">
          <label className="form-label text-white">Username : </label>
          <input
            type="text"
            placeholder="Enter Username"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className=" mb-2">
          <label className="form-label text-white">Email : </label>

          <input
            type="email"
            placeholder="Enter Email"
            className="form-control "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className=" mb-4">
          <label className="form-label text-white">Password : </label>

          <input
            type="password"
            placeholder="Enter Password"
            className="form-control "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-2 text-center">
          <button
            className="btn text-white w-50 "
            style={{ backgroundColor: "rgba(7, 50, 110, 0.95)" }}
          >
            Register
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-1">
          <h6 className="text-white">Already have an account?</h6>
          <NavLink to="/login" className="mb-2">
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
}
