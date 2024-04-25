'use client';
import React from "react";
import styles from "./index.module.scss";
import { Col, Row } from "antd";
import Button from "../Button";
import { useRouter } from "next/navigation";
const Sidemenu = () => {
  const router = useRouter();
  const handleDashboardClick = () => {
    console.log("Dashboard clicked");
  };

  return (
    <div>
      <Row>
        <Col span={24} className={styles.sidemenu}>
          <Button
            onClick={() => router.push(`active-admin/Dashboard`)}
            className={styles.button}
          >
            Dashboard
          </Button>
          <Button className={styles.button}>Category</Button>
          <Button className={styles.button}>Products</Button>
          <Button className={styles.button}>Users</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Sidemenu;
