import React from 'react';
import { useParams } from 'react-router-dom';
import movieApi from '../../shared/api/api';
import Loader from '../../shared/ui/Loader/Loader';

import styles from './MoviePage.module.css';
import MovieInfo from '../../shared/ui/MovieInfo/MovieInfo';

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
    </div>
  );
};

export default MoviePage;
