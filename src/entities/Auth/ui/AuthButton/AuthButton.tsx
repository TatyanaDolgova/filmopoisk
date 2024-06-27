import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuthenticated } from '../../model/slice';
import styles from './AuthButton.module.css';
import classNames from 'classnames';

interface AuthButtonProps {
  onLoginClick: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.authButton}>
      {isAuthenticated ? (
        <div className={styles.container}>
          <div className={styles.person}></div>
          <button
            onClick={handleLogoutClick}
            className={classNames(styles.button, styles.buttonLogout)}
          >
            Выйти
          </button>
        </div>
      ) : (
        <button
          onClick={onLoginClick}
          className={classNames(styles.button, styles.buttonLogin)}
        >
          Войти
        </button>
      )}
    </div>
  );
};

export default AuthButton;
