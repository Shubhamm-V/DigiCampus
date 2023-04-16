import { Row, Col, Button, Select } from "antd";
import React from "react";
import classes from "./index.module.scss";
import { QrReader } from "react-qr-reader";
import { useState } from "react";
const Student = () => {
  const [data, setData] = useState("");
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      console.log(startScan, loadingScan);
      // setPrecScan(scanData);
    }
  };
  const onSelectChange = (value) => {
    setSelected(value);
  };
  return (
    <Row>
      <Col span={24}>
        <Button
          type="primary"
          style={{ marginTop: "1rem", marginBottom: "1.5rem" }}
          onClick={() => setShowQR(true)}
        >
          Give Attendance
        </Button>
        {showQR && (
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col
              span={15}
              lg={15}
              sm={22}
              md={20}
              xs={24}
              className={classes.scanContainer}
            >
              <Select
                defaultValue={selected}
                className={classes.selectOptions}
                onChange={onSelectChange}
                style={{ marginBottom: "1.5rem" }}
                allowClear
                options={[
                  {
                    value: "environment",
                    label: "Back Camera",
                  },
                  {
                    value: "user",
                    label: "Front Camera",
                  },
                ]}
              />
              <QrReader
                constraints={{ facingMode: selected }}
                onScan={handleScan}
                onResult={(result, error) => {
                  if (!!result) {
                    setData(result?.text);
                  }
                }}
                style={{ width: "50%" }}
              />
              <p>{data}</p>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Student;
