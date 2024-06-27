import React, { useState } from 'react';
import AppRoutes from './routes';
import Header from '../shared/ui/Header/Header';
import './styles/index.module.css';
import LoginModal from '../entities/Auth/ui/LoginModal/LoginModal';
import { Provider } from 'react-redux';
import store from './providers/StoreProvider/store';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Provider store={store}>
      <Header onLoginClick={handleLoginClick} />
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
      <AppRoutes />
    </Provider>
  );
};

export default App;
