import React, { useState } from "react";
import { Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { useField, useFormikContext } from "formik";

interface CustomImageUploadProps {
  name: string;
  label?: string;
  defaultFileList?: UploadFile[];
  onChange?: UploadProps["onChange"];
  onPreview?: (file: UploadFile) => void;
}

const ImageUpload: React.FC<CustomImageUploadProps> = ({
  name,
  label,
  defaultFileList = [],
  onChange,
  onPreview,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleOnChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    setFieldValue(
      name,
      newFileList.map((file) => file)
    );
    if (onChange) {
      onChange({ file, fileList: newFileList });
    }
  };

  const handleOnPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
    if (onPreview) {
      onPreview(file);
    }
  };

  return (
    <div>
      {label && <div>{label}</div>}
      <ImgCrop rotationSlider>
        <Upload
          {...field}
          listType="picture-card"
          fileList={fileList}
          onChange={handleOnChange}
          onPreview={handleOnPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default ImageUpload;
