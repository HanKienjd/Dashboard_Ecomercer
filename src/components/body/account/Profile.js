import React, { useState, useEffect } from "react";
import callApi from "actions/common/callApi";
import moment from "moment";
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
} from "antd";
import AdminContent from "components/body/layout/AdminContent";
import { useHistory, useParams } from "react-router-dom";
const PAGE_SIZE = 10;
const dateFormat = "DD/MM/YYYY";
function Profile() {
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [DataProfileUser, setProfileUser] = useState();

  const fetchDataUser = () => {
    try {
      callApi("api/me", {
        method: "GET",
      }).then(({ data, code, message }) => {
        if (data && code === 200) {
          setProfileUser(data || {});
        } else {
          notification.open({
            message: "có lỗi xảy ra",
          });
          history.goBack();
        }
      });
    } catch (error) {
      console.log("UserForm => fetchDataUser", error);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);

  console.log("DataProfileUser", DataProfileUser);
  return (
    <AdminContent>
      <PageHeader
        title="Thông tin người dùng"
        extra={[
          <Button key="1" type="primary">
            Lưu
          </Button>,
        ]}
      />
      <Card size="small">
        {DataProfileUser && (
          <Row gutter={[16, 20]}>
            <Col md={12} className="gutter-row">
              <Row gutter={[16, 16]} style={{ margin: "10px 0px 20px 0px" }}>
                <Col md={4} xs={12}>
                  Họ và tên
                </Col>
                <Col md={8} xs={12}>
                  <Input
                    defaultValue={DataProfileUser && DataProfileUser.full_name}
                  />
                </Col>

                <Col md={4} xs={12}>
                  Email
                </Col>
                <Col md={8} xs={12}>
                  <Input
                    defaultValue={DataProfileUser && DataProfileUser.email}
                  />
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ margin: "20px 0px" }}>
                <Col md={4} xs={12}>
                  Giới tính
                </Col>
                <Col md={8} xs={12}>
                  <Input
                    defaultValue={DataProfileUser && DataProfileUser.gender}
                  />
                </Col>
                <Col md={4} xs={12}>
                  Ngày sinh
                </Col>
                <Col md={8} xs={12}>
                  <DatePicker
                    defaultValue={moment(
                      DataProfileUser && DataProfileUser.date_of_birth,
                      dateFormat
                    )}
                    format={dateFormat}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ margin: "20px 0px" }}>
                <Col md={4} xs={24}>
                  Địa chỉ
                </Col>

                <Col md={20} xs={12}>
                  <Input
                    defaultValue={DataProfileUser && DataProfileUser.address}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={12} className="gutter-row">
              <div className="avt-wrapper">
                <img
                  className="img-uploaded"
                  src={
                    DataProfileUser && DataProfileUser.image
                      ? DataProfileUser.image
                      : "/images/default-avatar.jpg"
                  }
                  width={100}
                  // src={image ? `data:image/png;base64,${image}` : 'https://cf.shopee.vn/file/d6fe3aa81dc2f0f4938ad629afd347e7_tn'}
                  alt="not found"
                  // onError={(e) => this.onError(e)}
                />
                <button
                  className="btn btn-outline-info"
                  // onClick={(e) => this.fileInput.click()}
                >
                  Chọn ảnh
                </button>
                <input
                  type="file"
                  className="d-none"
                  accept=".jpg,.jpeg,.png"
                  // ref={(el) => (this.fileInput = el)}
                  // onChange={(e) => this.uploadImage(e)}
                />
                <p>Dụng lượng file tối đa 1 MB</p>
                <p>Định dạng file: .JPEG, .PNG</p>
              </div>
            </Col>
          </Row>
        )}
      </Card>
    </AdminContent>
  );
}

export default Profile;
