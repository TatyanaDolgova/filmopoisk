import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage/ui/HomePage';
import MoviePage from '../../pages/MoviePage/MoviePage';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
