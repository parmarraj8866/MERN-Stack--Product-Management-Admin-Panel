import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductAdd() {
  const { register, handleSubmit, reset } = useForm();

  const [ProductSubCate, setProductSubCate] = useState([]);

  console.log("ProductSubCate", ProductSubCate);

  const URL = import.meta.env.VITE_PRODUCT_URL;
  const CateURL = import.meta.env.VITE_CATEGORY_URL;
  const SubCateURL = import.meta.env.VITE_SUBCATEGORY_URL;

  const { id } = useParams();
  let redirect = useNavigate();
  let date = new Date();
  const CreateDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  //  Product URL
  async function ShowData() {
    const res = await axios.get(`${URL}/${id}`);
    console.log("Product BY ", res.data.product);

    const product = res.data.product;
    reset({
      ...product,
      category_id: product.category_id._id,
      subcategory_id: product.subcategory_id._id,
    });
  }

  // category url
  async function ShowDataSubCategory() {
    const res = await axios.get(SubCateURL);
    setProductSubCate(res.data.records);
  }

  useEffect(() => {
    ShowData();
    ShowDataSubCategory();
  }, []);

  async function addProduct(data) {
    if (id == null) {
      const res = await axios.post(URL, { CreateDate, ...data });
      console.log(res);
      reset({
        ProductCategory: "--Select Category--",
        ProductSubCategory: "--Select Sub Category--",
        ProductName: "",
        ProductPrice: "",
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Product Added!",
        showConfirmButton: true,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Product Updated!",
        showConfirmButton: true,
        timer: 3000,
      });
      await axios.put(`${URL}/${id}`, data);
      reset({
        ProductCategory: "--Select Category--",
        ProductSubCategory: "--Select Sub Category--",
        ProductName: "",
        ProductPrice: "",
      });
    }
    redirect("/productView");
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit(addProduct)}
      className="rounded mx-4 mt-4"
      style={{
        border: "1px solid rgba(92, 99, 109, 0.95)",
        backgroundColor: "rgba(10, 25, 47, 0.95)",
      }}
    >
      <h1
        className="text-white fs-5 px-3 py-2 fw-semibold"
        style={{ borderBottom: "1px solid rgba(92, 99, 109, 0.95)" }}
      >
        Add Product
      </h1>

      <div className="mx-3 mb-2">
        <label className="form-label  text-secondary fw-bold  pt-2">
          Category List
        </label>
        <select
          className="form-select custom-input"
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            color: "white",
            border: "1px solid rgba(92, 99, 109, 0.95)",
          }}
          {...register("category_id")}
          required
        >
          <option selected disabled>
            --Select Category--
          </option>
          {ProductSubCate.map((ele, index) => (
            <option key={index} value={ele.category_id._id}>
              {ele.category_id.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-3 mb-2">
        <label className="form-label  text-secondary fw-bold  pt-2">
          Sub-Category List
        </label>
        <select
          className="form-select custom-input"
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            color: "white",
            border: "1px solid rgba(92, 99, 109, 0.95)",
          }}
          {...register("subcategory_id")}
          required
        >
          <option selected disabled>
            --Select Sub Category--
          </option>
          {ProductSubCate.map((ele, index) => {
            return (
              <option key={index} value={ele._id}>
                {ele.sub_name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mx-3 mb-2">
        <label className="form-label  text-secondary fw-bold  pt-2">
          Product Name
        </label>
        <input
          type="text"
          className="form-control custom-input"
          placeholder="Enter Product Name"
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            color: "white",
            border: "1px solid rgba(92, 99, 109, 0.95)",
          }}
          {...register("p_name")}
          required
        />
      </div>

      <div className="mx-3 mb-2">
        <label className="form-label  text-secondary fw-bold  pt-2">
          Product Price
        </label>
        <input
          type="text"
          className="form-control custom-input"
          placeholder="Enter Product Price"
          style={{
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            color: "white",
            border: "1px solid rgba(92, 99, 109, 0.95)",
          }}
          {...register("p_price")}
          required
        />
      </div>

      <button
        className={id == null ? "btn btn-primary m-3" : "btn btn-warning m-3"}
      >
        {" "}
        {id == null ? "Add Product" : "Update Product "}
      </button>
    </form>
  );
}
