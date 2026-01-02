import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function SubCategoryList(props) {
  const URL = import.meta.env.VITE_SUBCATEGORY_URL;

  const [SubCate, setSubCate] = useState([]);
console.log(SubCate)
  async function ShowData() {
    const res = await axios.get(URL);
    setSubCate(res.data.records);
  }
   function Trash(id) {
     Swal.fire({
      title: "Do You Want to Delete Sub-Category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sub-Category Deleted!",
          icon: "success",
        });
        await axios.delete(`${URL}/${id}`);
        ShowData();
      } else {
        Swal.fire({
          title: "Not Delete!",
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {
    ShowData();
  }, []);
  return (
    <>
      <div
        className=" m-4 rounded-top"
        style={{
          backgroundColor: "rgba(10, 25, 47, 0.95)",
          border: "1px solid rgba(92, 99, 109, 0.95)",
        }}
      >
        <h1 className="text-white fs-5 px-3 py-2 fw-semibold">{props.title}</h1>
        <table className="table table-dark mb-0 ">
          <thead>
            <tr className="table-active text-center">
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Sub Category</th>
              <th scope="col">Date</th>
              <th scope="col">Action </th>
            </tr>
          </thead>
          <tbody>
            {SubCate.map((ele, index) => {
              return (
                <tr
                  className="text-center"
                  style={{ backgroundColor: "transparent" }}
                  key={index}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{ele.category_id.name}</td>
                  <td>{ele.sub_name}</td>
                  <td>{ele.createdAt ? new Date(ele.createdAt).toLocaleString() : "-"}</td>
                  <td className="text-center">
                    <NavLink
                      to={`/subcategory/${ele.id}`}
                      className="btn btn-sm btn-outline-warning me-2"
                    >
                      <AiFillEdit className="fs-4" />
                    </NavLink>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => Trash(ele.id)}
                    >
                      <AiFillDelete className="fs-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
