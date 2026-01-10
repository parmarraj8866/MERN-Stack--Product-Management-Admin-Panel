import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductList(props) {
  const [Product, setProduct] = useState([]);

  console.log("Product", Product)

  const URL = import.meta.env.VITE_PRODUCT_URL;
  
  async function showData() {
    const res = await axios.get(URL);
    if(res){
      setProduct(res.data.records);
    }
  }

  console.log(Product)

 function Trash(id){
     Swal.fire({
      title: "Do You Want to Delete Product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " Delete",
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Product Deleted!",
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


  console.log(Product)

  useEffect(() => {
    showData();
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
              <th scope="col">Product Name</th>
              <th scope="col">Product Price(₹)</th>
              <th scope="col">Create At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Product.map((ele, index) => {
              return (
                <tr
                  className="text-center"
                  style={{ backgroundColor: "transparent" }}
                >
                  <th scope="row">{index + 1  }</th>

                  <td>{ele?.category_id?.name}</td>
                  <td>{ele?.subcategory_id?.sub_name}</td>
                  <td>{ele.p_name}</td>
                  <td>₹{ele.p_price}</td>
                  <td>{ele.createdAt ? new Date(ele.createdAt).toLocaleString() : "-"}</td>
                  <td className="text-center">
                    <NavLink to={`/product/${ele._id}`} className="btn btn-sm btn-outline-warning me-2">
                      <AiFillEdit className="fs-4" />
                    </NavLink>
                    <button className="btn btn-sm btn-outline-danger"
                    onClick={()=> Trash(ele._id)}>
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
