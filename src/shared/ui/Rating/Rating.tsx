import React, { useCallback, useEffect, useState } from 'react';
import styles from './Rating.module.css';
import { StarGreate, StarOrange, StarWhite } from '../Stars/Stars';
import debounce from '../../model/debounce';

interface RatingProps {
  rating: string;
  onRate?: (userRate: number) => void;
  auth: boolean;
  movieId: string; // New prop for movie ID
}

const Rating: React.FC<RatingProps> = ({ rating, onRate, auth, movieId }) => {
  const [userRate, setUserRate] = useState<number>(() => {
    const storedRatings = JSON.parse(
      localStorage.getItem('ratings2024') || '{}'
    );
    return storedRatings[movieId] || 0;
  });
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const handleRate = (rate: number) => {
    if (auth && onRate) {
      setUserRate(rate);
      const storedRatings = JSON.parse(
        localStorage.getItem('ratings2024') || '{}'
      );
      storedRatings[movieId] = rate;
      localStorage.setItem('ratings2024', JSON.stringify(storedRatings));
      onRate(rate);
    }
  };

  const debouncedHandleRate = useCallback(debounce(handleRate, 300), [
    handleRate,
  ]);

  useEffect(() => {
    const storedRatings = JSON.parse(
      localStorage.getItem('ratings2024') || '{}'
    );
    if (storedRatings[movieId]) {
      setUserRate(storedRatings[movieId]);
    } else {
      setUserRate(0);
    }
  }, [rating, movieId]);

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
