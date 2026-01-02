import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let redirect = useNavigate();

  async function loginUser(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      redirect("/DashboardView");
      Swal.fire({
        title: "✅ Login Successful!",
        text: "Welcome back! You are now logged in.",
        icon: "success",
        
        confirmButtonColor: "#3085d6",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        title: "❌ Login Failed!",
        text: "Invalid email or password. Please try again.",
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
        onSubmit={loginUser}
      >
        <h2 className="text-white text-center mb-3">Login </h2>

        <div className=" mb-2">
          <label className="form-label text-white">Email : </label>

          <input
            type="text"
            placeholder="Enter Email"
            className="form-control "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className=" mb-4">
          <label className="form-label text-white">Password : </label>

          <input
            type="text"
            placeholder="Enter Password"
            className="form-control "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-2 text-center">
          <button
            className="btn text-white w-50"
            style={{ backgroundColor: "rgba(7, 50, 110, 0.95)" }}
          >
            Login
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-1">
          <h6 className="text-white">Don't have an account?</h6>
          <NavLink to="/" className="mb-2">
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
}
