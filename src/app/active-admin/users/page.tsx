"use client"
import axios from "axios";
import { useEffect, useState } from "react";
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
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  // {
  //     title: "Images",
  //     dataIndex: "images",
  //     key: "images",
  //     render: (images: string[]) => {
  //       return (
  //         <DisplayImages
  //           images={images && images.length > 0 ? images : [image.src]}
  //         />
  //       );
  //     },
  //   },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_: any, record: any) => record.action,
  },
];
const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users`);
        setUsers(response?.data);
      } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1>MAhfuz</h1>
      {users}
    </>
  );
};

export default Users;
