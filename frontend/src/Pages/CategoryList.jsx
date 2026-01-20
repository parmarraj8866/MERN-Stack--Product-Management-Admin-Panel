import axios from "../utils/axiosConfig";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function CategoryList(props) {
  const [List, setList] = useState([]);
  const URL = import.meta.env.VITE_CATEGORY_URL;

  async function showData() {
    const res = await axios.get(URL, { withCredentials: true });
    console.log(res);
    setList(res.data.records);
  }

  console.log(List);
  useEffect(() => {
    showData();
  }, []);

  function Trash(id) {
    if (window.confirm("Do You Want to Delete Category?")) {
      toast.success("Category Deleted!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      axios.delete(`${URL}/${id}`, { withCredentials: true });
      showData();
    } else {
      toast.info("Not Delete!", {
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
                  <td>
                    {ele.updatedAt
                      ? new Date(ele.updatedAt).toLocaleString()
                      : "-"}
                  </td>
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
