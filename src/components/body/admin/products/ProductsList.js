import React, { useState, useEffect } from "react";
import {
  Table as Tables,
  Button,
  PageHeader,
  notification,
  Pagination,
} from "antd";
import ProductsForm from "./ProductsForm";
import AdminContent from "components/body/layout/AdminContent";
import callApi from "actions/common/callApi";
import { useHistory, NavLink } from "react-router-dom";
import NumberFormat from "react-number-format";
import "./style.scss";

const columns = [
  {
    title: "Ảnh sản phẩm",
    dataIndex: "image",
    key: "image",
    render: (value, row, column) => {
      return <img src={value} alt="image" className="image-responsive" />;
    },
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Giá tiền",
    dataIndex: "buying_price",
    key: "buying_price",
    render: (value) => {
      return (
        <NumberFormat
          value={value}
          displayType={"text"}
          thousandSeparator={true}
        />
      );
    },
  },
  {
    title: "Giá sale",
    dataIndex: "selling_price",
    key: "selling_price",
    render: (value) => {
      return (
        <NumberFormat
          value={value}
          displayType={"text"}
          thousandSeparator={true}
        />
      );
    },
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Chuyên mục",
    key: "category_id",
    dataIndex: "category_id",
  },
];

const PAGE_SIZE = 10;
const ProductsList = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  const [ProductsData, setProductsData] = useState();
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [rowId, setRowId] = useState();

  const fetchDataProducts = () => {
    return callApi(`api/products?limit=${PAGE_SIZE}&page=${page}`, {
      method: "GET",
    })
      .then(({ data, code, message }) => {
        if (data && code == 200) {
          setProductsData(data.products);
        }
      })
      .catch((error) => {
        console.log("error => fetchDataProducts", error);
      });
  };

  const delDataItems = () => {
    try {
      callApi(`api/products/${rowId}`, { method: "DELETE" }).then(
        ({ data, code, message }) => {
          if (data && code === 204) {
            notification.open({
              message: "Xóa thành công",
            });
            fetchDataProducts();
          } else {
            notification.open({
              message: "Có lỗi xảy ra",
            });
            history.goBack();
          }
        }
      );
    } catch (error) {
      console.log("CategoryList => delDataItems", error);
    }
  };

  useEffect(() => {
    fetchDataProducts();
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      handleRowSelection(selectedRows[0].id);
    },
  };

  const handleRowSelection = (value) => {
    setRowId(value);
    setShowButton(true);
  };

  return (
    <AdminContent>
      <PageHeader
        extra={[
          <NavLink to={`/admin/products/edit/${rowId}`}>
            <Button type="primary" hidden={!showButton}>
              Sửa
            </Button>
          </NavLink>,
          <Button type="primary" hidden={!showButton} onClick={delDataItems}>
            Xóa
          </Button>,
          <NavLink to={`/admin/products/create`}>
            <Button key="1" type="primary">
              Tạo sản phẩm
            </Button>
          </NavLink>,
        ]}
      />
      <Tables
        rowKey={(record) => record.id}
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={ProductsData}
      />
    </AdminContent>
  );
};

export default ProductsList;
