/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { withRouter, NavLink } from "react-router-dom";
import AdminContent from "components/body/layout/AdminContent";
import { Table, Button, PageHeader, notification, Spin } from "antd";
import callApi from "actions/common/callApi";

const columns = [
  {
    title: "Mã chuyên mục",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên chuyên mục",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
];

const QuestionList = (props) => {
  const [DataListCategory, setDataListCategory] = useState();
  const [showButton, setShowButton] = useState(false);
  const [RowId, setRowId] = useState();
  const [loading, setLoading] = useState(false);

  const fetchDataCategory = async () => {
    try {
      callApi("api/categories", { method: "GET" }).then(
        ({ data, code, message }) => {
          if (data && code === 200) {
            setDataListCategory(data);
          }
        }
      );
    } catch (error) {}
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);

  const delDataItems = () => {
    setLoading(true);
    try {
      callApi(`api/categories/${RowId}`, { method: "DELETE" }).then(
        ({ data, code, message }) => {
          setLoading(false);
          if (data && code === 204) {
            notification.open({
              message: "Xóa thành công",
            });
            fetchDataCategory();
          }
        }
      );
    } catch (error) {
      setLoading(false);
      console.log("CategoryList => delDataItems", error);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let row = selectedRows[0];
      handleRowSelection(row.id);
    },
  };
  const handleRowSelection = (id) => {
    setRowId(id);
    setShowButton(true);
  };

  return (
    <AdminContent>
      <Spin spinning={loading}>
        <PageHeader
          title="Danh sách chuyên mục"
          extra={[
            <Button type="primary" hidden={!showButton} onClick={delDataItems}>
              Xóa
            </Button>,
            <NavLink to={`/admin/category/edit/${RowId}`}>
              <Button type="primary" hidden={!showButton}>
                Sửa
              </Button>
            </NavLink>,

            <NavLink to="/admin/category/create">
              <Button key="1" type="primary">
                Tạo chuyên mục
              </Button>
            </NavLink>,
          ]}
        />
        <Table
          rowKey={(record) => record.id}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={DataListCategory}
        />
      </Spin>
    </AdminContent>
  );
};

export default withRouter(QuestionList);
