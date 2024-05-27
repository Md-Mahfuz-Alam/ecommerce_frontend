"use client";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./index.module.scss";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  // {
  //     title: "Images",
  //     dataIndex: "images",
  //     key: "images",
  //     render: (images: string[]) => {
  //       return (
  //         <DisplayImages
  //           images={images && images.length > 0 ? images : [image.src]}
  //         />
  //       );
  //     },
  //   },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_: any, record: any) => record.action,
  },
];
const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users`);
        setUsers(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
      }
    };
    fetchUsers();
  }, []);
  const data = users.map((user) => ({
    key: user.id.toString(),
    id: user.id,
    username: user.username,
    role: user.role,
    action: (
      <div>
        <Button onClick={() => {}}>
          <EditOutlined />
        </Button>
        <Popconfirm
          title="Delete User"
          placement="topRight"
          description="Are you sure to delete this user?"
          onConfirm={() => {}}
          okText="Yes"
          cancelText="Cancel"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {}}
          />
        </Popconfirm>
      </div>
    ),
  }));

  return (
    <div>
      <Row className={styles.users}>
        <Col span={14}>
          <h1>Users</h1>
        </Col>
        <Col span={10}>
          <PlusOutlined onClick={() => {}} className={styles.createIcon} />
        </Col>
      </Row>

      <Table columns={columns} dataSource={data} />
      {/* <AddEditForm
        isOpen={isAddEditFormOpen}
        onCancel={() => setIsAddEditFormOpen(false)}
        title="Add new Product"
        handleSubmit={handleCreateUpdate}
        initialValues={initialValues(product)}
      /> */}
    </div>
  );
};

export default Users;
