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

function AdvantismentForm(props) {
  let history = useHistory();
  //Get Data
  const accessToken = getCookie("_accessToken");
  const { handleSubmit, control, setValue } = useForm();
  const [image, setImage] = useState();
  const [content, setContent] = useState("");

  const handleChange = ({ fileList: newFileList }) => {
    setImage(newFileList[0].originFileObj);
  };

  const onSubmit = (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append("advertisementImg", image);
    bodyFormData.append("content", content);
    bodyFormData.append("productId", 6);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + accessToken,
      },
    };
    try {
      axios
        .post("http://localhost:8001/api/advertisements", bodyFormData, config)
        .then((response) => {
          if (response.status == 201) {
            notification.open({
              message: "Tạo thành công",
            });
            history.push("/admin/advantisment/list");
          } else {
            notification.open({
              message: "Có lỗi xảy ra",
            });
          }
        });
    } catch (error) {
      console.log("AdvantismentForm -> handleSubmit :", error);
    }
  };

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
                label="Tên quảng cáo"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điển tên quảng cáo !",
                  },
                ]}
                {...inputLayout}
              >
                <Input onChange={(e) => setContent(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default AdvantismentForm;
