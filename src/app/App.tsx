import React from 'react';
import AppRoutes from './routes';
import StoreProvider from './providers/StoreProvider';
import Header from '../shared/ui/Header/Header';
import './styles/index.module.css';

const App: React.FC = () => (
  <StoreProvider>
    <Header />
    <AppRoutes />
  </StoreProvider>
);

export default App;
