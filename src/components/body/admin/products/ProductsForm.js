import React, { useState, useEffect } from "react";
import callApi from "actions/common/callApi";
import { getCookie } from "actions/common/utils";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import AdminContent from "components/body/layout/AdminContent";
import { get } from "lodash";
import { UploadOutlined } from "@ant-design/icons";
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
  Image,
} from "antd";
import axios from "axios";

const { Option } = Select;
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
  labelCol: {
    span: 24,
  },
};
const fileList = [];

function ProductsForm(props) {
  let history = useHistory();
  const { id } = useParams();
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
  const [productDetail, setProductDetail] = useState();

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
        .post("http://localhost:3000/api/products", bodyFormData, config)
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
          if (data && code === 200) {
            setCategoryList(data || []);
          } else {
            notification.open({
              message: "Có lỗi xảy ra",
            });
          }
        }
      );
    } catch (error) {
      console.log("ProductsForm -> fetchCategoryList ", error);
    }
  };

  const fetchProductsDetail = () => {
    try {
      callApi(`api/products/${id}`, { method: "GET" }).then(
        ({ data, code, message }) => {
          if (data && code === 200) {
            setProductDetail(data || []);
            setName(data.name);
            setPrice(data.buying_price);
            setSellingPrice(data.selling_price);
            setQuantity(data.quantity);
            setCategoryId(data.category_id);
            setDescription(data.description);
          } else {
            notification.open({
              message: "Có lỗi xảy ra",
            });
          }
        }
      );
    } catch (error) {
      console.log("ProductsForm -> fetchCategoryList ", error);
    }
  };
  useEffect(() => {
    fetchCategoryList();
    if (id !== "" && id > 0) {
      fetchProductsDetail();
    }
  }, []);

  return (
    <AdminContent>
      <PageHeader
        className="site-page-header"
        title={id > 0 ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        extra={[
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Lưu
          </Button>,
        ]}
      />
      {id > 0 && productDetail ? (
        <Row gutter={[32, 16]}>
          <Col md={12} xs={24}>
            <Row gutter={[16, 16]}>
              <Image
                width={200}
                src={get(productDetail, "image", "đang cập nhật")}
              />
              <Col md={24} xs={24}>
                <Upload
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  <Button>Upload</Button>
                </Upload>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col md={6} xs={12}>
                Tên sản phẩm
              </Col>
              <Col md={18} xs={12}>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={get(productDetail, "name", "-")}
                />
              </Col>
              <Col md={6} xs={12}>
                Giá sản phẩm
              </Col>
              <Col md={18} xs={12}>
                <InputNumber
                  onChange={(value) => setPrice(value)}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  defaultValue={get(productDetail, "buying_price", "-")}
                />
              </Col>
              <Col md={6} xs={12}>
                Giá thỏa thuận
              </Col>
              <Col md={18} xs={12}>
                <InputNumber
                  onChange={(value) => setSellingPrice(value)}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  defaultValue={get(productDetail, "selling_price", "-")}
                />
              </Col>
              <Col md={6}>Số lượng</Col>
              <Col md={18}>
                <Input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  defaultValue={get(productDetail, "quantity", "-")}
                />
              </Col>
              <Col md={6}>Loại sản phẩm</Col>
              <Col md={18}>
                <Select
                  onChange={(value) => setCategoryId(value)}
                  defaultValue={get(productDetail, "category_id", "-")}
                  style={{ width: "100%" }}
                >
                  {CategoryList &&
                    CategoryList.length > 0 &&
                    CategoryList.map((item, index) => (
                      <Select.Option value={item.id} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col md={12} xs={24}>
            <Row gutter={[16, 16]}>
              <Col md={24}>
                <Form.Item label="Nội dung ngắn" {...tailLayout}>
                  <Input.TextArea
                    onChange={(e) => setDescription(e.target.innerHTML)}
                    defaultValue={get(productDetail, "description", "-")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row gutter={[32, 16]}>
          <Col md={12} xs={24}>
            <Row gutter={[16, 16]}>
              <Col md={6}>
                {/* <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                >
                  Image
                </Upload> */}
                <Upload
                  onChange={handleChange}
                  listType="picture"
                  defaultFileList={[...fileList]}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col md={6} xs={12}>
                Tên sản phẩm
              </Col>
              <Col md={18} xs={12}>
                <Input onChange={(e) => setName(e.target.value)} />
              </Col>
              <Col md={6} xs={12}>
                Giá sản phẩm
              </Col>
              <Col md={18} xs={12}>
                <InputNumber
                  onChange={(value) => setPrice(value)}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Col>
              <Col md={6} xs={12}>
                Giá thỏa thuận
              </Col>
              <Col md={18} xs={12}>
                <InputNumber
                  onChange={(value) => setSellingPrice(value)}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Col>
              <Col md={6}>Số lượng</Col>
              <Col md={18}>
                <Input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                />
              </Col>
              <Col md={6}>Loại sản phẩm</Col>
              <Col md={18}>
                <Select
                  onChange={(value) => setCategoryId(value)}
                  style={{ width: "100%" }}
                >
                  {CategoryList &&
                    CategoryList.length > 0 &&
                    CategoryList.map((item, index) => (
                      <Select.Option value={item.id} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
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
            </Row>
          </Col>
        </Row>
      )}
    </AdminContent>
  );
}

export default ProductsForm;
