// CustomImageUpload.tsx
import React, { useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { useField, useFormikContext } from "formik";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface CustomImageUploadProps {
  name: string;
  label?: string;
  defaultFileList?: UploadFile[];
  onChange?: UploadProps["onChange"];
  onPreview?: (file: UploadFile) => void;
}

interface onChangeProps extends UploadProps {
  value: File;
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
  const formik = useFormikContext();

  const handleOnChange: onChangeProps["onChange"] = ({
    file,

    fileList: newFileList,
  }) => {
    if (file && !file.originFileObj) {
      setFileList(newFileList);
    } else {
      setFileList(newFileList);
      if (onChange) {
        onChange({ file, fileList: newFileList });
      }
    }
  };

  const handleOnPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
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
          onChange={(value) => {
            handleOnChange(value);
            formik.setFieldValue(name, value);
          }}
          onPreview={handleOnPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default ImageUpload;
