import React, { useState } from "react";
import styles from "./table-component.module.scss";
import FilterInput from "../filter-input/filter-input";
import User from "../../types/user";
import { setFilter } from "../../redux/filters-slice";
import {
  FilterInputProps,
  FiltersState,
  tableColumns,
} from "../../types/filters";

// React.FC -> Defines props type (TypeScript safety). This note is purely for me to remember
const TableComponent: React.FC<{ users: User[] }> = ({ users }) => {
  const [filters, setFilters] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const columns: tableColumns = ["name", "username", "email", "phone"];
  const [visibleInputs, setVisibleInputs] = useState({
    name: false,
    username: false,
    email: false,
    phone: false,
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.phone.toLowerCase().includes(filters.phone.toLowerCase())
  );

  //TODO: Refactor to redux
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FiltersState
  ) => {
    dispatch(setFilter({ field, value: e.target.value }));
  };

  const toggleInputVisibility = (field: string) => {
    setVisibleInputs((prevState) => {
      const newVisibility = !prevState[field as keyof typeof prevState];
      if (!newVisibility) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [field]: "",
        }));
      }
      return {
        ...prevState,
        [field]: newVisibility,
      };
    });
  };

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.inputsWrapper}>
        {columns.map(
          (column) =>
            visibleInputs[column] && (
              <div className={styles.searchInput}>
                <FilterInput
                  key={column}
                  column={column}
                  value={filters[column]}
                  onChange={handleFilterChange}
                />
              </div>
            )
        )}
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableRow}>
              <th onClick={() => toggleInputVisibility("name")}>Name</th>
              <th onClick={() => toggleInputVisibility("username")}>
                Username
              </th>
              <th onClick={() => toggleInputVisibility("email")}>Email</th>
              <th onClick={() => toggleInputVisibility("phone")}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={styles.tableRow}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
