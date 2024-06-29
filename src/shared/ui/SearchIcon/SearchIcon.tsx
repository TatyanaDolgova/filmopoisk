import React from "react";
import styles from './SearchIcon.module.css';

const SearchIcon: React.FC = () => {
  return (
    <svg
      className={styles.searchIcon}
      width="14.331543"
      height="14.333252"
      viewBox="0 0 14.3315 14.3333"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="icon"
        d="M0 6.83C0 10.6 3.06 13.66 6.83 13.66C10.6 13.66 13.66 10.6 13.66 6.83C13.66 3.06 10.6 0 6.83 0C3.06 0 0 3.06 0 6.83ZM1 6.83C1 3.62 3.61 1 6.83 1C10.05 1 12.66 3.62 12.66 6.83C12.66 10.04 10.05 12.66 6.83 12.66C3.61 12.66 1 10.04 1 6.83ZM13.48 14.18C13.58 14.28 13.7 14.33 13.83 14.33C13.96 14.33 14.08 14.28 14.18 14.18C14.37 13.99 14.37 13.67 14.18 13.48L12.85 12.14C12.65 11.95 12.34 11.95 12.14 12.14C11.95 12.34 11.95 12.65 12.14 12.85L13.48 14.18Z"
        fill="#999FA6"
        fillOpacity="1.000000"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default SearchIcon;
