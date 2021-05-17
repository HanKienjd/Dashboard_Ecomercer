import React from "react";
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
} from "antd";

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

function ProductCreate(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row className="product-create">
      <Col md={1} xs={0}></Col>
      <Col md={22} xs={24}>
        <PageHeader className="site-page-header" title="Thêm mới sản phẩm" />

        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={[15, 0]}>
            <Col md={24} xs={24}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
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
                <Input />
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
                <Input.Password />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Giá thoả thuận"
                name="deal-price"
                {...inputLayout}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Loại sản phẩm" name="category" {...inputLayout}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item label="Nội dung ngắn" {...tailLayout}>
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item label="Nội dung" {...tailLayout}>
                <Input.TextArea size="large" className="style-content" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default ProductCreate;
