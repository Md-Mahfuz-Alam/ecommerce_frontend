import { Col, Row } from "antd";
import Sidemenu from "../components/Sidemenu";
import styles from "./index.module.scss";

export default function ActiveAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Row className={styles.activeAdminLayout}>
        <Col span={3}>
          <Sidemenu />
        </Col>
        <Col span={21}>{children}</Col>
      </Row>
    </div>
  );
}
