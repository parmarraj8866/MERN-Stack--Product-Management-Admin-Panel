import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function SubCategory() {
  const { register, handleSubmit, reset } = useForm();
  const [SubCate, setSubCate] = useState([]);
  const URL = import.meta.env.VITE_SUBCATEGORY_URL;
  const CATEURL = import.meta.env.VITE_CATEGORY_URL;
  let date = new Date();
  let { id } = useParams();
  let redirect = useNavigate();

  const currentDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  // Sub Category
  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`, { withCredentials: true });
    console.log("My Res", res.data.subCategory);
    reset(res.data.subCategory);
  }

  // Category
  async function ShowDataCateGory() {
    const res = await axios.get(CATEURL, {
      withCredentials: true,
    });
  }

  // Sub Category Add and Update
  async function addSubcategory(data) {
    if (id == null) {
      const res = await axios.post(
        URL,
        { currentDate, ...data },
        { withCredentials: true },
      );
      console.log("res", res);
      if (res.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Sub-Category Added!",
          showConfirmButton: true,
          timer: 3000,
        });
        reset({
          subCategorySelect: "--select Category--",
          subCategory_name: "",
        });
        redirect("/subcategoryView");
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
      }
    } else {
      await axios.put(
        `${URL}/${id}`,
        { currentDate, ...data },
        { withCredentials: true },
      );
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Sub-Category Updated!",
        showConfirmButton: true,
        timer: 3000,
      });
      reset({ subCategorySelect: "--select Category--", subCategory_name: "" });
      redirect("/subcategoryView");
    }
  }

  useEffect(() => {
    ShowData();
    ShowDataCateGory();
  }, []);

  return (
    <form
      method="post"
      className="rounded mx-4 mt-4"
      style={{
        border: "1px solid rgba(92, 99, 109, 0.95)",
        backgroundColor: "rgba(10, 25, 47, 0.95)",
      }}
      onSubmit={handleSubmit(addSubcategory)}
    >
      <h1
        className="text-white fs-5 px-3 py-2 fw-semibold"
        style={{ borderBottom: "1px solid rgba(92, 99, 109, 0.95)" }}
      >
        Add Sub Category Name
      </h1>

      <div className="mx-3 mb-2">
        <label className="form-label text-secondary fw-semibold pt-2">
          Category List
        </label>
        <select
          className="form-select custom-input"
          {...register("category_id")}
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            color: "white",
            border: "1px solid rgba(92, 99, 109, 0.95)",
          }}
          required
        >
          <option value="--select Category--" disabled selected>
            --select Category--
          </option>
          {SubCate.map((ele, index) => {
            return (
              <option key={index} value={ele._id}>
                {ele.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mx-3">
        <label className="form-label  text-secondary fw-semibold pt-2">
          Sub Category Name
        </label>
        <input
          {...register("sub_name")}
          type="text"
          className="form-control custom-input"
          placeholder="Enter Sub Category Name"
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
        {id == null ? "Add Sub Category" : "Update Sub Category"}
      </button>
    </form>
  );
}
