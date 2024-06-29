import React, { useCallback, useEffect, useState } from 'react';
import styles from './Rating.module.css';
import { StarGreate, StarOrange, StarWhite } from '../Stars/Stars';
import debounce from '../../model/debounce';

interface RatingProps {
  rating: string;
  onRate?: (userRate: number) => void;
  auth: boolean;
}

const Rating: React.FC<RatingProps> = ({ rating, onRate, auth }) => {
  const [userRate, setUserRate] = useState<number>(() => {
    const storedRating = localStorage.getItem('rate2024');
    return storedRating ? +storedRating : 0;
  });
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const handleRate = (rate: number) => {
    if (auth && onRate) {
      setUserRate(rate);
      localStorage.setItem('rate2024', rate.toString());
      onRate(rate);
    }
  };

  const debouncedHandleRate = useCallback(debounce(handleRate, 300), [
    handleRate,
  ]);

  useEffect(() => {
    const storedRating = localStorage.getItem('rate2024');
    if (storedRating) {
      setUserRate(+storedRating);
    } else {
      setUserRate(+rating);
    }
  }, [rating]);

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => (
          <div
            className={`${styles.starContainer} ${auth && onRate ? styles.authenticated : ''}`}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            onClick={() => debouncedHandleRate(index + 1)}
          >
            {index < userRate && (hoveredIndex === -1 || !auth) && (
              <StarOrange />
            )}
            {index >= userRate && (hoveredIndex === -1 || !auth) && (
              <StarWhite />
            )}
            {auth && hoveredIndex < index && hoveredIndex !== -1 && (
              <StarWhite />
            )}
            {auth && hoveredIndex >= index && hoveredIndex !== -1 && (
              <StarGreate />
            )}
            <span>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
