"use client";
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CreateUpdateCategoriesModal from "./new";
import axios from "axios";
import { initialValues } from "./new/formikHelper";

import styles from "./index.module.scss";

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
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] =
    useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState<DataType | null>(null);

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
  }, []);

  const handleCreateCategory = () => {
    setIsCreateCategoryModalOpen(true);
  };

  const handleCreate = async (formData: DataType) => {
    console.log("create is clicked");
    try {
      await axios.post("http://localhost:3000/api/v1/categories", formData);
    } catch (error) {
      console.log("Error creating category", error);
    }
    setIsCreateCategoryModalOpen(false);
  };

  const openEditCategoryModal = async (category: DataType) => {
    setCategoryId(category.id);
    setCategory(category);
    setIsUpdateCategoryModalOpen(true);
  };

  const handleUpdate = async (formData: DataType) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/categories/${categoryId}`,
        formData
      );
      setIsUpdateCategoryModalOpen(false);
    } catch (error) {
      console.error("Error Submitting Form", error);
    }
  };

  const openDeleteCategoryPop = () => {
    setIsDeleteConfirmationVisible(true);
  };

  const handleDeleteCategory = (category: DataType) => {
    const deleteCategory = async () => {
      try {
        await axios.delete(
          `http://localhost:3000/api/v1/categories/${category.id}`
        );
        const updatedCategories = categories.filter(
          (cat) => cat.id !== category.id
        );
        setCategories(updatedCategories);
        setIsDeleteConfirmationVisible(false);
      } catch (error) {
        console.error("Error in deleting category", error);
      }
    };

    return deleteCategory;
  };

  const data: DataType[] = categories.map((category) => ({
    key: category.id.toString(),
    id: category.id,
    name: category.name,
    action: (
      <div>
        <Button onClick={() => openEditCategoryModal(category)}>
          <EditOutlined />
        </Button>
        <Popconfirm
          title="Delete Category"
          placement="topRight"
          description="Are you sure to delete this category?"
          onConfirm={handleDeleteCategory(category)}
          okText="Yes"
          cancelText="Cancel"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={openDeleteCategoryPop}
          />
        </Popconfirm>
      </div>
    ),
  }));

  return (
    <div className={styles.category}>
      <Row>
        <Col span={14}>
          <h1>Categories</h1>
        </Col>
        <Col span={10}>
          <PlusOutlined
            onClick={handleCreateCategory}
            className={styles.createIcon}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
      <CreateUpdateCategoriesModal
        isOpen={isCreateCategoryModalOpen}
        onCancel={() => setIsCreateCategoryModalOpen(false)}
        initialValues={initialValues(null)}
        handleSubmit={handleCreate}
        title="Create New Category"
      />
      <CreateUpdateCategoriesModal
        isOpen={isUpdateCategoryModalOpen}
        onCancel={() => setIsUpdateCategoryModalOpen(false)}
        initialValues={category ? initialValues(category) : null}
        handleSubmit={handleUpdate}
        title="Edit Category"
      />
    </div>
  );
}

export default Category;
