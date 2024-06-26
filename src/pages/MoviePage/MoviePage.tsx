import React from 'react';
import { useParams } from 'react-router-dom';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Movie ID: {id}</h1>
    </div>
  );
};

export default MoviePage;
