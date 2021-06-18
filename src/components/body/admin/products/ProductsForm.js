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
  InputNumber,
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
    span: 24,
  },
  labelCol: {
    span: 24,
  },
};

const inputLayout = {
  wrapperCol: {
    span: 16,
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

  const handleChange = (info) => {
    setImage(info.fileList[0].originFileObj);
  };

  const handleSubmit = () => {
    const item = {
      productImg: image,
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
    } catch (error) {
      console.log("ProductForm -> handleSubmit :", error);
    }

    console.log("item", item);
  };

  return (
    <Row className="product-create">
      <Col md={1} xs={0}></Col>
      <Col md={22} xs={24}>
        <PageHeader
          className="site-page-header"
          title="Thêm sản phẩm mới"
          extra={[
            <Button type="primary" onClick={handleSubmit}>
              Lưu
            </Button>,
          ]}
        />
        <Form {...layout}>
          <Row gutter={[15, 0]}>
            <Col md={12} xs={24}>
              <Row gutter={[16, 16]}>
                <Col md={6}>
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

                <Col md={24}>
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
                <Col md={24} xs={24}>
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
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={(value) => setPriceProduct(value)}
                    />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item
                    label="Giá thoả thuận"
                    name="deal-price"
                    {...inputLayout}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={(value) => setDealProduct(value)}
                    />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item label="Số lượng" name="quantity" {...inputLayout}>
                    <Input
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item
                    label="Loại sản phẩm"
                    name="category"
                    {...inputLayout}
                  >
                    <Select onChange={(value) => setCategoryProduct(value)}>
                      <Option value={1}>hoa quả</Option>
                      <Option value={2}>rau củ</Option>
                      <Option value={3}>thực phẩm</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col md={12} xs={24}>
              <Row gutter={[16, 16]}>
                <Col md={24}>
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
                      style={{ height: "300px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default ProductsForm;
