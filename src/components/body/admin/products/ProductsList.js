import React, { useState, useEffect } from "react";
import { Col, Table, Tag, Space, Button, Row, Modal } from "antd";
import ProductsForm from "./ProductsForm";
import AdminContent from "components/body/layout/AdminContent";
import callApi from "actions/common/callApi";
const columns = [
  {
    title: "Ảnh sản phẩm",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Giá tiền",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Action",
    key: "status",
    dataIndex: "status",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    price: 32,
    content: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
    status: "Còn hàng",
  },
  {
    key: "2",
    name: "Jim Green",
    price: 42,
    content: "London No. 1 Lake Park",
    tags: ["loser"],
    status: "Hết hàng",
  },
  {
    key: "3",
    name: "Joe Black",
    price: 32,
    content: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
    status: "còn hàng",
  },
];

const ProductsList = () => {
  const [visible, setVisible] = useState(false);
  const [ProductsData, setProductsData] = useState();

  const fetchDataProducts = () => {
    return callApi("api/products?limit=10&page=1", { method: "GET" })
      .then(({ data, code, message }) => {
        if (data && code == 200) {
          setProductsData(data.products);
        }
      })
      .catch((error) => {
        console.log("error => fetchDataProducts", error);
      });
  };

  useEffect(() => {
    fetchDataProducts();
  }, []);

  return (
    <AdminContent>
      <Row gutter={[16, 32]} justify="end">
        <Button type="primary" onClick={() => setVisible(true)}>
          Tạo sản phẩm
        </Button>
      </Row>
      <Table columns={columns} dataSource={ProductsData} />
      <Modal visible={visible} width={1200} onCancel={() => setVisible(false)}>
        <ProductsForm />
      </Modal>
    </AdminContent>
  );
};

export default ProductsList;
