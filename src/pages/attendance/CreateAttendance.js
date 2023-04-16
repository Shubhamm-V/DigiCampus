import React, { useEffect, useState } from "react";
import { Col, Row, Form, Input, Button, Modal } from "antd";
import QRCode from "react-qr-code";

import classes from "./index.module.scss";
const CreateAttendance = () => {
  const [value, setValue] = useState("");
  const [isQRVisible, setQRVisible] = useState(false);
  const onFinish = (values) => {
    // setValue(values);
    setQRVisible(true);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setTimeout(() => {
      setValue((prevState) => prevState + 1);
    }, 20000);
  }, [value]);

  return (
    <Row style={{ padding: "0.5rem 0.2rem" }} gutter={[5]}>
      <Col
        span={24}
        className={classes.createFormContainer}
        style={{ paddingInline: "0.5rem" }}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[20]}>
            <Col span={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Subject Name"
                name="subject"
                placeholder="Plese Enter Subject Name"
                rules={[
                  {
                    required: true,
                    message: "Please input subject name!",
                  },
                ]}
              >
                <Input placeholder="Please Enter Subject Name  " />
              </Form.Item>
            </Col>

            <Col span={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Branch Name"
                name="branch"
                rules={[
                  {
                    required: true,
                    message: "Please input branch name!",
                  },
                ]}
              >
                <Input placeholder="Please Enter Branch Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20]}>
            <Col span={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Total Students"
                name="total_students"
                rules={[
                  {
                    required: true,
                    message: "Please enter total students!",
                  },
                ]}
              >
                <Input placeholder="Please Enter Total Students" />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ display: "flex", justifyContent: "flex-end" }}>
            <Col span={4} xl={4} lg={5} md={6} sm={8} xs={12}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "95%",
                    marginRight: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <Modal
        open={isQRVisible}
        footer={false}
        centered
        className={classes.qrModal}
        bodyStyle={{
          backgroundColor: "#393e46",
          maxHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          padding: "1.5rem 0",
        }}
        onCancel={() => setQRVisible(false)}
      >
        <QRCode
          title="GeeksForGeeks"
          value={value}
          bgColor={"#fff"}
          fgColor={"#000"}
        />
      </Modal>
    </Row>
  );
};

export default CreateAttendance;
