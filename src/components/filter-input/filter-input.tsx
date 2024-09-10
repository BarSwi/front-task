import React from "react";
import styles from "./filter-input.module.scss";
import { FaSearch } from "react-icons/fa";

interface FilterInputProps {
  column: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, column: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  column,
  value,
  onChange,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder={`Search by ${
          column.charAt(0).toUpperCase() + column.slice(1)
        }`}
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
