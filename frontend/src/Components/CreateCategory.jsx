import axios from "../utils/axiosConfig";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateCategory() {
  const { register, handleSubmit, reset } = useForm();
  let redirect = useNavigate();
  const URL = import.meta.env.VITE_CATEGORY_URL;
  let date = new Date();

  const CreateDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  const { id } = useParams(); // Only Use in Params id

  // const [searchParams] = useSearchParams(); // Use in query id
  // const id = searchParams.get("id");

  async function ShowData() {
    if (id) {
      const res = await axios.get(`${URL}/${id}`, { withCredentials: true });
      reset(res.data.category);
    }
  }

  useEffect(() => {
    ShowData();
  }, [id]);

  async function addcategory(data) {
    if (!id) {
      try {
        const res = await axios.post(
          URL,
          { CreateDate, ...data },
          { withCredentials: true },
        );
        if (res.data.success) {
          reset();
          redirect("/categoryView");
          toast.success("Category Added!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
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
      } catch (err) {
        toast.error(`Error : ${err.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
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
      toast.success("Category Updated!", {
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
