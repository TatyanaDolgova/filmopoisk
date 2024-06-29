import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../Rating/Rating';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    description: string;
    release_year: number;
    poster: string;
    genre: string;
    rating: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className={styles.movieCard} onClick={handleCardClick}>
      <img src={movie.poster} alt={movie.title} className={styles.poster} />
      <div className={styles.content}>
        <h2 className={styles.title}>{movie.title}</h2>
        <div className={styles.details}>
          <span className={styles.label}>Жанр</span>
          <span className={styles.genres}>{movie.genre}</span>
        </div>
        <div className={styles.details}>
          <span className={styles.label}>Год выпуска</span>
          <span className={styles.year}>{movie.release_year}</span>
        </div>
        <div className={styles.details}>
          <span className={styles.label}>Описание</span>
          <p className={styles.description}>{movie.description}</p>
        </div>
      </div>
      <Rating rating={movie.rating} onRate={undefined} auth={false} />
    </div>
  );
};

export default MovieCard;
