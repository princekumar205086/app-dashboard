"use client";
import React from "react";
import Layout from "../sidenav/layout";
import { Typography } from "@mui/material";
import UserList from "./userList";

export default function Users() {
  return (
    <Layout>
      <Typography className="font-semibold" variant="h5">
        <p>Users</p>
        <UserList />
      </Typography>
    </Layout>
  );
}
