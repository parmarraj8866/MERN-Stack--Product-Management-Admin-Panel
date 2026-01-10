import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function CategoryList(props) {
  const [List, setList] = useState([]);
  const URL = import.meta.env.VITE_CATEGORY_URL;

  async function showData() {
    const res = await axios.get(URL);
    console.log(res)
    setList(res.data.records);
  }

  console.log(List)
  useEffect(() => {
    showData();
  }, []);

 function Trash(id) {
    Swal.fire({
      title: "Do You Want to Delete Category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Category Delete",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
        await axios.delete(`${URL}/${id}`);
        showData();
      } else {
        Swal.fire({
          title: "Not Delete!",
          icon: "success",
        });
      }
    });
  }

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
              <th scope="col">Create At</th>
              <th scope="col">Update At</th>
              <th scope="col">Action </th>
            </tr>
          </thead>
          <tbody>
            {List.map((ele, index) => (
              <>
                <tr
                  className="text-center"
                  style={{ backgroundColor: "transparent" }}
                  key={index}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{ele.name}</td>
                  <td>{new Date(ele.createdAt).toLocaleString()}</td>
                  <td>{ele.updatedAt ? new Date(ele.updatedAt).toLocaleString() : "-"}</td>
                  <td className="text-center">
                    <NavLink
                      className="btn btn-sm btn-warning me-2"
                      to={`/category/${ele._id}`}
                    >
                      <AiFillEdit className="fs-4" />
                    </NavLink>
                    <NavLink
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => Trash(ele._id)}
                    >
                      <AiFillDelete className="fs-4" />
                    </NavLink>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
