import React, { useState, useEffect } from "react";
import callApi from "actions/common/callApi";
import { NavLink } from "react-router-dom";
import {
  Table as Tables,
  Col,
  Row,
  PageHeader,
  Modal,
  Button,
  notification,
} from "antd";
import AdminContent from "components/body/layout/AdminContent";
import { useHistory } from "react-router-dom";
const columns = [
  {
    title: "Tên người dùng",
    dataIndex: "full_name",
    key: "full_name",
    render: (value, row, index) => {
      return <NavLink to={"/admin/user/detail/" + row.id}>{value}</NavLink>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Vài trò",
    key: "role",
    dataIndex: "role",
  },
];

const PAGE_SIZE = 10;
function UserList() {
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [visible, setVisible] = useState(false);
  const [DataListUser, setDataListUser] = useState([]);
  const [rowId, setRowId] = useState();

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
        }
      });
    } catch (error) {
      console.log("UserList => fetchDataUser", error);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);

  const delDataItems = () => {
    try {
      callApi(`api/users/${rowId}`, { method: "DELETE" }).then(
        ({ data, code, message }) => {
          if (data && code === 204) {
            notification.open({
              message: "Xóa thành công",
            });
            fetchDataUser();
          }
        }
      );
    } catch (error) {
      console.log("CategoryList => delDataItems", error);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      handleRowSelection(selectedRows[0].id);
    },
  };

  const handleRowSelection = (value) => {
    setRowId(value);
    setShowButton(true);
  };

  console.log("DataListUser", DataListUser);
  return (
    <AdminContent>
      <PageHeader
        extra={[
          <Button type="primary" hidden={!showButton} onClick={delDataItems}>
            Xóa
          </Button>,
          <Button key="1" type="primary" onClick={() => setVisible(true)}>
            Tạo mới
          </Button>,
        ]}
      />
      <Tables
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={DataListUser}
      />
    </AdminContent>
  );
}

export default UserList;
