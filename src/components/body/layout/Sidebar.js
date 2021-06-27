import React, { useState } from "react";
import { Col, Row } from "antd";

const SideBar = () => {
  const [visible, setVisible] = useState(false);
  const handleClickVisible = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/admin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/products/list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-file"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              Quản lý sản phẩm
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/order/list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-cart"
              >
                <circle cx={9} cy={21} r={1} />
                <circle cx={20} cy={21} r={1} />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Quản lý đơn hàng
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/advantisment/list">
              <i className="fas fa-ad" />
              Quản lý quảng cáo
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin/category/list">
              <i className="far fa-list-alt"></i>
              Quản lý chuyên mục sản phẩm
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={(e) => handleClickVisible(e)}
            >
              <i className="fas fa-cogs"></i>
              Cài đặt
            </a>

            <ul
              className="nav flex-column"
              aria-labelledby="navbarScrollingDropdown"
              style={visible ? { display: "block" } : { display: "none" }}
            >
              <li className="nav-item">
                <a class="nav-link" href="/admin/setting/profile">
                  <i className="fas fa-users"></i>
                  Cài đặt người dùng
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
