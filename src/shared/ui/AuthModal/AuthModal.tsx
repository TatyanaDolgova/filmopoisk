import ReactDOM from 'react-dom';
import styles from './AuthModal.module.css';

const AuthModal: React.FC = ({ children }) => {
  const modalRoot = document.getElementById('modal-root')!;

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>{children}</div>
    </div>,
    modalRoot
  );
};

export default AuthModal;
