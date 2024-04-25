"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import Sidemenu from "@/app/components/Sidemenu";

interface DataType {
  key: string;
  id: string;
  name: string;
  action: JSX.Element;
}

const columns: ColumnsType<any> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => record.action,
  },
];

function Category() {
  const [categories, setCategories] = useState<DataType[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [categories]);

  const isModalVisible = () => {
    setIsFormOpen(true);
  };

  const data: DataType[] = categories.map((category) => ({
    key: category.id.toString(),
    id: category.id,
    name: category.name,
    action: (
      <div>
        <Button onClick={isModalVisible}>
          <EditOutlined />
        </Button>
      </div>
    ),
  }));

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Basic Modal"
        open={isFormOpen}
        onCancel={() => setIsFormOpen(false)}
      >
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default Category;
