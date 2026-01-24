import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFolderOpen, FaBoxOpen } from "react-icons/fa";
import { BiGitBranch } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";

export default function DashboardHome() {
  const [Cate, setCate] = useState([]);
  const [SubCate, setSubCate] = useState([]);
  const [Product, setProduct] = useState([]);
  const redirect = useNavigate();

  const CateURL = import.meta.env.VITE_CATEGORY_URL;
  const SubCateURL = import.meta.env.VITE_SUBCATEGORY_URL;
  const ProURL = import.meta.env.VITE_PRODUCT_URL;

  async function ShowCategoryCount() {
    try {
      const res = await axios.get(CateURL, { withCredentials: true });
      setCate(res.data.records);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  async function ShowSubCategoryCount() {
    try {
      const res = await axios.get(SubCateURL, { withCredentials: true });
      setSubCate(res.data.records);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  }

  async function ShowProductCount() {
    try {
      const res = await axios.get(ProURL, { withCredentials: true });
      setProduct(res.data.records);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  useEffect(() => {
    ShowCategoryCount();
    ShowSubCategoryCount();
    ShowProductCount();
  }, []);

  let result = 0;
  for (let i = 0; i < Product.length; i++) {
    let finalPrice = Number(Product[i].p_price);
    result += finalPrice;
  }

  const stats = [
    {
      title: "Categories",
      bgColor: "#2983e3ff",
      loc: "categoryView",
      color: "white",
      icon: <FaFolderOpen />,
      count: Cate.length,
    },
    {
      title: "Subcategories",
      bgColor: "#6a28d5ff",
      loc: "subcategoryView",
      color: "white",
      icon: <BiGitBranch />,
      count: SubCate.length,
    },
    {
      title: "Products",
      bgColor: "#0ee17fff",
      loc: "productView",
      color: "white",
      icon: <FaBoxOpen />,
      count: Product.length,
    },
    {
      title: "Investments",
      bgColor: "#e27d2bff",
      loc: "productView",
      color: "white",
      icon: <GiTakeMyMoney />,
      count: "₹" + result,
    },
  ];

  return (
    <div className="container-fluid  py-2 px-2 ">
      <div
        className="p-2 rounded dashview"
        style={{
          backgroundColor: "rgba(10, 25, 47, 0.95)",
          height: "100vh",
          border: "1px solid rgba(92, 99, 109, 0.95)",
        }}
      >
        <div className="text-center mb-5 mt-3">
          <h1 className="fw-semibold text-light dashhome">Dashboard View</h1>
        </div>

        <div
          className="row justify-content-center g-4 "
          style={{ width: "100%", height: "500px" }}
        >
          {stats.map((item, index) => (
            <div className="col-12 col-sm-7 col-md-5 col-lg-3 " key={index}>
              <div
                className="card text-center mb-2 p-4 border-0 rounded-2 shadow-sm stat-card"
                onClick={() => redirect(`/${item.loc}`)}
                style={{
                  borderRadius: "16px",
                  background: item.bgColor,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
              >
                <div
                  className=" mx-auto mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: item.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <i className={"fs-2"} style={{ color: `${item.bgColor}` }}>
                    {item.icon}
                  </i>
                </div>
                <h5 className="fw-semibold mb-1 text-white">{item.title}</h5>
                <h3 className="fw-bold" style={{ color: item.color }}>
                  {item.count}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
