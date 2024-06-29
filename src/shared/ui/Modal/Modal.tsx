import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleClickOutside = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={handleClickOutside}>
      <div className={styles.modalContent}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
