import { Form, Input } from "antd";
import { ErrorMessage, useField } from "formik";

export const InputField = ({
  label,
  name,
}: {
  label: string;
  name: string;
  value: string;
}) => {
  const [field] = useField({ name, type: "text" });

  return (
    <>
      <Form.Item label={label}>
        <Input {...field} />
      </Form.Item>
      <ErrorMessage name={name} component="div" />
    </>
  );
};
export const InputAreaField = ({
  label,
  name,
}: {
  label: string;
  name: string;
}) => {
  const [field] = useField({ name, type: "text" });

  return (
    <>
      <Form.Item label={label}>
        <Input.TextArea {...field} />
      </Form.Item>
    </>
  );
};
export const InputNumberField = ({
  label,
  name,
}: {
  label: string;
  name: string;
}) => {
  const [field] = useField({ name });

  return (
    <>
      <Form.Item label={label}>
        <Input type="number" {...field} min={0} style={{ width: "100%" }} />
      </Form.Item>
    </>
  );
};
