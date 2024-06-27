import React from 'react';
import styles from './Header.module.css';
import AuthButton from '../../../entities/Auth/ui/AuthButton/AuthButton';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Фильмопоиск</h1>
      <AuthButton onLoginClick={onLoginClick} />
    </header>
  );
};

export default Header;
