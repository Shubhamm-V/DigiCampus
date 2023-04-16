import { Row, Col, Menu } from "antd";
import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import CreateAttendance from "./CreateAttendance";
const ITEMS = [
  { key: "create_attendance", label: "Create Attendance" },
  { key: "view_attendance", label: "View Attendance" },
];
const Teacher = () => {
  const [checkMenu, setCheckMenu] = useState("create_attendance");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // to get screenwidht for managing responsiveness as screenwidht decrease or increase
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const onClick = (e) => {
    setCheckMenu(e.key);
    console.log("click ", e.key);
  };
  return (
    <Row gutter={[15]}>
      <Col span={5} sm={9} lg={5} xs={24}>
        <Menu
          onClick={onClick}
          mode={windowWidth <= 576 ? "horizontal" : "vertical"}
          items={ITEMS}
          className={classes.teacherMenu}
        />
      </Col>
      <Col
        span={19}
        sm={15}
        lg={19}
        xs={24}
      >
        {checkMenu === "create_attendance" && <CreateAttendance />}
        {checkMenu === "view_attendance" && <h2>view attendance</h2>}
      </Col>
    </Row>
  );
};

export default Teacher;
