import React from 'react';
import styles from './DropDownArrow.module.css';

interface DropDownArrowProps {
  isOpen: boolean;
}

const DropDownArrow: React.FC<DropDownArrowProps> = ({ isOpen }) => {
  return (
    <svg
      className={`${isOpen ? styles.rotate : ''}`}
      width="17.916748"
      height="17.916687"
      viewBox="0 0 17.9167 17.9167"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="icon"
        d="M6.45 17.91L11.45 17.91C15.98 17.91 17.91 15.98 17.91 11.45L17.91 6.45C17.91 1.93 15.98 0 11.45 0L6.45 0C1.93 0 0 1.93 0 6.45L0 11.45C0 15.98 1.93 17.91 6.45 17.91ZM1.25 6.45C1.25 2.61 2.61 1.25 6.45 1.25L11.45 1.25C15.3 1.25 16.66 2.61 16.66 6.45L16.66 11.45C16.66 15.3 15.3 16.66 11.45 16.66L6.45 16.66C2.61 16.66 1.25 15.3 1.25 11.45L1.25 6.45ZM8.51 11.2C8.64 11.32 8.8 11.38 8.95 11.38C9.11 11.38 9.27 11.32 9.39 11.2L12.34 8.25C12.58 8.01 12.58 7.61 12.34 7.37C12.1 7.13 11.7 7.13 11.45 7.37L8.95 9.87L6.45 7.37C6.21 7.13 5.81 7.13 5.57 7.37C5.33 7.61 5.33 8.01 5.57 8.25L8.51 11.2Z"
        fill="#999FA6"
        fillOpacity="1.000000"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default DropDownArrow;
