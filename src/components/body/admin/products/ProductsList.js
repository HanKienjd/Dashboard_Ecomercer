import React, { useState, useEffect } from "react";
import { Table as Tables, Button, Modal, PageHeader, notification } from "antd";
import ProductsForm from "./ProductsForm";
import AdminContent from "components/body/layout/AdminContent";
import callApi from "actions/common/callApi";
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
  },
  {
    title: "Giá sale",
    dataIndex: "selling_price",
    key: "selling_price",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Nội dung",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Chuyên mục",
    key: "category_id",
    dataIndex: "category_id",
  },
];

const PAGE_SIZE = 10;
const ProductsList = () => {
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
          <Button type="primary" hidden={!showButton} onClick={delDataItems}>
            Xóa
          </Button>,
          <Button key="1" type="primary" onClick={() => setVisible(true)}>
            Tạo sản phẩm
          </Button>,
        ]}
      />
      <Tables
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={ProductsData}
      />
      <Modal
        visible={visible}
        width={1200}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <ProductsForm handleCancel={() => setVisible(false)} />
      </Modal>
    </AdminContent>
  );
};

export default ProductsList;
