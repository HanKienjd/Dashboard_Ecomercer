import React, { useState, useEffect } from "react";
import callApi from "actions/common/callApi";
import { getCookie } from "actions/common/utils";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Upload,
  Form,
  Input,
  Button,
  Checkbox,
  PageHeader,
  Select,
  Spin,
  notification,
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
  let history = useHistory();
  //Get Data
  const accessToken = getCookie("_accessToken");
  const { handleSubmit, control, setValue } = useForm();
  const [CategoryList, setCategoryList] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [sellingPrice, setSellingPrice] = useState();
  const [categoryId, setCategoryId] = useState();

  const handleChange = ({ fileList: newFileList }) => {
    setImage(newFileList[0].originFileObj);
  };

  const onSubmit = (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append("productImg", image);
    bodyFormData.append("name", name);
    bodyFormData.append("status", 1);
    bodyFormData.append("buyingPrice", price);
    bodyFormData.append("sellingPrice", sellingPrice);
    bodyFormData.append("quantity", quantity);
    bodyFormData.append("description", description);
    bodyFormData.append("categoryId", categoryId);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + accessToken,
      },
    };
    try {
      axios
        .post("http://localhost:8001/api/products", bodyFormData, config)
        .then((response) => {
          if (response.status == 201) {
            notification.open({
              message: "Tạo thành công",
            });
            history.push("/admin/products/list");
          } else {
            notification.open({
              message: "Có lỗi xảy ra",
            });
          }
        });
    } catch (error) {
      console.log("ProductForm -> handleSubmit :", error);
    }
  };

  const fetchCategoryList = () => {
    try {
      callApi(`api/categories`, { method: "GET" }).then(
        ({ data, code, message }) => {
          setCategoryList(data || []);
        }
      );
    } catch (error) {
      console.log("ProductsForm -> fetchCategoryList ", error);
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <Row className="product-create">
      <Col md={1} xs={0}></Col>
      <Col md={22} xs={24}>
        <PageHeader
          className="site-page-header"
          title="Thêm sản phẩm mới"
          extra={[
            <Button type="primary" onClick={handleSubmit(onSubmit)}>
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
                    <Input onChange={(e) => setName(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item
                    label="Giá sản phẩm"
                    name="buyingPrice"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy điền giá sản phẩm",
                      },
                    ]}
                    {...inputLayout}
                  >
                    <InputNumber
                      onChange={(value) => setPrice(value)}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item label="Giá thoả thuận" {...inputLayout}>
                    <InputNumber
                      onChange={(value) => setSellingPrice(value)}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item label="Số lượng" {...inputLayout}>
                    <Input
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                    />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item
                    label="Loại sản phẩm"
                    name="category"
                    {...inputLayout}
                  >
                    <Select onChange={(value) => setCategoryId(value)}>
                      {CategoryList &&
                        CategoryList.length > 0 &&
                        CategoryList.map((item, index) => (
                          <Select.Option value={item.id} key={index}>
                            {item.name}
                          </Select.Option>
                        ))}
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
                      onChange={(e) => setDescription(e.target.innerHTML)}
                    />
                  </Form.Item>
                </Col>
                {/* <Col md={24} xs={24}>
                  <Form.Item label="Nội dung" {...tailLayout}>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Input.TextArea
                          size="large"
                          className="style-content"
                          {...field}
                          style={{ height: "300px" }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default ProductsForm;
