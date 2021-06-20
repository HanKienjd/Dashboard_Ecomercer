import React, { useState, useEffect } from "react";
import { Table as Tables, Button, Modal, PageHeader, notification } from "antd";
import AdvantismentForm from "./AdvantismentForm";
import AdminContent from "components/body/layout/AdminContent";
import callApi from "actions/common/callApi";
// import "./style.scss";
const columns = [
  {
    title: "Ảnh quảng cáo",
    dataIndex: "image",
    key: "image",
    render: (value, row, column) => {
      return <img src={value} alt="image" className="image-responsive" />;
    },
  },
  {
    title: "Tên quảng cáo",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Chuyên mục",
    dataIndex: "product_id",
    key: "product_id",
  },
];

const PAGE_SIZE = 10;
const AdvantismentList = () => {
  const [visible, setVisible] = useState(false);
  const [advantismentData, setAdvantismentData] = useState();
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [rowId, setRowId] = useState();

  const fetchAdvantisment = () => {
    return callApi(`api/advertisements?limit=${PAGE_SIZE}&page=${page}`, {
      method: "GET",
    })
      .then(({ data, code, message }) => {
        if (data && code == 200) {
          setAdvantismentData(data.advertisements);
        }
      })
      .catch((error) => {
        console.log("error => fetchAdvantisment", error);
      });
  };

  const delDataItems = () => {
    try {
      callApi(`api/advertisements/${rowId}`, { method: "DELETE" }).then(
        ({ data, code, message }) => {
          if (data && code === 204) {
            notification.open({
              message: "Xóa thành công",
            });
            fetchAdvantisment();
          }
        }
      );
    } catch (error) {
      console.log("advantismentList => delDataItems", error);
    }
  };

  useEffect(() => {
    fetchAdvantisment();
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      handleRowSelection(selectedRows[0].id);
    },
  };

  const handleRowSelection = (value) => {
    setRowId(value);
    setShowButton(true);
  };

  return (
    <AdminContent>
      <PageHeader
        extra={[
          <Button type="primary" hidden={!showButton} onClick={delDataItems}>
            Xóa
          </Button>,
          <Button key="1" type="primary" onClick={() => setVisible(true)}>
            Tạo quảng cáo
          </Button>,
        ]}
      />
      <Tables
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={advantismentData}
      />
      <Modal
        visible={visible}
        width={300}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AdvantismentForm handleCancel={() => setVisible(false)} />
      </Modal>
    </AdminContent>
  );
};

export default AdvantismentList;
