"use client";
import React from "react";
import styles from "./index.module.scss";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Sidemenu = () => {
  const router = useRouter();
  const handleLink=()=>{
  }

  return (
    <div>
      <Row>
        <Col span={24} className={styles.sidemenu}>
          <Link className={styles.link} onClick={handleLink} href={"/active-admin/dashboard"}>
            Dashboard
          </Link>
          <Link href={"/active-admin/category"} className={styles.link}>
            Category
          </Link>
          <Link href={"/active-admin/products"} className={styles.link}>
            Products
          </Link>
          <Link href={""} className={styles.link}>
            Users
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Sidemenu;
