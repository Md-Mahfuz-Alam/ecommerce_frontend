import React from "react";
import { Form, Select } from "antd";
import { ErrorMessage, useField, useFormikContext } from "formik";

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SingleSearchWithSelect = ({
  placeholder,
  options,
  label,
  name,
}: {
  placeholder: string;
  options: { label: string; value: string }[];
  label: string;
  name: string;
}) => {
  const [field] = useField(name);
  const formik = useFormikContext();

  return (
    <Form.Item label={label}>
      <Select
        {...field}
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(value) => {
          formik.setFieldValue(name, value);
        }}
        onSearch={onSearch}
        filterOption={filterOption}
        options={options}
      />
    </Form.Item>
  );
};

export default SingleSearchWithSelect;
