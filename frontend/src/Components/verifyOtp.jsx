import axios from "../utils/axiosConfig";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyOtp() {
  const { register, handleSubmit, reset } = useForm();
  const redirect = useNavigate();

  const URL = import.meta.env.VITE_USER_AUTH;

  async function verifyOtp(data) {
    {
      try {
        const res = await axios.post(`${URL}/verifyotp`, data, {
          withCredentials: true,
        });
        console.log(res.data);

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
          reset();
          redirect("/login");
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
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="text-center pt-4">
              <h4>Verify OTP</h4>
              <p className="text-muted">Enter OTP sent to your email</p>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit(verifyOtp)}>
                <div className="mb-3">
                  <label className="fw-bold mb-1">OTP : </label>
                  <input
                    type="text"
                    className="form-control  fs-5"
                    placeholder="Enter 6 digit OTP"
                    maxLength={6}
                    {...register("otp", { required: true })}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
