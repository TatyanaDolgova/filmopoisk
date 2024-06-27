import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { checkAuth, login } from '../../model/slice';
import Modal from '../../../../shared/ui/Modal/Modal';
import styles from './LoginModal.module.css';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    if (!username) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    if (!password) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    try {
      await dispatch(login({ username, password })).unwrap();
      dispatch(checkAuth());
      onClose();
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.loginModal}>
        <h2 className={styles.modalTitle}>Авторизация</h2>
        <label className={styles.label}>
          <span className={styles.required}>Логин</span>
          <input
            className={classNames(styles.input, {
              [styles.inputError]: usernameError,
            })}
            type="text"
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Логин"
            required
          />
          {usernameError && (
            <span className={styles.errorMsg}>Пожалуйста, введите логин</span>
          )}
        </label>
        <label className={styles.label}>
          <span className={styles.required}>Пароль</span>
          <input
            className={classNames(styles.input, {
              [styles.inputError]: passwordError,
            })}
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Пароль"
            required
          />
          {passwordError && (
            <span className={styles.errorMsg}>Пожалуйста, введите пароль</span>
          )}
        </label>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleLogin}
            className={classNames(styles.button, styles.buttonLogin)}
          >
            Войти
          </button>
          <button
            onClick={onClose}
            className={classNames(styles.button, styles.buttonLogout)}
          >
            Отменить
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
