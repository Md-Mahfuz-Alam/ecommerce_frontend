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

  const handleOnChange: UploadProps["onChange"] = async ({
    file,
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    
    // Convert files to blobs and set in Formik
    const blobs = await Promise.all(newFileList.map(file => toBlob(file)));
    setFieldValue(name, blobs);

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

  const toBlob = (file: UploadFile): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file.originFileObj as File);
      reader.onload = () => {
        if (reader.result) {
          resolve(new Blob([reader.result]));
        } else {
          reject(new Error("File reading failed"));
        }
      };
      reader.onerror = () => reject(new Error("File reading failed"));
    });
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
