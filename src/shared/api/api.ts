import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface GetMoviesQueryParams {
  title?: string;
  genre?: string;
  year?: string;
  page?: number;
  limit?: number;
  sort_by?: 'release_year' | 'title' | 'rating';
  order?: 'asc' | 'desc';
}

export interface ShortMovieInfo {
  id: string;
  title: string;
  description: string;
  release_year: number;
  poster: string;
  genre: string;
  rating: string;
}

export interface GetMoviesResponse {
  search_result: ShortMovieInfo[];
  total_pages: number;
}

type Actor = {
  name: string;
  photo: string;
};

type FullMovieInfo = {
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

// type RateMovieRequest = {
//   movieId: string;
//   user_rate: number;
// };

const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1' }),
  endpoints: (builder) => ({
    getMovies: builder.query<GetMoviesResponse, GetMoviesQueryParams>({
      query: ({ title, genre, year, page = 1 }) => {
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (genre) params.append('genre', genre);
        if (year && year !== '0') params.append('release_year', year);
        params.append('page', page.toString());

        return {
          url: `/search?${params.toString()}`,
        };
      },
    }),
    // rateMovie: builder.mutation<void, RateMovieRequest>({
    //   query: (body) => ({
    //     url: '/rateMovie',
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${body.token}`,
    //     },
    //     body: { movieId: body.movieId, user_rate: body.user_rate },
    //   }),
    // }),
  }),
});

export default movieApi;
