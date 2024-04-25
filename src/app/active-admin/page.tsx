import React from "react";
import styles from "./index.module.scss";
import { Col, Row } from "antd";
import Category from "./category/page";
import Dashboard from "./Dashboard/page";

function ActiveAdmin() {
  return (
    <div>
      <Row>
        <Col span={3}></Col>
        <Col span={21} className={styles.rightSide}>
          <Dashboard />
          <Category />
        </Col>
      </Row>
    </div>
  );
}

export default ActiveAdmin;
