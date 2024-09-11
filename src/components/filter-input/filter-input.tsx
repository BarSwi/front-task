import React from "react";
import styles from "./filter-input.module.scss";
import { FaSearch } from "react-icons/fa";
import { FilterInputProps } from "../../types/filters";

const FilterInput: React.FC<FilterInputProps> = ({
  column,
  value,
  onChange,
}) => {
  const capitalizedColumn = column.charAt(0).toUpperCase() + column.slice(1);

  //aria-labels are not very usefull there but I just wanted to quickly showcase that I am aware of overall aria tags and some SEO practices
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder={`Search by ${capitalizedColumn}`}
        aria-label={`Search by ${capitalizedColumn}`}
        value={value}
        onChange={(e) => onChange(e, column)}
        className={styles.searchInput}
      />
      <span className={styles.icon}>
        <FaSearch />
      </span>
    </div>
  );
};

export default FilterInput;
