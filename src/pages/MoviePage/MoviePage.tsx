import React from 'react';
import { useParams } from 'react-router-dom';
import movieApi from '../../shared/api/api';
import Loader from '../../shared/ui/Loader/Loader';

import styles from './MoviePage.module.css';
import MovieInfo from '../../shared/ui/MovieInfo/MovieInfo';
import Actor from '../../shared/ui/Actor/Actor';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = movieApi.useGetMovieByIdQuery(id!);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !movie) {
    return <div>Movie with ID: {id} not found</div>;
  }

  return (
    <div className={styles.container}>
      <MovieInfo movie={movie} />
      <div className={styles.actors}>
        <h3 className={styles.actorsTitle}>Актёры</h3>
        <div className={styles.actorsList}>
          {movie.actors.map((actor, index) => (
            <Actor key={index} actor={actor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
