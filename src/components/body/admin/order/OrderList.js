import React, { useState, useEffect } from "react";
import { Tables as Table, Button, Col, Row, Card } from "antd";
import callApi from "actions/common/callApi";
import AdminContent from "components/body/layout/AdminContent";
const PAGE_SIZE = 10;

function OrderList() {
  const [Page, setPage] = useState(1);
  const [DataOrder, setDataOrder] = useState([]);
  const fetchDataOrder = () => {
    callApi(`api/orders?limit=${PAGE_SIZE}&page=${Page}`, { method: "GET" })
      .then(({ data, code, message }) => {
        if (data && code === 200) {
          setDataOrder(data.orders || []);
        }
      })
      .catch((error) => {
        console.log("OrderList -> callApi", error);
      });
  };
  useEffect(() => {
    fetchDataOrder();
  }, []);
  return <AdminContent></AdminContent>;
}

export default OrderList;
