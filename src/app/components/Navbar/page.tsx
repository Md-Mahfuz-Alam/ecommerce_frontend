"use client";
import {
  Avatar,
  Col,
  Dropdown,
  Menu,
  MenuProps,
  Row,
  notification,
} from "antd";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
interface Category {
  id: number;
  name: any;
}

const Navbar = () => {
  
  const [categories, setCategories] = useState<Category[]>([]);


  const userAccountMenu: MenuProps["items"] = [
    {
      key: "account",
      label: <Link href="/user/edit">Account</Link>,
    },
    // {
    //   key: 'logout',
    //   label: <span onClick={handleLogout}>Logout</span>,
    // },
    
  ];
  useEffect(() => {
    const fetchCategories =  async () => {
      const response = await fetch("http://localhost:3000/api/v1/categories");
      const data = await response.json();
      console.log(data);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const menuItems = categories.map((category) => ({
    key: category.id, 
    label: (
        <Link href={category.name}>
          {category.name}
        </Link>
      ),
    
  }));
  //
  menuItems.push({
    key: categories.length+1,
    label:  (
        <Link href={'active-admin'}>
          Master
        </Link>
      ),
  })
  return (
    <div>
      <Row gutter={24} className={styles.appNavbar}>
        <Col span={2} className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Company Logo"
              width={60}
              height={30}
              priority={true}
            />
          </Link>
        </Col>
        <Col span={21}>
          <Menu
            className={styles.navbar}
            mode="horizontal"
            theme="dark"
            items={menuItems}
          />
        </Col>
        <Col span={1} className={styles.avatar}>
          <Dropdown
            overlayClassName={styles.accountMenu}
            menu={{ items: userAccountMenu }}
            placement="bottom"
            trigger={["click"]}
          >
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
