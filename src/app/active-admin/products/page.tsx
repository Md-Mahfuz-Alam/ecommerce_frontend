"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./fetchProducts";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { initialValues } from "./AddEditForm/formikHelper";
import AddEditForm from "./AddEditForm";
import DisplayImages from "../../commonComponents/ShowImages/DisplayImages";
import axios from "axios";
import image from "../../../../public/images/New-Hd-Background-Images-Wallpaper-Free-Download-Wallpaperxyz.com-14.jpg";

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
    render: (images: string[]) => {
      return (
        <DisplayImages
          images={images && images.length > 0 ? images : [image.src]}
        />
      );
    },
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
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
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
    console.log(formData);
    try {
      if (product) {
        await axios.put(
          `http://localhost:3000/api/v1/products/${product.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/api/v1/products", formData);
      }
      setIsAddEditFormOpen(false);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const openEditProductModal = async (product: ProductType) => {
    setProduct(product);
    setIsAddEditFormOpen(true);
  };

  const handleDeleteProduct = (product: ProductType) => {
    const deleteCategory = async () => {
      try {
        await axios.delete(
          `http://localhost:3000/api/v1/products/${product.id}`
        );
        // const updatedProducts = products.filter((prod) => prod.id !== prod.id);
        // setProducts(updatedProducts);
      } catch (error) {
        console.error("Error in deleting category", error);
      }
    };

    return deleteCategory;
  };
  const openDeleteProductPopup = () => {
    setIsDeleteConfirmationVisible(true);
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
          title="Delete Product"
          placement="topRight"
          description="Are you sure to delete this Product?"
          onConfirm={handleDeleteProduct(product)}
          okText="Yes"
          cancelText="Cancel"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={openDeleteProductPopup}
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
