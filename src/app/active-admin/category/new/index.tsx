import { Modal, Button, Input } from "antd";
import React from "react";
import { Formik, ErrorMessage } from "formik";
import styles from "./index.module.scss";
function CreateUpdateCategoriesModal({
  isOpen,
  onCancel,
  initialValues,
  handleSubmit,
  title,
}: CreateCategoriesModalProps) {
  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} footer={null} >
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMessage}
            />
            <div className={styles.button}>
              <Button type="primary" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {formik.isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

export default CreateUpdateCategoriesModal;
