import React from 'react';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movie Search</h1>
    </div>
  );
};

export default HomePage;
