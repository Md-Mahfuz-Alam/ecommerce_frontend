import SingleSearchWithSelect from "@/app/commonComponents/SingleSearchWithSelect";
import {
  InputAreaField,
  InputField,
  InputNumberField,
} from "@/app/commonComponents/commonFields";
import { Button, Col, Modal, Row } from "antd";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { fetchCategoriesData } from "./fetchCategories";
import styles from "./index.module.scss";
import ImageUpload from "@/app/commonComponents/ImageUpload/ImageUpload";

function AddEditForm({
  isOpen,
  onCancel,
  title,
  handleSubmit,
  initialValues,
}: ModalType) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const categoriesData = await fetchCategoriesData();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      title={title}
      width={800}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={{}}
        enableReinitialize
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className={styles.form}>
            <Row>
              <Col span={24}>
                <InputField
                  name="name"
                  label="Name"
                  value={formik.values.name}
                />
                <InputAreaField name="description" label="Description" />
                <InputNumberField name="price" label="Price" />
                <InputNumberField name="quantity_available" label="Quantity" />
                <SingleSearchWithSelect
                  placeholder="Select a Category"
                  options={categoryOptions}
                  label="Category"
                  name="category_id"
                />
                <ImageUpload label="Upload File" name="images" />
              </Col>
              <Col span={24}></Col>
            </Row>
            <div className={styles.buttons}>
              <Button type="primary" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {formik.isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default AddEditForm;
