import { Card } from "antd";
import styles from "./index.module.scss";
import Link from "next/link";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <h2>
            <Link href="">Active Admin</Link> / Dashboard
          </h2>
        </Card>
        <Card bordered={false}>
          <h3>
            Welcome to Active Admin. This is the default dashboard page. To add
            dashboard sections, checkout app/admin/dashboard.rb
          </h3>
        </Card>
        <h4>Powered by<Link href="">Active Admin</Link> 3.2.0</h4>
      </div>
    </div>
  );
}

export default Dashboard;
