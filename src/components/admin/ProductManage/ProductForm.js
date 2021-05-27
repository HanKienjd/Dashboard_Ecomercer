import React, { useState } from "react";
import { Col, Table, Tag, Space, Button, Row, Modal } from "antd";
import ProductCreate from "./ProductCreate";
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
    title: "Thẻ",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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

const ProductForm = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="product-form col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <Row gutter={[16, 32]} justify="end">
        <Button type="primary" onClick={() => setVisible(true)}>
          Tạo sản phẩm
        </Button>
      </Row>
      <Table columns={columns} dataSource={data} />

      <Modal visible={visible} width={1200} onCancel={() => setVisible(false)}>
        <ProductCreate />
      </Modal>
    </div>
  );
};

export default ProductForm;
