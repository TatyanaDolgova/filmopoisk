import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './MovieInfo.module.css';
import Rating from '../Rating/Rating';
import { selectIsAuthenticated } from '../../../entities/Auth/model/slice';
import movieApi from '../../api/api';

type Actor = {
  name: string;
  photo: string; // base64 img
};

interface MovieInfoProps {
  movie: {
    id: string;
    title: string;
    description: string;
    release_year: number;
    poster: string;
    genre: string;
    rating: string;
    total_rates_count: string;
    actors: Actor[];
  };
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [rateMovie] = movieApi.useRateMovieMutation();
  const [currentRating, setCurrentRating] = useState<number>(
    parseFloat(movie.rating)
  );

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleRating = async (userRate: number) => {
    try {
      const response = await rateMovie({
        movieId: movie.id,
        user_rate: userRate,
      }).unwrap();
      setCurrentRating(parseFloat(response.newAverageRate));
    } catch (error) {
      console.error('Failed to submit rating', error);
    }
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
          <span className={styles.label}>Рейтинг</span>
          <span className={styles.rating}>{currentRating}</span>
        </div>
        <div className={styles.details}>
          <span className={styles.label}>Описание</span>
          <p className={styles.description}>{movie.description}</p>
        </div>
      </div>
      {isAuthenticated && (
        <Rating
          rating={movie.rating}
          onRate={isAuthenticated ? handleRating : undefined}
          auth={!!isAuthenticated}
          movieId={movie.id}
        />
      )}
    </div>
  );
};

export default MovieInfo;
