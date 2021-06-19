import React, { useState, useEffect } from "react";
import callApi from "actions/common/callApi";
import {
  Table as Tables,
  Col,
  Row,
  PageHeader,
  Modal,
  Button,
  notification,
  Card,
} from "antd";
import AdminContent from "components/body/layout/AdminContent";
import { useHistory, useParams } from "react-router-dom";
const PAGE_SIZE = 10;

function UserForm() {
  let history = useHistory();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [DataListUser, setDataListUser] = useState([]);

  const fetchDataUser = () => {
    try {
      callApi(`api/users?limit=${PAGE_SIZE}&page=${page}`, {
        method: "GET",
      }).then(({ data, code, message }) => {
        if (data && code == 200) {
          setDataListUser(data.users || []);
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

  console.log("DataListUser", DataListUser);
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
      <Row gutter={[16, 16]}>
        {DataListUser &&
          DataListUser.map((item) => {
            if (item.id === id) {
              return (
                <Card size="small">
                  <Col md={12}>
                    <Row>
                      <Col md={4} xs={12}>
                        Họ và tên
                      </Col>
                      <Col md={4} xs={12}>
                        {item.fullname}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    <div className="avt-wrapper">
                      <img
                        className="img-uploaded"
                        src={
                          item.image ? item.image : "/images/default-avatar.jpg"
                        }
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
                </Card>
              );
            }
          })}
      </Row>
    </AdminContent>
  );
}

export default UserForm;
