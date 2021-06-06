import React, { useState, useEffect } from "react";
import callApi from "actions/common/callApi";
import { getCookie } from "actions/common/utils";

import {
  Row,
  Col,
  Upload,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  PageHeader,
  Select,
  Spin,
} from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 21,
  },
  labelCol: {
    span: 3,
  },
};

const inputLayout = {
  wrapperCol: {
    span: 18,
  },
  labelCol: {
    span: 6,
  },
};

function ProductsForm(props) {
  //Get Data
  const accessToken = getCookie("_accessToken");

  const [image, setImage] = useState();
  const [nameProduct, setNameProduct] = useState();
  const [priceProduct, setPriceProduct] = useState();
  const [dealProduct, setDealProduct] = useState();
  const [categoryProduct, setCategoryProduct] = useState();
  const [Quantity, setQuantity] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (info) => {
    setImage(info.fileList[0].originFileObj);
  };

  const handleSubmit = () => {
    const item = {
      name: nameProduct,
      buyingPrice: priceProduct,
      sellingPrice: dealProduct,
      description: description,
      categoryId: categoryProduct,
      quantity: Quantity,
    };
    try {
      axios({
        url: "http://localhost:3000/api/products",
        method: "POST",
        header: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer" + accessToken,
        },
        data: item,
      }).then((response) => {
        console.log("response", response);
      });
    } catch (error) {}

    // callApi("api/products", {
    //   method: "POST",
    //   data: item,
    //   header: { "Content-Type": "multipart/form-data" },
    // }).then(({ data, code, message }) => {
    //   console.log("message", message);
    // });

    console.log("item", item);
  };
  console.log("accessToken", accessToken);

  console.log("description", description);
  return (
    <Row className="product-create">
      <Col md={1} xs={0}></Col>
      <Col md={22} xs={24}>
        <PageHeader className="site-page-header" title="Thêm mới sản phẩm" />
        <Form {...layout}>
          <Row gutter={[15, 0]}>
            <Col md={24} xs={24}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleChange}
              >
                Image
              </Upload>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tên Sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điển tên sản phẩm !",
                  },
                ]}
                {...inputLayout}
              >
                <Input onChange={(e) => setNameProduct(e.target.value)} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Giá sản phẩm"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền giá sản phẩm",
                  },
                ]}
                {...inputLayout}
              >
                <Input
                  type="number"
                  onChange={(e) => setPriceProduct(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Giá thoả thuận"
                name="deal-price"
                {...inputLayout}
              >
                <Input
                  type="number"
                  onChange={(e) => setDealProduct(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Số lượng" name="quantity" {...inputLayout}>
                <Input
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Loại sản phẩm" name="category" {...inputLayout}>
                <Select onChange={(value) => setCategoryProduct(value)}>
                  <Option value={1}>hoa quả</Option>
                  <Option value={2}>rau củ</Option>
                  <Option value={3}>thực phẩm</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item label="Nội dung ngắn" {...tailLayout}>
                <Input.TextArea
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item label="Nội dung" {...tailLayout}>
                <Input.TextArea
                  size="large"
                  className="style-content"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={props.handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ProductsForm;
