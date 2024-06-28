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
        params.append('limit', '10');

        return {
          url: `/search?${params.toString()}`,
        };
      },
    }),
  }),
});

export default movieApi;
