import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import TableComponent from "./components/table/table-component";
import User from "./types/user";
import "./App.css";
import useFetchUsers from "./api/fetchUsers";

function App() {
  const { users, loading, error } = useFetchUsers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div id="container">
      <TableComponent users={users} />
    </div>
  );
}

export default App;
