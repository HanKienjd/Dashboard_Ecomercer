import React, { useState, useEffect } from "react";
import { Tables as Table, Button, Col, Row, Card } from "antd";
import callApi from "actions/common/callApi";
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
  return <div></div>;
}

export default OrderList;
