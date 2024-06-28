import React, { useEffect, useState } from 'react';
import AppRoutes from './routes';
import Header from '../shared/ui/Header/Header';
import './styles/index.module.css';
import LoginModal from '../entities/Auth/ui/LoginModal/LoginModal';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../entities/Auth/model/slice';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Header onLoginClick={handleLoginClick} />
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
      <AppRoutes />
    </>
  );
};

export default App;
