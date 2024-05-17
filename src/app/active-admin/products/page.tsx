"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./fetchProducts";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { initialValues } from "./AddEditForm/formikHelper";
import AddEditForm from "./AddEditForm";
import DisplayImages from "../../commonComponents/ShowImages/DisplayImages";
import axios from "axios";

import styles from "./index.module.scss";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quant Avail",
    dataIndex: "quantity_available",
    key: "quantity_available",
  },
  {
    title: "Seller",
    dataIndex: "seller_username",
    key: "seller_username",
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category_name",
  },
  {
    title: "Images",
    dataIndex: "images",
    key: "images",
    render: (images: string[]) => <DisplayImages images={images} />,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_: any, record: any) => record.action,
  },
];

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType>();
  const [isAddEditFormOpen, setIsAddEditFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreateUpdate = async (formData: ProductType) => {
    if (product) {
      console.log(product)
      try {
        await axios.put(
          `http://localhost:3000/api/v1/products/${product.id}`,
          formData
        );
        setIsAddEditFormOpen(false);
      } catch (error) {
        console.log("Error creating category", error);
      }
    } else {
      try {
        const seller_id = 1;
        formData = { ...formData, seller_id };
        await axios.post("http://localhost:3000/api/v1/products", formData);
        setIsAddEditFormOpen(false);
      } catch (error) {
        console.log("Error creating category", error);
      }
    }
  };

  const openEditProductModal = async (product: ProductType) => {
    setProduct(product);
    setIsAddEditFormOpen(true);
  };

  const data = products.map((product) => ({
    key: product.id.toString(),
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity_available: product.quantity_available,
    seller_username: product.seller.username,
    category_name: product.category.name,
    images: product?.images,
    action: (
      <div>
        <Button onClick={() => openEditProductModal(product)}>
          <EditOutlined />
        </Button>
        <Popconfirm
          title="Delete Category"
          placement="topRight"
          description="Are you sure to delete this category?"
          // onConfirm={handleDeleteCategory(category)}
          okText="Yes"
          cancelText="Cancel"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            // onClick={openDeleteCategoryPop}
          />
        </Popconfirm>
      </div>
    ),
  }));

  return (
    <div>
      <Row className={styles.products}>
        <Col span={14}>
          <h1>Products</h1>
        </Col>
        <Col span={10}>
          <PlusOutlined
            onClick={() => setIsAddEditFormOpen(true)}
            className={styles.createIcon}
          />
        </Col>
      </Row>

      <Table columns={columns} dataSource={data} />
      <AddEditForm
        isOpen={isAddEditFormOpen}
        onCancel={() => setIsAddEditFormOpen(false)}
        title="Add new Product"
        handleSubmit={handleCreateUpdate}
        initialValues={initialValues(product)}
      />
    </div>
  );
};

export default Products;
