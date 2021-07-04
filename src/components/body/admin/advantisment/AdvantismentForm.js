import React, { useState, useEffect } from "react";
import { getCookie } from "actions/common/utils";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Upload,
  Input,
  Button,
  PageHeader,
  Select,
  notification,
} from "antd";
import axios from "axios";

const { Option } = Select;
const inputLayout = {
  wrapperCol: {
    span: 16,
  },
  labelCol: {
    span: 8,
  },
};
const PAGE_SIZE = 10;

function AdvantismentForm(props) {
  let history = useHistory();
  const { id, dataList, category } = props;
  //Get Data
  const accessToken = getCookie("_accessToken");
  const { handleSubmit, control, setValue } = useForm();
  const [image, setImage] = useState();
  const [content, setContent] = useState("");
  const [productId, setProductId] = useState();

  const handleChange = ({ fileList: newFileList }) => {
    setImage(newFileList[0].originFileObj);
  };

  const onSubmit = (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append("advertisementImg", image);
    bodyFormData.append("content", content);
    bodyFormData.append("productId", productId);

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
          title={id !== " " && id > 0 ? "Sửa quảng cáo" : "Thêm quảng cáo"}
          extra={[
            <Button type="primary" onClick={handleSubmit(onSubmit)}>
              Lưu
            </Button>,
          ]}
        />
        <Row gutter={[15, 0]}>
          {id !== " " && id > 0 ? (
            <>
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
              {dataList &&
                dataList.map((item) => {
                  if (item.id == id) {
                    return (
                      <Col md={18}>
                        <Row>
                          <Col md={8} xs={12}>
                            Tên quảng cáo
                          </Col>
                          <Col md={16} xs={12}>
                            {" "}
                            <Input
                              onChange={(e) => setContent(e.target.value)}
                              defaultValue={item.content}
                            />
                          </Col>
                        </Row>
                      </Col>
                    );
                  }
                })}
            </>
          ) : (
            <>
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

              <Col md={18}>
                <Row gutter={[16, 16]}>
                  <Col md={8} xs={12}>
                    Tên quảng cáo
                  </Col>
                  <Col md={16} xs={12}>
                    {" "}
                    <Input onChange={(e) => setContent(e.target.value)} />
                  </Col>
                  <Col md={8} xs={12}>
                    Chuyên mục
                  </Col>
                  <Col md={16} xs={12}>
                    {" "}
                    <Select
                      onChange={(value) => setProductId(value)}
                      style={{ width: "100%" }}
                    >
                      {category &&
                        category.map((item) => (
                          <Select.Option value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
}

export default AdvantismentForm;
