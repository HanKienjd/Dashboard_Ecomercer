import React, { useState, useEffect } from "react";
import callApi from "actions/common/callApi";
import moment from "moment";
import { getCookie } from "actions/common/utils";
import "./styles/Profile.scss";
import { UploadOutlined } from "@ant-design/icons";
import {
  Table as Tables,
  Col,
  Row,
  PageHeader,
  Modal,
  Button,
  notification,
  Card,
  Input,
  DatePicker,
  Select,
  Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import AdminContent from "components/body/layout/AdminContent";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const PAGE_SIZE = 10;
const dateFormat = "YYYY/MM/DD";

function Profile() {
  let history = useHistory();
  const accessToken = getCookie("_accessToken");
  const [page, setPage] = useState(1);
  const [DataProfileUser, setProfileUser] = useState();
  const [fileList, setFileList] = useState([]);
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [dateBirthday, setDateBirthday] = useState();
  const [address, setAddress] = useState();
  const [avatar, setAvatar] = useState();
  const [imageAvatar, setImageAvatar] = useState();

  const onChange = ({ fileList: newFileList }) => {
    console.log("newFileList", newFileList);
    setFileList(newFileList);
    setAvatar(newFileList[0].originFileObj);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const fetchDataUser = () => {
    try {
      callApi("api/me", {
        method: "GET",
      }).then(({ data, code, message }) => {
        if (data && code === 200) {
          setProfileUser(data || {});
          setImageAvatar(data && data.image);
        } else {
          notification.open({
            message: "c?? l???i x???y ra",
          });
          // history.goBack();
        }
      });
    } catch (error) {
      console.log("UserForm => fetchDataUser", error);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);

  const handleSubmit = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("userImg", avatar);
    bodyFormData.append("fullName", fullName);
    bodyFormData.append("address", address);
    bodyFormData.append("dateOfBirth", dateBirthday);
    bodyFormData.append("gender", gender);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + accessToken,
      },
    };
    try {
      axios
        .put("http://localhost:8001/api/users", bodyFormData, config)
        .then((response) => {
          console.log("response", response);
          if (response.status === 204) {
            notification.open({
              message: "T???o th??nh c??ng",
            });
          } else {
            notification.open({
              message: "C?? l???i x???y ra",
            });
          }
        });
    } catch (error) {
      console.log("Profile -> handleSubmit :", error);
    }
  };

  console.log("dateBirthday", dateBirthday);

  return (
    <AdminContent>
      <PageHeader
        title="Th??ng tin ng?????i d??ng"
        extra={[
          <Button key="1" type="primary" onClick={handleSubmit}>
            L??u
          </Button>,
        ]}
      />

      {DataProfileUser && (
        <Card size="small">
          <Row>
            <Col md={12}>
              <Row>
                <Col md={12}></Col>
                <Col md={10}>
                  <div className="avt-wrapper">
                    <img
                      className="img-uploaded"
                      src={
                        (DataProfileUser && DataProfileUser.image) ||
                        "/images/default-avatar.jpg"
                      }
                    />

                    <ImgCrop rotate>
                      <Upload
                        // listType="picture-card"
                        actions="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                      >
                        <Button icon={<UploadOutlined />}>
                          {fileList.length < 1 && "Ch???n ???nh"}
                        </Button>
                      </Upload>
                    </ImgCrop>
                    <p>D???ng l?????ng file t???i ??a 1 MB</p>
                    <p>?????nh d???ng file: .JPEG, .PNG</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={4} xs={12} className="gutter-row">
                  H??? v?? t??n
                </Col>
                <Col md={8} xs={12} className="gutter-row">
                  <Input
                    onChange={(event) => setFullName(event.target.value)}
                    defaultValue={DataProfileUser && DataProfileUser.full_name}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4} xs={12}>
                  Gi???i t??nh
                </Col>
                <Col md={8} xs={12}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => setGender(value)}
                    defaultValue={DataProfileUser && DataProfileUser.gender}
                  >
                    <Select.Option value="1">Nam</Select.Option>
                    <Select.Option value="2">N???</Select.Option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col md={4} xs={12}>
                  Ng??y sinh
                </Col>
                <Col md={8} xs={12}>
                  <DatePicker
                    defaultValue={moment(
                      DataProfileUser && DataProfileUser.date_of_birth,
                      dateFormat
                    )}
                    onChange={(date, dateString) => setDateBirthday(dateString)}
                    format={dateFormat}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4} xs={24}>
                  ?????a ch???
                </Col>

                <Col md={8} xs={12}>
                  <Input
                    onChange={(event) => setAddress(event.target.value)}
                    defaultValue={DataProfileUser && DataProfileUser.address}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}
    </AdminContent>
  );
}

export default Profile;
