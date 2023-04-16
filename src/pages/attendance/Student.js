import { Row, Col, Button } from "antd";
import React from "react";
import { QrReader } from "react-qr-reader";
import { useState } from "react";
const Student = () => {
  const [data, setData] = useState("No result");
  return (
    <Row>
      <Col span={24}>
        <Button type="primary" style={{ marginTop: "1rem" }}>
          Give Attendance
        </Button>
       <Row style={{display: 'flex', justifyContent: 'center'}}>
      <Col span = {15} lg = {15} sm = {22} md = {20} xs = {24}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "50%" }}
        />
        <p>{data}</p>
        </Col>
      </Row>
      </Col>

    </Row>
  );
};

export default Student;
