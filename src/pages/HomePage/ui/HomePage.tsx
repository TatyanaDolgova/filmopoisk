import { useState } from 'react';
import styles from './HomePage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import movieApi, { ShortMovieInfo } from '../../../shared/api/api';
import {
  selectFilters,
  setSearch,
  setGenre,
  setYear,
  setPage,
} from '../model/slice';
import MovieCard from '../../../shared/ui/MovieCard/MovieCard';

export const GENRES: Record<string, string> = {
  '': 'Не выбран',
  comedy: 'Комедия',
  drama: 'Драма',
  action: 'Боевик',
  thriller: 'Триллер',
  horror: 'Ужасы',
  family: 'Семейный',
  cartoon: 'Анимированный',
  fantasy: 'Фэнтези',
  romance: 'Романтика',
  adventure: 'Приключения',
  musical: 'Мьюзикл',
  war: 'Военный',
};

const YEARS: Record<string, string> = {
  '0': 'Не выбран',
  '2009': '2009',
  '2008': '2008',
  '2007': '2007',
  '2006': '2006',
  '1990-2005': '1990-2005',
  '1950-1989': '1950-1989',
};

const HomePage: React.FC = () => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const { data, error, isLoading } = movieApi.useGetMoviesQuery(filters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const toggleGenreDropdown = () => {
    setIsGenreOpen(!isGenreOpen);
    setIsYearOpen(false);
  };

  const toggleYearDropdown = () => {
    setIsYearOpen(!isYearOpen);
    setIsGenreOpen(false);
  };

  const handleYearChange = (option: string) => {
    dispatch(setYear(option));
    setIsYearOpen(false);
    console.log(filters.year);
  };

  const handleGenreChange = (option: string) => {
    dispatch(setGenre(option));
    setIsGenreOpen(false);
  };

  return (
    <div className={styles.movieListPage}>
      <div className={styles.filters}>
        <h3 className={styles.filtersTitle}>Фильтр</h3>
        <label className={styles.filterLabel}>
          Жанр
          <div className={styles.selectContainer}>
            <div
              className={`${styles.selectHeader}`}
              onClick={toggleGenreDropdown}
            >
              {filters.genre === '' ? 'Выберите жанр' : GENRES[filters.genre]}
              <span className="select-arrow">&#9660;</span>
            </div>
            {isGenreOpen && (
              <ul className={styles.selectOptions}>
                {Object.entries(GENRES).map(([key, value]) => (
                  <li
                    key={key}
                    className={styles.selectOption}
                    onClick={() => handleGenreChange(key)}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
        <label className={styles.filterLabel}>
          Год выпуска
          <div className={styles.selectContainer}>
            <div
              className={`${styles.selectHeader}`}
              onClick={toggleYearDropdown}
            >
              {filters.year === '' || filters.year === '0'
                ? 'Выберите год'
                : YEARS[filters.year]}
              <span className="select-arrow">&#9660;</span>
            </div>
            {isYearOpen && (
              <ul className={styles.selectOptions}>
                {Object.entries(YEARS).map(([key, value]) => (
                  <li
                    key={key}
                    className={styles.selectOption}
                    onClick={() => handleYearChange(key)}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
      </div>
      <div className={styles.moveListContainer}>
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Поиск по названию"
        />
        {isLoading && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки фильмов</p>}
        <div className={styles.movieList}>
          {data?.search_result.map((movie: ShortMovieInfo) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
          >
            Назад
          </button>
          <button onClick={() => handlePageChange(filters.page + 1)}>
            Вперед
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
