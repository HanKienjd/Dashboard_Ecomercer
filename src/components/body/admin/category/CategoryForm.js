import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { Button, Input, Card, Col, Row, notification } from "antd";
import AdminContent from "components/body/layout/AdminContent";
import callApi from "actions/common/callApi";
import { get } from "lodash";

const CategoryForm = () => {
  let history = useHistory();
  const { id } = useParams();

  const [DataCategory, setDataCategory] = useState();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (id !== "" && id > 0) {
      callApi(`api/categories/${id}`, { method: "PUT", data: data }).then(
        ({ data, code, message }) => {
          if (data && code == 204) {
            notification.open({
              description: "Thay đổi thành công",
            });
            history.push("/admin/category/list");
          } else {
            notification.open({
              description: "Có lỗi xảy ra",
            });
          }
        }
      );
    } else {
      callApi("api/categories", { method: "POST", data: data }).then(
        ({ data, code, message }) => {
          if (data && code == 201) {
            notification.open({
              description: "Tạo chuyên mục thành công",
            });
            history.push("/admin/category/list");
          } else {
            notification.open({
              description: "Có lỗi xảy ra",
            });
          }
        }
      );
    }
  };

  const fetchDataCategory = async () => {
    callApi(`api/categories/${id}`, { method: "GET" })
      .then(({ data, code, message }) => {
        setDataCategory(data);
      })
      .catch((error) => {
        console.log("Category -> fetchDataCategory ", error);
      });
  };

  useEffect(() => {
    if (id !== "" && id > 0) {
      fetchDataCategory();
    }
  }, []);

  console.log("id", id);
  return (
    <AdminContent>
      <Card title="Tạo chuyên mục" size="small">
        <Row gutter={[16, 16]}>
          <Col md={4} xs={12}>
            Tên chuyên mục
          </Col>
          <Col md={12} xs={24}>
            <Input
              {...register("name")}
              defaultValue={get(DataCategory, "name", "")}
            />
          </Col>
        </Row>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Card>
    </AdminContent>
  );
};
export default CategoryForm;
