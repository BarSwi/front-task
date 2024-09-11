import React, { useState } from "react";
import styles from "./table-component.module.scss";
import FilterInput from "../filter-input/filter-input";
import User from "../../types/user";
import { clearFilter, setFilter } from "../../redux/filters-slice";
import { FiltersState, tableColumns } from "../../types/filters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

// React.FC -> Defines props type (TypeScript safety). This note is purely for me to remember
const TableComponent: React.FC<{ users: User[] }> = ({ users }) => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);
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

  // I've decided to move this logic to redux becasue theoreticaly it could be used further in the application if it expands at some point.
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FiltersState
  ) => {
    dispatch(setFilter({ field, value: e.target.value }));
  };

  // This one on the other hand, I've decided to leave there locally, becasue it looks like something component specific so it should not be handled by global state
  const toggleInputVisibility = (field: keyof FiltersState) => {
    setVisibleInputs((prevState) => {
      //Logic looks complicated, but overall it's simply restoring specific column filter to it's default value after filter input disappears.
      const newVisibility = !prevState[field as keyof typeof prevState];
      if (!newVisibility) {
        dispatch(clearFilter(field));
      }
      return {
        ...prevState,
        [field]: newVisibility,
      };
    });
  };

  // In production or more compelx application this might be split into 2 components -> inputsWrapper and tableWrapper. But in that case no need to overcomplicate for simple task
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
