import React from "react";
import { Col, Row } from "antd";

import styles from "./index.module.scss";

function ActiveAdmin() {
  return (
    <div>
      <Row>
        <Col span={3}></Col>
        <Col span={21} className={styles.rightSide}></Col>
      </Row>
    </div>
  );
}

export default ActiveAdmin;
