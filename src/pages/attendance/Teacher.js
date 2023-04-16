import { Row, Col, Menu } from "antd";
import React, { useState } from "react";
import classes from './index.module.scss';
import CreateAttendance from "./CreateAttendance";
const ITEMS = [
  { key: "create_attendance", label: "Create Attendance" },
  { key: "view_attendance", label: "View Attendance" },
];
const Teacher = () => {
  const [checkMenu, setCheckMenu] = useState('create_attendance');
  const onClick = (e) => {
    setCheckMenu(e.key);
    console.log("click ", e.key);
  };
  return (
    <Row>
      <Col span={4}>
        <Menu onClick={onClick} mode="inline" items={ITEMS} className={classes.teacherMenu} />
      </Col>
      <Col span={20} style = {{paddingInline: '1.5rem'}}>
        {
          checkMenu === 'create_attendance' && <CreateAttendance/>
        }
        {
          checkMenu === 'view_attendance' && <h2>view attendance</h2>
        }
      </Col>
    </Row>
  );
};

export default Teacher;
