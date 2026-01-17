import axios from "../utils/axiosConfig";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateCategory() {
  const { register, handleSubmit, reset } = useForm();
  let redirect = useNavigate();
  const URL = import.meta.env.VITE_CATEGORY_URL;
  let date = new Date();

  const CreateDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  const { id } = useParams(); // Only Use in Params id
  console.log(id);

  // const [searchParams] = useSearchParams(); // Use in query id
  // const id = searchParams.get("id");

  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`, { withCredentials: true });
    console.log("res ok", res.data);
    reset(res.data.category);
  }

  useEffect(() => {
    ShowData();
  }, [id]);

  async function addcategory(data) {
    if (id == null) {
      try {
        const res = await axios.post(
          URL,
          { CreateDate, ...data },
          { withCredentials: true },
        );
        if (res.data.success) {
          reset();
          redirect("/categoryView");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Category Added!",
            showConfirmButton: true,
            timer: 3000,
          });
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: true,
            timer: 3000,
          });
        }
      } catch (err) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Error : ${err.message}`,
          showConfirmButton: true,
          timer: 3000,
        });
      }
    } else {
      await axios.put(
        `${URL}/${id}`,
        { updateDate: CreateDate, ...data },
        { withCredentials: true },
      );
      reset();
      redirect("/categoryView");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Category Updated!",
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  return (
    <form
      method="post"
      className="rounded mx-4 mt-4"
      onSubmit={handleSubmit(addcategory)}
      style={{
        border: "1px solid rgba(92, 99, 109, 0.95)",
        backgroundColor: "rgba(10, 25, 47, 0.95)",
      }}
    >
      <h1
        className="text-white fs-5 px-3 py-2 fw-semibold"
        style={{ borderBottom: "1px solid rgba(92, 99, 109, 0.95)" }}
      >
        Add Category
      </h1>

      <div className="mx-3">
        <label className="form-label  text-secondary fw-bold pt-2">
          Category Name
        </label>
        <input
          type="text"
          {...register("name")}
          className="form-control custom-input"
          placeholder="Enter Category Name"
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            color: "white",
            border: "1px solid rgba(92, 99, 109, 0.95)",
          }}
          required
        />
      </div>

      <button
        className={id == null ? "btn btn-primary m-3" : "btn btn-warning m-3"}
      >
        {id == null ? "Add Category " : "Update Category"}
      </button>
    </form>
  );
}
