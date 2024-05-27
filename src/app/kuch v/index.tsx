"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Image, Upload, Button, Input, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import {
  beforeUpload,
  getBase64,
} from "../components/FileUpload/helpers/fileUploadHelper";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function Page() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFetchProducts = async () => {
    const data = await fetch("http://localhost:3000/products");
    const products = await data.json();
    console.log(products);
  };

  const handlePreview = async (file: UploadFile) => {
    console.log(file.status);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("product[image]", fileList[0].originFileObj);
    }

    try {
      const response = await fetch("http://localhost:3000/products/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      message.success("Product created successfully!");
    } catch (error) {
      console.error("Error:", error);
      message.error("There was an error creating the product.");
    }
  };
  return (
    <Flex justify="center">
      <Button onClick={handleFetchProducts}> Get all products </Button>
      <form onSubmit={handleCreate}>
        Title: <Input type="text" name="product[title]" />
        <br />
        Description: <Input type="text" name="product[desc]" />
        <br />
        Price: <Input type="number" name="product[price]" />
        <br />
        Category: <Input type="text" name="product[category]" />
        <br /> <br />
        <Flex justify="center">
          <Upload
            name="product[image]"
            multiple={false} //TODO : fix for multiple
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
              alt="image"
            />
          )}
        </Flex>
        <Button htmlType="submit" className="w-full mt-4">
          Create
        </Button>
      </form>
    </Flex>
  );
}